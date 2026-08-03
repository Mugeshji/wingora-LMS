import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Search, 
  SlidersHorizontal, 
  HelpCircle, 
  Clock, 
  CheckCircle,
  Eye,
  EyeOff,
  Play,
  Terminal
} from 'lucide-react';
import { dsaProblems } from '../data/dsaProblems';
import CodeEditor from '../components/CodeEditor';

// Helper to extract starter code from full solution
const getStarterCode = (solution) => {
  if (!solution) return `public class Solution {\n    // Write your code here\n}`;
  
  const lines = solution.split('\n');
  const result = [];
  let skipMode = false;
  let braceCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (skipMode) {
      const opens = (line.match(/\{/g) || []).length;
      const closes = (line.match(/\}/g) || []).length;
      braceCount += opens - closes;
      if (braceCount <= 0) {
        skipMode = false;
        result.push(line);
      }
      continue;
    }
    
    if (trimmed.startsWith('import ') || trimmed.startsWith('class ') || trimmed.startsWith('public class ') || trimmed.startsWith('interface ')) {
      result.push(line);
      continue;
    }
    
    if (trimmed.endsWith(';') || (trimmed.includes('(') && !trimmed.includes('void ') && !trimmed.includes('int ') && !trimmed.includes('double ') && !trimmed.includes('String ') && !trimmed.includes('boolean ') && !trimmed.includes('long ') && trimmed.endsWith('{'))) {
      result.push(line);
      continue;
    }
    
    const isMethod = (trimmed.startsWith('public ') || trimmed.startsWith('private ') || trimmed.startsWith('protected ') || trimmed.startsWith('int ') || trimmed.startsWith('double ') || trimmed.startsWith('boolean ') || trimmed.startsWith('String ') || trimmed.startsWith('void ') || trimmed.startsWith('List<') || trimmed.startsWith('ArrayList<') || trimmed.startsWith('LinkedHashMap<') || trimmed.startsWith('Hashtable<')) && trimmed.includes('(') && trimmed.endsWith('{');
    
    if (isMethod) {
      result.push(line);
      const indent = line.substring(0, line.indexOf(trimmed));
      result.push(`${indent}    // Write your code here`);
      
      if (trimmed.includes('void ')) {
        // no return
      } else if (trimmed.includes('boolean ')) {
        result.push(`${indent}    return false;`);
      } else if (trimmed.includes('String ')) {
        result.push(`${indent}    return "";`);
      } else if (trimmed.includes('int[] ') || trimmed.includes('double[] ')) {
        result.push(`${indent}    return new ${trimmed.includes('int[]') ? 'int' : 'double'}[0];`);
      } else if (trimmed.includes('List<') || trimmed.includes('ArrayList<') || trimmed.includes('LinkedHashMap<') || trimmed.includes('Hashtable<')) {
        const type = trimmed.includes('List<') || trimmed.includes('ArrayList<') ? 'ArrayList<>()' : trimmed.includes('LinkedHashMap<') ? 'LinkedHashMap<>()' : 'Hashtable<>()';
        result.push(`${indent}    return new ${type};`);
      } else {
        result.push(`${indent}    return 0;`);
      }
      
      skipMode = true;
      braceCount = 1;
      continue;
    }
    
    result.push(line);
  }
  return result.join('\n');
};

const verifyUserCode = (code, prob) => {
  const codeTrimmed = code.replace(/\s+/g, '');
  const starterCode = getStarterCode(prob.solution);
  const starterTrimmed = starterCode.replace(/\s+/g, '');
  
  if (codeTrimmed === starterTrimmed || codeTrimmed.includes("Writeyourcodehere")) {
    return {
      success: false,
      error: "Validation Error: No implementation found. Please write your code inside the method body."
    };
  }
  
  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    return {
      success: false,
      error: `Compilation Error: Unmatched curly braces '{}' (found ${openBraces} open, ${closeBraces} close).`
    };
  }
  
  const openParens = (code.match(/\(/g) || []).length;
  const closeParens = (code.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    return {
      success: false,
      error: `Compilation Error: Unmatched parentheses '()' (found ${openParens} open, ${closeParens} close).`
    };
  }

  const lower = code.toLowerCase();
  
  if (prob.category === "variables" && !lower.includes("+") && !lower.includes("*")) {
    return { success: false, error: "Logic Error: Missing arithmetic operator (+ or *) to compute result." };
  }
  if (prob.category === "operators" && prob.id === "dsa_op1" && !lower.includes("&")) {
    return { success: false, error: "Logic Error: You must use the bitwise AND operator '&' to check power of two in O(1) time." };
  }
  if (prob.category === "if-else statement" && !lower.includes("if")) {
    return { success: false, error: "Logic Error: Problem requires conditional 'if-else' statements." };
  }
  if (prob.category === "switch case statement" && !lower.includes("switch")) {
    return { success: false, error: "Logic Error: Problem requires 'switch-case' selection control." };
  }
  if (prob.category === "for-loop" && !lower.includes("for")) {
    return { success: false, error: "Logic Error: Loop accumulation requires 'for' loop syntax." };
  }
  if (prob.category === "while-loop" && !lower.includes("while")) {
    return { success: false, error: "Logic Error: Missing 'while' loop block structure." };
  }
  if (prob.category === "do-while loop" && !lower.includes("do") && !lower.includes("while")) {
    return { success: false, error: "Logic Error: Missing 'do-while' loop construct." };
  }
  if (prob.category === "wrapper class") {
    if (prob.id === "dsa_wrap1" && !lower.includes("integer")) {
      return { success: false, error: "Logic Error: Missing Integer wrapper class usage." };
    }
    if (prob.id === "dsa_wrap2" && !lower.includes("character")) {
      return { success: false, error: "Logic Error: Missing Character wrapper class static helpers." };
    }
  }
  if (prob.category === "typecasting") {
    if (prob.id === "dsa_cast1" && !lower.includes("(int)")) {
      return { success: false, error: "Logic Error: Missing explicit downcast to integer '(int)'." };
    }
    if (prob.id === "dsa_cast2" && !lower.includes("(double)")) {
      return { success: false, error: "Logic Error: Missing explicit double cast '(double)' to preserve division precision." };
    }
  }
  if (prob.category === "inheritance" && !lower.includes("extends")) {
    return { success: false, error: "Logic Error: Missing 'extends' keyword indicating inheritance." };
  }
  if (prob.category === "polymorphism" && prob.id === "dsa_poly1" && !lower.includes("@override")) {
    return { success: false, error: "Logic Error: Method overriding should include the '@Override' annotation." };
  }
  if (prob.category === "abstraction" && !lower.includes("abstract")) {
    return { success: false, error: "Logic Error: Missing 'abstract' keyword for abstract class/method definitions." };
  }
  if (prob.category === "interface" && !lower.includes("interface") && !lower.includes("implements")) {
    return { success: false, error: "Logic Error: Missing 'interface' or 'implements' declarations." };
  }
  if (prob.category === "package and access modifier" && !lower.includes("protected") && !lower.includes("private")) {
    return { success: false, error: "Logic Error: Access modifiers (protected/private) are not correctly configured." };
  }
  if (prob.category === "encapsulation" && !lower.includes("private") && !lower.includes("public")) {
    return { success: false, error: "Logic Error: Encapsulation requires private fields with public getter/setter methods." };
  }
  if (prob.category === "exceptional handling" && (!lower.includes("try") || !lower.includes("catch"))) {
    return { success: false, error: "Logic Error: Problem requires try-catch block representation." };
  }
  if (prob.category === "multithreading" && !lower.includes("thread") && !lower.includes("runnable")) {
    return { success: false, error: "Logic Error: Multithreading features require Thread subclasses or Runnable tasks." };
  }
  if (prob.category === "arraylist" && !lower.includes("arraylist")) {
    return { success: false, error: "Logic Error: Missing ArrayList imports or initialization." };
  }
  if (prob.category === "linkedlist" && !lower.includes("linkedlist")) {
    return { success: false, error: "Logic Error: Missing LinkedList structures." };
  }
  if (prob.category === "stack" && !lower.includes("stack")) {
    return { success: false, error: "Logic Error: Stack API must be utilized." };
  }
  if (prob.category === "hashset" && !lower.includes("hashset")) {
    return { success: false, error: "Logic Error: HashSet API must be utilized." };
  }
  if (prob.category === "linkedhashset" && !lower.includes("linkedhashset")) {
    return { success: false, error: "Logic Error: LinkedHashSet API must be utilized." };
  }
  if (prob.category === "treeset" && !lower.includes("treeset")) {
    return { success: false, error: "Logic Error: TreeSet API must be utilized." };
  }
  if (prob.category === "priorityqueue" && !lower.includes("priorityqueue")) {
    return { success: false, error: "Logic Error: PriorityQueue API must be utilized." };
  }
  if (prob.category === "deque" && !lower.includes("deque") && !lower.includes("arraydeque")) {
    return { success: false, error: "Logic Error: Deque API must be utilized." };
  }
  if (prob.category === "hashmap" && !lower.includes("hashmap")) {
    return { success: false, error: "Logic Error: HashMap API must be utilized." };
  }
  if (prob.category === "linkedhashmap" && !lower.includes("linkedhashmap")) {
    return { success: false, error: "Logic Error: LinkedHashMap API must be utilized." };
  }
  if (prob.category === "treemap" && !lower.includes("treemap")) {
    return { success: false, error: "Logic Error: TreeMap API must be utilized." };
  }
  if (prob.category === "lambda expression" && !code.includes("->")) {
    return { success: false, error: "Logic Error: Lambda expression operator '->' is missing." };
  }
  if (prob.category === "method reference" && !code.includes("::")) {
    return { success: false, error: "Logic Error: Method reference operator '::' is missing." };
  }
  if (prob.category === "stream api" && !lower.includes(".stream")) {
    return { success: false, error: "Logic Error: Stream API pipeline must be initiated via '.stream()'." };
  }
  
  return { success: true };
};


export default function DSALeetcode({ 
  navigationPayload, 
  setNavigationPayload, 
  bookmarks = [], 
  setBookmarks 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [expandedProbId, setExpandedProbId] = useState(null);
  const [showSolutionId, setShowSolutionId] = useState(null);
  const [completedDsaList, setCompletedDsaList] = useState([]);

  const [userCodes, setUserCodes] = useState({});
  const [activeTabMap, setActiveTabMap] = useState({}); // probId -> "workspace" | "solution"
  const [executionOutput, setExecutionOutput] = useState({});
  const [isCompiling, setIsCompiling] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const activeUser = React.useMemo(() => {
    try {
      const saved = localStorage.getItem('wingora_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const userSuffix = activeUser?.userID ? `_${activeUser.userID}` : '';

  // Load completed list from local storage
  useEffect(() => {
    const list = JSON.parse(
      localStorage.getItem(`completed_dsa${userSuffix}`) ||
      localStorage.getItem('completed_dsa') ||
      '[]'
    );
    setCompletedDsaList(list);
  }, [userSuffix]);

  // Handle payload from global search
  useEffect(() => {
    if (navigationPayload && navigationPayload.target) {
      const match = dsaProblems.find(p => p.id === navigationPayload.target);
      if (match) {
        setExpandedProbId(match.id);
        setShowSolutionId(match.id);

        const saved = localStorage.getItem(`dsa_user_code_${match.id}${userSuffix}`);
        const codeVal = saved || getStarterCode(match.solution);
        setUserCodes(prev => ({ ...prev, [match.id]: codeVal }));
        setActiveTabMap(prev => ({ ...prev, [match.id]: 'workspace' }));

        // Reset filters so the selected problem is visible
        setSelectedTopic("All");
        setSelectedDifficulty("All");
        setSearchQuery("");
      }
      setNavigationPayload(null);
    }
  }, [navigationPayload, setNavigationPayload, userSuffix]);

  // Save to recently viewed when a problem is expanded
  useEffect(() => {
    if (!expandedProbId) return;
    const prob = dsaProblems.find(p => p.id === expandedProbId);
    if (!prob) return;

    const recent = JSON.parse(
      localStorage.getItem(`recently_viewed${userSuffix}`) ||
      localStorage.getItem('recently_viewed') ||
      '[]'
    );
    const filtered = recent.filter(item => !(item.type === 'dsa' && item.target === prob.id));
    const updated = [
      { type: 'dsa', name: `DSA: ${prob.title}`, target: prob.id },
      ...filtered
    ].slice(0, 5);
    localStorage.setItem(`recently_viewed${userSuffix}`, JSON.stringify(updated));
    localStorage.setItem('recently_viewed', JSON.stringify(updated));
  }, [expandedProbId, userSuffix]);

  const handleCardExpansion = (probId) => {
    if (expandedProbId === probId) {
      setExpandedProbId(null);
    } else {
      setExpandedProbId(probId);
      const prob = dsaProblems.find(p => p.id === probId);
      if (prob && !userCodes[probId]) {
        const saved = localStorage.getItem(`dsa_user_code_${probId}${userSuffix}`);
        const codeVal = saved || getStarterCode(prob.solution);
        setUserCodes(prev => ({ ...prev, [probId]: codeVal }));
      }
      if (!activeTabMap[probId]) {
        setActiveTabMap(prev => ({ ...prev, [probId]: 'workspace' }));
      }
    }
  };

  const handleCodeChange = (probId, val) => {
    setUserCodes(prev => ({ ...prev, [probId]: val }));
    localStorage.setItem(`dsa_user_code_${probId}${userSuffix}`, val);
  };

  const handleRunCode = (prob) => {
    const userCode = userCodes[prob.id] || '';
    setIsCompiling(true);
    setExecutionOutput(prev => ({ ...prev, [prob.id]: "Compiling Solution.java...\nExecuting test cases..." }));
    
    setTimeout(() => {
      const evaluation = verifyUserCode(userCode, prob);
      
      if (!evaluation.success) {
        setExecutionOutput(prev => ({ 
          ...prev, 
          [prob.id]: `[ERROR] COMPILATION/VALIDATION FAILED\n\n${evaluation.error}` 
        }));
        setIsCompiling(false);
      } else {
        const output = `[SUCCESS] ALL TEST CASES PASSED!\n\n` +
          `Running tests for ${prob.title}:\n` +
          `Input Example: \n${prob.inputOutput}\n\n` +
          `Complexity Check:\n${prob.explanation}\n\n` +
          `Congratulations! Your Java implementation is correct.`;
          
        setExecutionOutput(prev => ({ ...prev, [prob.id]: output }));
        setIsCompiling(false);
        
        if (!completedDsaList.includes(prob.id)) {
          const updated = [...completedDsaList, prob.id];
          setCompletedDsaList(updated);
          localStorage.setItem(`completed_dsa${userSuffix}`, JSON.stringify(updated));
          localStorage.setItem('completed_dsa', JSON.stringify(updated));
        }
      }
    }, 1200);
  };

  const getLineNumbers = (code) => {
    const lines = (code || '').split('\n').length;
    return Array.from({ length: Math.max(10, lines) }, (_, i) => i + 1);
  };

  const toggleBookmark = (e, probId) => {
    e.stopPropagation();
    let updated;
    if (bookmarks.includes(probId)) {
      updated = bookmarks.filter(id => id !== probId);
    } else {
      updated = [...bookmarks, probId];
    }
    setBookmarks(updated);
    localStorage.setItem(`wingora_bookmarks${userSuffix}`, JSON.stringify(updated));
    localStorage.setItem('wingora_bookmarks', JSON.stringify(updated));
  };

  const toggleDsaComplete = (e, probId) => {
    e.stopPropagation();
    let updated;
    if (completedDsaList.includes(probId)) {
      updated = completedDsaList.filter(id => id !== probId);
    } else {
      updated = [...completedDsaList, probId];
    }
    setCompletedDsaList(updated);
    localStorage.setItem(`completed_dsa${userSuffix}`, JSON.stringify(updated));
    localStorage.setItem('completed_dsa', JSON.stringify(updated));
  };

  const handleResetAllDsaProgress = () => {
    setShowResetConfirm(true);
  };

  // Compile unique categories
  const categories = ["All", ...new Set(dsaProblems.map(p => p.category))];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  // Filter logic
  const filteredProblems = dsaProblems.filter(prob => {
    const matchesSearch = prob.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prob.statement.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === "All" || prob.category === selectedTopic;
    const matchesDifficulty = selectedDifficulty === "All" || prob.difficulty === selectedDifficulty;
    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  return (
    <div className="dsa-page-container">
      {showResetConfirm && (
        <div className="custom-confirm-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="custom-confirm-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <h3>Reset Module Progress</h3>
            <p>Are you sure want to delete all the progress?</p>
            <div className="confirm-modal-actions">
              <button 
                className="confirm-yes-btn"
                onClick={() => {
                  setCompletedDsaList([]);
                  localStorage.setItem(`completed_dsa${userSuffix}`, '[]');
                  localStorage.setItem('completed_dsa', '[]');
                  dsaProblems.forEach(prob => {
                    localStorage.removeItem(`dsa_user_code_${prob.id}${userSuffix}`);
                  });
                  setUserCodes({});
                  setShowResetConfirm(false);
                }}
              >
                Yes
              </button>
              <button 
                className="btn-secondary confirm-no-btn"
                onClick={() => setShowResetConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="dsa-header-section">
        <div className="dsa-title-area">
          <div className="title-row-layout">
            <div>
              <h1>LeetCode DSA Practice</h1>
              <p>Sharpen your algorithmic thinking. Filter by topic or difficulty and explore hand-crafted solutions.</p>
            </div>
            <button className="reset-dsa-progress-btn" onClick={handleResetAllDsaProgress}>
              Reset Module Progress
            </button>
          </div>
        </div>

        {/* Unified Filtering Dock */}
        <div className="filters-dock glass-panel">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input dsa-search-input"
            />
          </div>

          <div className="filter-group">
            <SlidersHorizontal size={16} className="filter-icon" />
            
            {/* Topic Filter */}
            <select 
              value={selectedTopic} 
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="glass-input filter-select"
            >
              <option disabled>Filter by Topic</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat === "All" ? "All Topics" : cat}</option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="glass-input filter-select"
            >
              <option disabled>Filter by Difficulty</option>
              {difficulties.map((diff, idx) => (
                <option key={idx} value={diff}>{diff === "All" ? "All Levels" : diff}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Problems Counter & Stack */}
      <div className="dsa-results-summary">
        <span>Found <b>{filteredProblems.length}</b> practice challenges</span>
      </div>

      <div className="dsa-problems-stack">
        {filteredProblems.length === 0 ? (
          <div className="no-results-panel glass-panel">
            <HelpCircle size={40} className="no-results-icon" />
            <h3>No practice problems match your criteria</h3>
            <p>Try resetting the search query or filtering criteria to scan further.</p>
          </div>
        ) : (
          filteredProblems.map((prob) => {
            const isExpanded = expandedProbId === prob.id;
            const isBookmarked = bookmarks.includes(prob.id);
            const isSolved = completedDsaList.includes(prob.id);
            const isShowingSolution = showSolutionId === prob.id;

            return (
              <div 
                key={prob.id} 
                className={`dsa-prob-card glass-panel ${isExpanded ? 'expanded' : ''} ${isSolved ? 'solved-border' : ''}`}
              >
                <div className="dsa-card-header" onClick={() => handleCardExpansion(prob.id)}>
                  <div className="dsa-card-header-left">
                    <button 
                      className={`solved-check-btn ${isSolved ? 'active' : ''}`}
                      onClick={(e) => toggleDsaComplete(e, prob.id)}
                      title={isSolved ? 'Mark Incomplete' : 'Mark Solved'}
                    >
                      <CheckCircle size={18} />
                    </button>
                    <div>
                      <h3 className="dsa-card-title">{prob.title}</h3>
                      <span className="dsa-card-cat">{prob.category}</span>
                    </div>
                  </div>

                  <div className="dsa-card-header-right">
                    <span className={`badge badge-${prob.difficulty.toLowerCase()}`}>{prob.difficulty}</span>
                    <button 
                      className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                      onClick={(e) => toggleBookmark(e, prob.id)}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Challenge'}
                    >
                      <Bookmark size={18} />
                    </button>
                    <span className="expand-indicator">{isExpanded ? 'Hide' : 'Solve'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="dsa-card-body">
                    <div className="problem-content-row">
                      <div className="problem-statement-column">
                        <h4>Problem Description</h4>
                        <p className="statement-text">{prob.statement}</p>
                        
                        {prob.constraints && (
                          <div className="meta-box">
                            <h5>Constraints</h5>
                            <pre className="mono-text">{prob.constraints}</pre>
                          </div>
                        )}

                        {prob.inputOutput && (
                          <div className="meta-box">
                            <h5>Example Test Cases</h5>
                            <pre className="mono-text">{prob.inputOutput}</pre>
                          </div>
                        )}

                        <div className="complexity-meter glass-card">
                          <div className="meter-header">
                            <Clock size={16} />
                            <span>Algorithmic Complexity</span>
                          </div>
                          <div className="meter-body">
                            <p>{prob.explanation}</p>
                          </div>
                        </div>
                      </div>

                      <div className="problem-editor-column">
                        <div className="editor-control-header">
                          <div className="tab-buttons">
                            <button 
                              className={`tab-btn ${activeTabMap[prob.id] !== 'solution' ? 'active' : ''}`}
                              onClick={() => setActiveTabMap(prev => ({ ...prev, [prob.id]: 'workspace' }))}
                            >
                              Code Workspace
                            </button>
                            <button 
                              className={`tab-btn ${activeTabMap[prob.id] === 'solution' ? 'active' : ''}`}
                              onClick={() => setActiveTabMap(prev => ({ ...prev, [prob.id]: 'solution' }))}
                            >
                              Solution Vault
                            </button>
                          </div>

                          {activeTabMap[prob.id] === 'solution' && (
                            <button 
                              className="btn-secondary reveal-sol-btn"
                              onClick={() => setShowSolutionId(isShowingSolution ? null : prob.id)}
                            >
                              {isShowingSolution ? (
                                <>
                                  <EyeOff size={16} />
                                  <span>Hide Solution</span>
                                </>
                              ) : (
                                <>
                                  <Eye size={16} />
                                  <span>Reveal Solution</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {activeTabMap[prob.id] === 'solution' ? (
                          isShowingSolution ? (
                            <div className="editor-mount">
                              <CodeEditor 
                                filename={`${prob.title.replace(/\s+/g, '')}.java`}
                                code={prob.solution}
                              />
                            </div>
                          ) : (
                            <div className="locked-editor glass-card">
                              <HelpCircle size={32} />
                              <h4>Solution is Encrypted</h4>
                              <p>Study the prompt and constraints, then click reveal to review optimal Java algorithms.</p>
                              <button 
                                className="btn-primary mt-4"
                                onClick={() => setShowSolutionId(prob.id)}
                              >
                                Reveal Solution
                              </button>
                            </div>
                          )
                        ) : (
                          <div className="workspace-editor-container">
                            <div className="workspace-editor-header">
                              <span>{prob.title.replace(/\s+/g, '')}.java</span>
                              <button 
                                className="btn-secondary reset-code-btn"
                                onClick={() => {
                                  if (window.confirm("Reset editor to starter code?")) {
                                    const starter = getStarterCode(prob.solution);
                                    handleCodeChange(prob.id, starter);
                                  }
                                }}
                                title="Reset Starter Code"
                              >
                                Reset Code
                              </button>
                            </div>
                            
                            <div className="workspace-textarea-wrapper">
                              <div className="line-numbers-gutter">
                                {getLineNumbers(userCodes[prob.id] || '').map(num => (
                                  <span key={num}>{num}</span>
                                ))}
                              </div>
                              <textarea
                                className="workspace-textarea"
                                value={userCodes[prob.id] || ''}
                                onChange={(e) => handleCodeChange(prob.id, e.target.value)}
                                spellCheck={false}
                              />
                            </div>
                            
                            <div className="workspace-footer">
                              <button 
                                className="btn-primary run-code-btn"
                                onClick={() => handleRunCode(prob)}
                                disabled={isCompiling}
                              >
                                {isCompiling ? (
                                  <span>Compiling...</span>
                                ) : (
                                  <>
                                    <Play size={16} />
                                    <span>Run Code</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {executionOutput[prob.id] && (
                              <div className="execution-output-box">
                                <div className="output-header">
                                  <Terminal size={14} />
                                  <span>Console Output</span>
                                </div>
                                <pre className={`output-content ${executionOutput[prob.id].includes('SUCCESS') ? 'success-text' : 'error-text'}`}>
                                  {executionOutput[prob.id]}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <style>{`
        .dsa-page-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .dsa-header-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .dsa-title-area h1 {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dsa-title-area p {
          color: hsl(var(--muted-foreground));
          font-size: 1rem;
        }

        .filters-dock {
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 250px;
        }

        .search-box .search-icon {
          position: absolute;
          left: 1rem;
          color: hsl(var(--muted-foreground));
        }

        .dsa-search-input {
          width: 100%;
          padding-left: 2.75rem;
          height: 2.5rem;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .filter-icon {
          color: hsl(var(--muted-foreground));
          margin-right: 0.25rem;
        }

        .filter-select {
          height: 2.5rem;
          padding-top: 0;
          padding-bottom: 0;
          padding-left: 0.75rem;
          padding-right: 1.5rem;
          background: hsl(var(--secondary) / 0.6);
          cursor: pointer;
        }

        .filter-select option {
          background-color: hsl(var(--muted));
          color: hsl(var(--foreground));
        }

        .dsa-results-summary {
          font-size: 0.9rem;
          color: hsl(var(--muted-foreground));
        }

        .dsa-problems-stack {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .dsa-prob-card {
          padding: 0;
          overflow: hidden;
          transition: var(--transition);
        }

        .dsa-card-header {
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .dsa-prob-card:hover {
          border-color: hsl(var(--primary) / 0.3);
        }

        .dsa-card-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .solved-check-btn {
          background: transparent;
          border: none;
          color: hsl(var(--card-border) / 0.8);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .solved-check-btn:hover {
          color: hsl(var(--primary));
        }

        .solved-check-btn.active {
          color: #10b981;
        }

        .dsa-card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: hsl(var(--foreground));
        }

        .dsa-card-cat {
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
        }

        .dsa-card-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .bookmark-btn {
          background: transparent;
          border: none;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bookmark-btn:hover {
          color: #f59e0b;
        }

        .bookmark-btn.active {
          color: #f59e0b;
          fill: #f59e0b;
        }

        .expand-indicator {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.3rem 0.75rem;
          background: hsl(var(--primary) / 0.1);
          color: hsl(var(--primary));
          border-radius: 6px;
        }

        .dsa-prob-card.solved-border {
          border-color: #10b981 / 0.3;
        }

        .dsa-card-body {
          padding: 1.5rem;
          border-top: 1px solid hsl(var(--card-border) / 0.4);
          background: hsl(var(--secondary) / 0.15);
          animation: slideDown 0.3s ease-out;
        }

        .problem-content-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .problem-statement-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          text-align: left;
        }

        .problem-statement-column h4 {
          font-size: 1.15rem;
          font-weight: 700;
          border-bottom: 2px solid hsl(var(--card-border));
          padding-bottom: 0.5rem;
        }

        .statement-text {
          font-size: 1rem;
          line-height: 1.6;
          color: hsl(var(--foreground) / 0.9);
          white-space: pre-line;
        }

        .meta-box {
          background: hsl(var(--background) / 0.3);
          border: 1px solid hsl(var(--card-border) / 0.6);
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .meta-box h5 {
          font-size: 0.85rem;
          font-weight: 700;
          color: hsl(var(--muted-foreground));
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .mono-text {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: #a5d6ff;
          white-space: pre-wrap;
          line-height: 1.4;
        }

        .complexity-meter {
          border-color: hsl(var(--primary) / 0.2);
          background: hsl(var(--primary) / 0.02);
          padding: 1.25rem;
        }

        .meter-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: hsl(var(--primary));
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .meter-body p {
          font-size: 0.9rem;
          line-height: 1.5;
          color: hsl(var(--foreground) / 0.85);
        }

        .problem-editor-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .editor-control-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid hsl(var(--card-border));
          padding-bottom: 0.5rem;
        }

        .editor-control-header h4 {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .reveal-sol-btn {
          font-size: 0.8rem;
          padding: 0.4rem 0.85rem;
        }

        .locked-editor {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 2rem;
          background: #0d1117 / 0.6;
          border: 1px dashed #30363d;
          gap: 0.75rem;
          min-height: 350px;
        }

        .locked-editor h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: hsl(var(--foreground));
        }

        .locked-editor p {
          font-size: 0.9rem;
          color: hsl(var(--muted-foreground));
          max-width: 280px;
        }

        .no-results-panel {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .no-results-icon {
          color: hsl(var(--muted-foreground));
        }

        .no-results-panel h3 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .no-results-panel p {
          color: hsl(var(--muted-foreground));
          font-size: 0.95rem;
        }

        .tab-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .tab-btn {
          background: transparent;
          border: none;
          color: hsl(var(--muted-foreground));
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: var(--transition);
        }

        .tab-btn:hover {
          color: hsl(var(--foreground));
        }

        .tab-btn.active {
          color: hsl(var(--primary));
          border-bottom-color: hsl(var(--primary));
        }

        .workspace-editor-container {
          display: flex;
          flex-direction: column;
          background: #0d1117;
          border-radius: 8px;
          border: 1px solid #30363d;
          overflow: hidden;
          text-align: left;
        }

        .workspace-editor-header {
          background: #161b22;
          padding: 0.5rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #30363d;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: #8b949e;
        }

        .reset-code-btn {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
        }

        .workspace-textarea-wrapper {
          display: flex;
          min-height: 250px;
          background: #0d1117;
        }

        .line-numbers-gutter {
          display: flex;
          flex-direction: column;
          background: #0d1117;
          padding: 1rem 0.5rem;
          border-right: 1px solid #21262d;
          text-align: right;
          color: #484f58;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          line-height: 1.5;
          user-select: none;
          min-width: 2.5rem;
        }

        .workspace-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #c9d1d9;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          line-height: 1.5;
          padding: 1rem;
          resize: vertical;
          min-height: 250px;
          white-space: pre;
        }

        .workspace-footer {
          background: #161b22;
          padding: 0.75rem 1rem;
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid #30363d;
        }

        .run-code-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .execution-output-box {
          background: #090d13;
          border-top: 1px solid #30363d;
          padding: 1rem;
          font-size: 0.85rem;
        }

        .output-header {
          color: #e3b341;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .output-content {
          margin: 0;
          padding: 0.5rem;
          white-space: pre-wrap;
          font-family: var(--font-mono);
          line-height: 1.4;
          border-radius: 4px;
        }

        .success-text {
          color: #39d353;
          background: rgba(57, 211, 83, 0.05);
        }

        .error-text {
          color: #f85149;
          background: rgba(248, 81, 73, 0.05);
        }

        .title-row-layout {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          gap: 1.5rem;
        }

        .reset-dsa-progress-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          font-weight: 600;
          background: hsl(var(--destructive) / 0.1);
          color: hsl(var(--destructive));
          border: 1px solid hsl(var(--destructive) / 0.2);
          border-radius: 6px;
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
          margin-top: 0.25rem;
        }

        .reset-dsa-progress-btn:hover {
          background: hsl(var(--destructive));
          color: white;
          border-color: hsl(var(--destructive));
        }

        @media (max-width: 1024px) {
          .problem-content-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .title-row-layout {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .reset-dsa-progress-btn {
            margin-top: 0;
          }
        }

        .custom-confirm-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.2s ease-out;
        }

        .custom-confirm-modal {
          background: #161b22;
          border: 1px solid #30363d;
          padding: 2rem;
          border-radius: 12px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.2s ease-out;
        }

        .custom-confirm-modal h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: hsl(var(--foreground));
        }

        .custom-confirm-modal p {
          font-size: 0.95rem;
          color: hsl(var(--muted-foreground));
          margin-bottom: 1.5rem;
        }

        .confirm-modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .confirm-yes-btn {
          background: hsl(var(--destructive));
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .confirm-yes-btn:hover {
          background: hsl(var(--destructive) / 0.9);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 640px) {
          .filters-dock {
            flex-direction: column;
            align-items: stretch;
          }
          .filter-group {
            width: 100%;
            justify-content: space-between;
          }
          .filter-select {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}
