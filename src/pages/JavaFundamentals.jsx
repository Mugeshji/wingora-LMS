import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, PlayCircle, Eye, EyeOff, Lock, RotateCcw } from 'lucide-react';
import { javaBasics } from '../data/javaBasics';
import CodeEditor from '../components/CodeEditor';

export default function JavaFundamentals({ navigationPayload, setNavigationPayload }) {
  const activeUser = React.useMemo(() => {
    try {
      const saved = localStorage.getItem('wingora_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const userSuffix = activeUser?.userID ? `_${activeUser.userID}` : '';

  const [selectedCatId, setSelectedCatId] = useState(javaBasics[0].id);
  const [expandedProbId, setExpandedProbId] = useState(null);
  const [showSolutionId, setShowSolutionId] = useState(null);
  const [completedList, setCompletedList] = useState([]);

  // Interactive compiler states
  const [userCodes, setUserCodes] = useState({});
  const [errorsCount, setErrorsCount] = useState({});
  const [consoleOutputs, setConsoleOutputs] = useState({});
  const [unlockedProbs, setUnlockedProbs] = useState({});
  const [isRunning, setIsRunning] = useState({});

  // Load completions from localStorage
  useEffect(() => {
    const list = JSON.parse(
      localStorage.getItem(`completed_java${userSuffix}`) ||
      localStorage.getItem('completed_java') ||
      '[]'
    );
    setCompletedList(list);
  }, [userSuffix]);

  // Handle payload from global search
  useEffect(() => {
    if (navigationPayload && navigationPayload.target) {
      const match = javaBasics.find(cat => cat.id === navigationPayload.target);
      if (match) {
        setSelectedCatId(match.id);
        if (navigationPayload.subTarget) {
          setExpandedProbId(navigationPayload.subTarget);
          setShowSolutionId(navigationPayload.subTarget);
        } else {
          setExpandedProbId(null);
          setShowSolutionId(null);
        }
      }
      setNavigationPayload(null);
    }
  }, [navigationPayload, setNavigationPayload]);

  const selectedCategory = javaBasics.find(cat => cat.id === selectedCatId) || javaBasics[0];

  // Save to recently viewed when category changes
  useEffect(() => {
    if (!selectedCategory) return;
    const recent = JSON.parse(
      localStorage.getItem(`recently_viewed${userSuffix}`) ||
      localStorage.getItem('recently_viewed') ||
      '[]'
    );
    const filtered = recent.filter(item => !(item.type === 'java' && item.target === selectedCategory.id));
    const updated = [
      { type: 'java', name: `Java: ${selectedCategory.title}`, target: selectedCategory.id },
      ...filtered
    ].slice(0, 5);
    localStorage.setItem(`recently_viewed${userSuffix}`, JSON.stringify(updated));
    localStorage.setItem('recently_viewed', JSON.stringify(updated));
  }, [selectedCatId, userSuffix]);

  // Load starter templates into code state when category changes
  useEffect(() => {
    const initial = {};
    selectedCategory.problems.forEach(p => {
      if (!userCodes[p.id]) {
        initial[p.id] = p.starterTemplate;
      }
    });
    setUserCodes(prev => ({ ...initial, ...prev }));
  }, [selectedCategory]);

  const toggleComplete = (e, probId) => {
    e.stopPropagation();
    let updated;
    if (completedList.includes(probId)) {
      updated = completedList.filter(id => id !== probId);
    } else {
      updated = [...completedList, probId];
    }
    setCompletedList(updated);
    localStorage.setItem(`completed_java${userSuffix}`, JSON.stringify(updated));
    localStorage.setItem('completed_java', JSON.stringify(updated));
  };

  const handleCategorySelect = (id) => {
    setSelectedCatId(id);
    setExpandedProbId(null);
    setShowSolutionId(null);
  };

  const resetCode = (probId, starter) => {
    setUserCodes(prev => ({ ...prev, [probId]: starter }));
    setConsoleOutputs(prev => ({ ...prev, [probId]: null }));
    setErrorsCount(prev => ({ ...prev, [probId]: 0 }));
  };

  const handleCodeChange = (probId, val) => {
    setUserCodes(prev => ({ ...prev, [probId]: val }));
  };

  const runCode = (prob) => {
    const probId = prob.id;
    const code = userCodes[probId] || '';
    
    setIsRunning(prev => ({ ...prev, [probId]: true }));
    setConsoleOutputs(prev => ({
      ...prev,
      [probId]: { text: '> javac Solution.java\nCompiling and verifying...', type: 'info' }
    }));

    setTimeout(() => {
      setIsRunning(prev => ({ ...prev, [probId]: false }));

      // Heuristic 1: Class presence check
      if (!code.includes('class')) {
        handleCompilerFailure(prob, "Compile Error: Class definition missing. A valid Java program must declare a class (e.g. 'public class Solution').");
        return;
      }

      // Heuristic 2: Balanced braces
      const openBraces = (code.match(/\{/g) || []).length;
      const closeBraces = (code.match(/\}/g) || []).length;
      if (openBraces !== closeBraces) {
        handleCompilerFailure(prob, `Compile Error: Unbalanced curly braces in body. Found ${openBraces} '{' and ${closeBraces} '}'. Please check class/method blocks.`);
        return;
      }

      // Heuristic 3: Semicolon completion scan
      const lines = code.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && 
            !line.endsWith(';') && 
            !line.endsWith('{') && 
            !line.endsWith('}') && 
            !line.startsWith('//') && 
            !line.startsWith('import') &&
            !line.startsWith('@') &&
            !line.startsWith('class') &&
            !line.startsWith('interface') &&
            !line.startsWith('public class') &&
            !line.startsWith('static class') &&
            !line.startsWith('public static void main') &&
            !line.startsWith('public static int') &&
            !line.startsWith('public static double') &&
            !line.startsWith('public static String') &&
            !line.startsWith('public static boolean') &&
            !line.startsWith('private static void') &&
            !line.startsWith('private static int') &&
            !line.startsWith('private static double') &&
            !line.startsWith('private static String') &&
            !line.startsWith('private static boolean')
        ) {
          handleCompilerFailure(prob, `Syntax Error: ';' expected at line ${i + 1} (${line.slice(0, 20)}...)`);
          return;
        }
      }

      // Heuristic 4: Keyword matching
      const missingKeywords = [];
      prob.validationKeywords.forEach(kw => {
        if (!code.includes(kw)) {
          missingKeywords.push(kw);
        }
      });

      if (missingKeywords.length > 0) {
        const currentErrors = errorsCount[probId] || 0;
        const errIndex = currentErrors % prob.simulatedErrors.length;
        const simulatedErr = prob.simulatedErrors[errIndex];
        handleCompilerFailure(prob, simulatedErr);
        return;
      }

      // Compile Successful!
      setConsoleOutputs(prev => ({
        ...prev,
        [probId]: {
          text: `> javac Solution.java\nCompilation Successful!\n\n> java Solution\nRunning program...\n\nStdout:\n${prob.output}\n\n[SUCCESS] All compilation checks passed!`,
          type: 'success'
        }
      }));

      // Mark unlocked
      setUnlockedProbs(prev => ({ ...prev, [probId]: true }));

      // Complete problem automatically
      if (!completedList.includes(probId)) {
        const updated = [...completedList, probId];
        setCompletedList(updated);
        localStorage.setItem(`completed_java${userSuffix}`, JSON.stringify(updated));
        localStorage.setItem('completed_java', JSON.stringify(updated));
      }
    }, 950);
  };

  const handleCompilerFailure = (prob, errorMsg) => {
    const probId = prob.id;
    const currentErrors = (errorsCount[probId] || 0) + 1;
    setErrorsCount(prev => ({ ...prev, [probId]: currentErrors }));

    let consoleMsg = `> javac Solution.java\nCompilation Failed!\n\nStderr:\n${errorMsg}`;

    if (currentErrors >= 2) {
      consoleMsg += `\n\n[SYSTEM NOTICE] 2 compiler attempts failed.\nReference Java Solution has been UNLOCKED below to help you debug!`;
      setUnlockedProbs(prev => ({ ...prev, [probId]: true }));
    } else {
      consoleMsg += `\n\n[SYSTEM NOTICE] Attempt ${currentErrors}/2. Try again! (Fail 2 times to automatically reveal optimal answer)`;
    }

    setConsoleOutputs(prev => ({
      ...prev,
      [probId]: { text: consoleMsg, type: 'error' }
    }));
  };

  return (
    <div className="java-page-container">
      {/* Sidebar navigation for Java Topics */}
      <div className="java-sidebar glass-panel">
        <h2 className="java-sidebar-title">Core Java Topics</h2>
        <div className="java-topics-list">
          {javaBasics.map((cat) => {
            const completedCount = cat.problems.filter(p => completedList.includes(p.id)).length;
            const isFullyCompleted = completedCount === cat.problems.length;
            const isSelected = selectedCatId === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`java-topic-btn ${isSelected ? 'active' : ''}`}
              >
                <div className="topic-btn-content">
                  <span className="topic-title-text">{cat.title}</span>
                  <span className="topic-meta-indicator">
                    {completedCount} / {cat.problems.length} solved
                  </span>
                </div>
                {isFullyCompleted && (
                  <CheckCircle className="completion-check" size={16} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main details content */}
      <div className="java-content-view">
        <div className="java-concept-header glass-panel">
          <h1>{selectedCategory.title}</h1>
          <div className="concept-explanation-card">
            <p>{selectedCategory.explanation}</p>
          </div>
        </div>

        <div className="java-problems-section">
          <h2>Practice Coding Challenges ({selectedCategory.problems.length})</h2>
          <div className="problems-stack">
            {selectedCategory.problems.map((prob) => {
              const isExpanded = expandedProbId === prob.id;
              const isCompleted = completedList.includes(prob.id);
              const isShowingSolution = showSolutionId === prob.id;

              const codeText = userCodes[prob.id] || prob.starterTemplate || '';
              const linesArray = codeText.split('\n');
              const consoleOut = consoleOutputs[prob.id];
              const isUnlocked = unlockedProbs[prob.id] || isCompleted;

              return (
                <div 
                  key={prob.id} 
                  className={`problem-card glass-panel ${isExpanded ? 'expanded' : ''} ${isCompleted ? 'completed-border' : ''}`}
                >
                  <div className="problem-card-header" onClick={() => setExpandedProbId(isExpanded ? null : prob.id)}>
                    <div className="problem-header-left">
                      <button 
                        className={`checkbox-indicator ${isCompleted ? 'checked' : ''}`}
                        onClick={(e) => toggleComplete(e, prob.id)}
                        title="Mark Completed"
                      >
                        {isCompleted && <CheckCircle size={16} className="check-svg" />}
                      </button>
                      <h3 className="problem-card-title">{prob.title}</h3>
                    </div>
                    <span className="expand-pill">{isExpanded ? 'Collapse' : 'Expand'}</span>
                  </div>

                  {isExpanded && (
                    <div className="problem-card-body">
                      <div className="problem-prompt">
                        <AlertCircle size={16} className="prompt-icon" />
                        <p className="problem-desc">{prob.description}</p>
                      </div>

                      {/* Code space header */}
                      <div className="workspace-header">
                        <span className="file-name">Solution.java</span>
                        <div className="workspace-badge-row">
                          <span className="badge">JAVA 17 (JDK)</span>
                          <button 
                            className="btn-reset" 
                            onClick={() => resetCode(prob.id, prob.starterTemplate)}
                            title="Reset Starter Template"
                          >
                            <RotateCcw size={13} />
                            <span>Reset</span>
                          </button>
                        </div>
                      </div>

                      {/* Code Editor Container */}
                      <div className="code-workspace-editor">
                        <div className="line-numbers-col">
                          {linesArray.map((_, i) => (
                            <span key={i} className="line-no">{i + 1}</span>
                          ))}
                        </div>
                        <textarea
                          className="editor-textarea"
                          value={codeText}
                          onChange={(e) => handleCodeChange(prob.id, e.target.value)}
                          spellCheck={false}
                        />
                      </div>

                      {/* Compiler and Reveal Actions Row */}
                      <div className="solution-actions-row">
                        <button 
                          className={`btn-primary run-code-btn ${isRunning[prob.id] ? 'loading' : ''}`}
                          onClick={() => runCode(prob)}
                          disabled={isRunning[prob.id]}
                        >
                          <PlayCircle size={16} />
                          <span>{isRunning[prob.id] ? 'Compiling...' : 'Run Code'}</span>
                        </button>

                        <button 
                          className="btn-secondary toggle-solution-btn"
                          onClick={() => {
                            if (isUnlocked) {
                              setShowSolutionId(isShowingSolution ? null : prob.id);
                            }
                          }}
                          disabled={!isUnlocked}
                          title={!isUnlocked ? "Get 2 compile errors or solve this coding problem to unlock reference answer" : ""}
                        >
                          {isUnlocked ? (
                            isShowingSolution ? (
                              <>
                                <EyeOff size={16} />
                                <span>Hide Java Solution</span>
                              </>
                            ) : (
                              <>
                                <Eye size={16} />
                                <span>Reveal Java Solution</span>
                              </>
                            )
                          ) : (
                            <>
                              <Lock size={15} />
                              <span className="locked-text">Solution Locked (Solve or fail 2x)</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Compiler Console Output Panel */}
                      {consoleOut && (
                        <div className={`compiler-console ${consoleOut.type}`}>
                          <div className="console-title">Console Output (stdout / stderr)</div>
                          <pre className="console-text">{consoleOut.text}</pre>
                        </div>
                      )}

                      {/* Hidden / Revealed optimal reference solutions */}
                      {isShowingSolution && isUnlocked && (
                        <div className="solution-box-wrapper">
                          <h4 className="reference-title">Optimal Java Solution</h4>
                          <CodeEditor 
                            filename={`${prob.title.replace(/\s+/g, '')}.java`}
                            code={prob.solution}
                            output={prob.output}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .java-page-container {
          display: flex;
          gap: 1.75rem;
          align-items: flex-start;
          max-width: 1200px;
          margin: 0 auto;
          height: calc(100vh - 4rem);
          width: 100%;
        }

        .java-sidebar {
          width: 320px;
          padding: 1.5rem 1rem;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          height: 100%;
          overflow-y: auto;
        }

        .java-sidebar::-webkit-scrollbar,
        .java-content-view::-webkit-scrollbar,
        .code-workspace-editor::-webkit-scrollbar,
        .compiler-console::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .java-sidebar::-webkit-scrollbar-track,
        .java-content-view::-webkit-scrollbar-track,
        .code-workspace-editor::-webkit-scrollbar-track,
        .compiler-console::-webkit-scrollbar-track {
          background: transparent;
        }

        .java-sidebar::-webkit-scrollbar-thumb,
        .java-content-view::-webkit-scrollbar-thumb,
        .code-workspace-editor::-webkit-scrollbar-thumb,
        .compiler-console::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.35);
          border-radius: 999px;
          transition: background 0.2s ease;
        }

        .java-sidebar::-webkit-scrollbar-thumb:hover,
        .java-content-view::-webkit-scrollbar-thumb:hover,
        .code-workspace-editor::-webkit-scrollbar-thumb:hover,
        .compiler-console::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.7);
        }

        .java-sidebar-title {
          font-size: 1.25rem;
          font-weight: 700;
          padding-left: 0.5rem;
          border-left: 3px solid hsl(var(--primary));
        }

        .java-topics-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .java-topic-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 0.75rem;
          color: hsl(var(--muted-foreground));
          text-align: left;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: var(--transition);
        }

        .java-topic-btn:hover {
          background: hsl(var(--secondary) / 0.4);
          color: hsl(var(--foreground));
        }

        .java-topic-btn.active {
          background: hsl(var(--primary) / 0.1);
          color: hsl(var(--primary));
          border-color: hsl(var(--primary) / 0.2);
          font-weight: 600;
        }

        .topic-btn-content {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .topic-title-text {
          font-size: 0.95rem;
        }

        .topic-meta-indicator {
          font-size: 0.75rem;
          opacity: 0.85;
        }

        .completion-check {
          color: #10b981;
          flex-shrink: 0;
          margin-left: 0.5rem;
        }

        .java-content-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          height: 100%;
          overflow-y: auto;
          padding-right: 0.75rem;
        }

        .java-concept-header {
          padding: 2rem;
        }

        .java-concept-header h1 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.8));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .concept-explanation-card p {
          font-size: 1rem;
          line-height: 1.6;
          color: hsl(var(--foreground) / 0.85);
        }

        .java-problems-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .java-problems-section h2 {
          font-size: 1.35rem;
          font-weight: 700;
        }

        .problems-stack {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .problem-card {
          padding: 0;
          overflow: hidden;
          transition: var(--transition);
        }

        .problem-card-header {
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background: transparent;
          user-select: none;
        }

        .problem-card:hover {
          border-color: hsl(var(--primary) / 0.2);
        }

        .problem-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .checkbox-indicator {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 4px;
          border: 2px solid hsl(var(--card-border) / 0.8);
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: var(--transition);
        }

        .checkbox-indicator:hover {
          border-color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.05);
        }

        .checkbox-indicator.checked {
          border-color: #10b981;
          background: #10b981 / 0.1;
        }

        .check-svg {
          color: #10b981;
        }

        .problem-card-title {
          font-size: 1.05rem;
          font-weight: 600;
        }

        .expand-pill {
          font-size: 0.8rem;
          padding: 0.25rem 0.6rem;
          background: hsl(var(--secondary));
          border: 1px solid hsl(var(--card-border) / 0.6);
          border-radius: 4px;
          color: hsl(var(--muted-foreground));
        }

        .problem-card.completed-border {
          border-color: #10b981 / 0.3;
        }

        .problem-card-body {
          padding: 0 1.25rem 1.5rem 1.25rem;
          border-top: 1px solid hsl(var(--card-border) / 0.3);
          background: hsl(var(--secondary) / 0.1);
        }

        .problem-prompt {
          display: flex;
          gap: 0.75rem;
          padding: 1rem;
          background: hsl(var(--background) / 0.3);
          border-left: 4px solid hsl(var(--primary));
          border-radius: 0 0.5rem 0.5rem 0;
          margin-top: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .prompt-icon {
          color: hsl(var(--primary));
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .problem-desc {
          font-size: 0.95rem;
          line-height: 1.5;
          color: hsl(var(--foreground) / 0.9);
        }

        /* IDE Workspace Styling */
        .workspace-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 1rem;
          background: #09090e;
          border: 1px solid hsl(var(--card-border) / 0.5);
          border-bottom: none;
          border-radius: 8px 8px 0 0;
        }

        .file-name {
          font-size: 0.8rem;
          font-family: 'Fira Code', 'Courier New', monospace;
          color: hsl(var(--muted-foreground));
          font-weight: 600;
        }

        .workspace-badge-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .workspace-badge-row .badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.4rem;
          background: hsl(var(--primary) / 0.15);
          color: hsl(var(--primary));
          border-radius: 4px;
        }

        .btn-reset {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: transparent;
          border: none;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          font-size: 0.75rem;
          transition: var(--transition);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
        }

        .btn-reset:hover {
          color: hsl(var(--foreground));
          background: hsl(var(--secondary));
        }

        .code-workspace-editor {
          display: flex;
          background: #0d0d15;
          border: 1px solid hsl(var(--card-border) / 0.5);
          border-radius: 0 0 8px 8px;
          min-height: 200px;
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 1.25rem;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .line-numbers-col {
          display: flex;
          flex-direction: column;
          padding: 1rem 0.75rem;
          background: #08080c;
          border-right: 1px solid hsl(var(--card-border) / 0.2);
          text-align: right;
          user-select: none;
          flex-shrink: 0;
        }

        .line-no {
          font-family: 'Fira Code', 'Courier New', Courier, monospace;
          font-size: 0.9rem;
          line-height: 1.5rem;
          color: hsl(var(--muted-foreground) / 0.4);
        }

        .editor-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          padding: 1rem;
          font-family: 'Fira Code', 'Courier New', Courier, monospace;
          font-size: 0.9rem;
          line-height: 1.5rem;
          color: #e2e8f0;
          white-space: pre;
          overflow-x: auto;
          tab-size: 4;
        }

        .solution-actions-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .run-code-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          padding: 0.5rem 1.25rem;
        }

        .run-code-btn.loading {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .toggle-solution-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          padding: 0.5rem 1rem;
        }

        .toggle-solution-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          background: hsl(var(--secondary) / 0.3);
          border-color: hsl(var(--card-border) / 0.3);
        }

        .locked-text {
          font-size: 0.8rem;
          color: hsl(var(--muted-foreground) / 0.7);
        }

        /* Compiler Console Styling */
        .compiler-console {
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.85rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          animation: slideDown 0.25s ease-out;
        }

        .compiler-console.info {
          background: #090e18;
          border: 1px solid rgba(59, 130, 246, 0.2);
          color: #93c5fd;
        }

        .compiler-console.success {
          background: #07150f;
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #a7f3d0;
        }

        .compiler-console.error {
          background: #180909;
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #fca5a5;
        }

        .console-title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          opacity: 0.6;
          margin-bottom: 0.5rem;
          border-bottom: 1px solid currentColor;
          padding-bottom: 0.25rem;
          letter-spacing: 0.05em;
        }

        .console-text {
          white-space: pre-wrap;
          margin: 0;
          line-height: 1.45;
        }

        .reference-title {
          font-size: 1.05rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: hsl(var(--foreground));
        }

        .solution-box-wrapper {
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .java-page-container {
            flex-direction: column;
            gap: 1rem;
            height: auto;
          }
          
          .java-sidebar {
            width: 100%;
            height: auto;
            max-height: 250px;
            position: relative;
            top: 0;
          }

          .java-content-view {
            height: auto;
            overflow-y: visible;
            padding-right: 0;
          }
        }
      `}</style>
    </div>
  );
}
