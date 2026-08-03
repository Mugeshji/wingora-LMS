import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  HelpCircle, 
  Tv, 
  Code, 
  Smile, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  Cpu
} from 'lucide-react';
import { oopsConcepts } from '../data/oops';
import CodeEditor from '../components/CodeEditor';

export default function OOPsConcepts({ navigationPayload, setNavigationPayload }) {
  const activeUser = React.useMemo(() => {
    try {
      const saved = localStorage.getItem('wingora_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const userSuffix = activeUser?.userID ? `_${activeUser.userID}` : '';

  const [selectedConceptId, setSelectedConceptId] = useState(oopsConcepts[0].id);
  const [activeSubTab, setActiveSubTab] = useState('analogy'); // 'analogy', 'blueprint', 'drills'
  const [revealedQuestionIdx, setRevealedQuestionIdx] = useState(null);
  const [completedOopsList, setCompletedOopsList] = useState([]);

  // Load completed items from local storage
  useEffect(() => {
    const list = JSON.parse(
      localStorage.getItem(`completed_oops${userSuffix}`) ||
      localStorage.getItem('completed_oops') ||
      '[]'
    );
    setCompletedOopsList(list);
  }, [userSuffix]);

  // Handle payload from global search
  useEffect(() => {
    if (navigationPayload && navigationPayload.target) {
      const match = oopsConcepts.find(cat => cat.id === navigationPayload.target);
      if (match) {
        setSelectedConceptId(match.id);
        setActiveSubTab('analogy');
      }
      setNavigationPayload(null);
    }
  }, [navigationPayload, setNavigationPayload]);

  const currentConcept = oopsConcepts.find(c => c.id === selectedConceptId) || oopsConcepts[0];

  // Save to recently viewed
  useEffect(() => {
    if (!currentConcept) return;
    const recent = JSON.parse(
      localStorage.getItem(`recently_viewed${userSuffix}`) ||
      localStorage.getItem('recently_viewed') ||
      '[]'
    );
    const filtered = recent.filter(item => !(item.type === 'oops' && item.target === currentConcept.id));
    const updated = [
      { type: 'oops', name: `OOPs: ${currentConcept.title}`, target: currentConcept.id },
      ...filtered
    ].slice(0, 5);
    localStorage.setItem(`recently_viewed${userSuffix}`, JSON.stringify(updated));
    localStorage.setItem('recently_viewed', JSON.stringify(updated));
  }, [selectedConceptId, userSuffix]);

  const toggleOopsComplete = (id) => {
    let updated;
    if (completedOopsList.includes(id)) {
      updated = completedOopsList.filter(item => item !== id);
    } else {
      updated = [...completedOopsList, id];
    }
    setCompletedOopsList(updated);
    localStorage.setItem(`completed_oops${userSuffix}`, JSON.stringify(updated));
    localStorage.setItem('completed_oops', JSON.stringify(updated));
  };

  const isCompleted = completedOopsList.includes(selectedConceptId);

  return (
    <div className="oops-page-container">
      <div className="oops-header-section">
        <h1>Object Oriented Programming (OOPs)</h1>
        <p>Master the 8 foundational pillars of modern software architecture with real-world system design blueprints.</p>
      </div>

      {/* Categories Grid Selector */}
      <div className="oops-grid-selector">
        {oopsConcepts.map((concept) => {
          const isSelected = selectedConceptId === concept.id;
          const isDone = completedOopsList.includes(concept.id);
          return (
            <button
              key={concept.id}
              onClick={() => {
                setSelectedConceptId(concept.id);
                setActiveSubTab('analogy');
                setRevealedQuestionIdx(null);
              }}
              className={`oops-grid-card glass-card ${isSelected ? 'active-grid' : ''} ${isDone ? 'completed-grid' : ''}`}
            >
              <div className="oops-card-top">
                <Layers className={`oops-icon ${isSelected ? 'animate-pulse' : ''}`} size={20} />
                {isDone && <CheckCircle size={16} className="text-green-icon" />}
              </div>
              <h3>{concept.title}</h3>
            </button>
          );
        })}
      </div>

      {/* Main interactive viewport */}
      <div className="oops-concept-viewport glass-panel">
        <div className="viewport-header">
          <div className="viewport-title-box">
            <h2>{currentConcept.title}</h2>
            <button 
              className={`btn-secondary complete-toggle-btn ${isCompleted ? 'active' : ''}`}
              onClick={() => toggleOopsComplete(currentConcept.id)}
            >
              <CheckCircle size={16} />
              <span>{isCompleted ? 'Completed Concept' : 'Mark Completed'}</span>
            </button>
          </div>

          {/* Sub tabs selector */}
          <div className="oops-sub-tabs">
            <button 
              className={`sub-tab-btn ${activeSubTab === 'analogy' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('analogy')}
            >
              <Smile size={16} />
              <span>Real-World Analogy</span>
            </button>
            <button 
              className={`sub-tab-btn ${activeSubTab === 'blueprint' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('blueprint')}
            >
              <Code size={16} />
              <span>Coding Blueprint</span>
            </button>
            <button 
              className={`sub-tab-btn ${activeSubTab === 'drills' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('drills')}
            >
              <HelpCircle size={16} />
              <span>Interview Drills</span>
            </button>
          </div>
        </div>

        <div className="viewport-body">
          {activeSubTab === 'analogy' && (
            <div className="analogy-view-content">
              <div className="analogy-illustration glass-card">
                <div className="illustration-icon-wrapper">
                  <Cpu size={32} />
                </div>
                <div className="illustration-text">
                  <h3>Real-World Analogy</h3>
                  <p>{currentConcept.realWorldExplanation}</p>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'blueprint' && (
            <div className="blueprint-view-content">
              <div className="blueprint-overview">
                <h3>Industrial Implementation Blueprint</h3>
                <p>Observe the Java solution code representing proper architectural instantiation of {currentConcept.title}.</p>
              </div>
              {currentConcept.problems.map((prob, idx) => (
                <div key={idx} className="oops-problem-editor">
                  <h4 className="oops-prob-title">Challenge: {prob.title}</h4>
                  <p className="oops-prob-desc">{prob.description}</p>
                  <CodeEditor 
                    filename={`${prob.title.replace(/\s+/g, '')}.java`}
                    code={prob.solution}
                    output={prob.output}
                  />
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'drills' && (
            <div className="drills-view-content">
              <h3>Concept Mastery Interview Drills</h3>
              <p className="drills-header-desc">Tap on any question card below to reveal complete, industry-standard interview explanations.</p>
              <div className="drills-stack">
                {currentConcept.interviewQuestions.map((q, idx) => {
                  const isRevealed = revealedQuestionIdx === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`drill-card glass-panel ${isRevealed ? 'revealed' : ''}`}
                      onClick={() => setRevealedQuestionIdx(isRevealed ? null : idx)}
                    >
                      <div className="drill-card-header">
                        <span className="question-prefix">Q{idx + 1}.</span>
                        <h4>{q.question}</h4>
                        <div className="drill-toggle-arrow">
                          {isRevealed ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </div>
                      {isRevealed && (
                        <div className="drill-card-answer animate-fade">
                          <p>{q.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .oops-page-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .oops-header-section h1 {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .oops-header-section p {
          color: hsl(var(--muted-foreground));
          font-size: 1rem;
        }

        .oops-grid-selector {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem;
        }

        .oops-grid-card {
          padding: 1.25rem;
          cursor: pointer;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          height: 100%;
          color: white;
        }

        [data-theme='light'] .oops-grid-card {
          color: black;
        }

        .oops-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .oops-icon {
          color: hsl(var(--muted-foreground));
          transition: var(--transition);
        }

        .oops-grid-card.active-grid {
          border-color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.1);
          color: white;
        }

        [data-theme='light'] .oops-grid-card.active-grid {
          color: hsl(var(--primary));
        }

        .oops-grid-card.active-grid .oops-icon {
          color: hsl(var(--primary));
        }

        .oops-grid-card.completed-grid {
          border-color: #10b981 / 0.3;
        }

        .text-green-icon {
          color: #10b981;
        }

        .oops-grid-card h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: inherit;
        }

        .oops-concept-viewport {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .viewport-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          border-bottom: 1px solid hsl(var(--card-border) / 0.4);
          padding-bottom: 1.25rem;
        }

        .viewport-title-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .viewport-title-box h2 {
          font-size: 1.75rem;
          font-weight: 800;
        }

        .complete-toggle-btn.active {
          border-color: #10b981;
          color: #10b981;
          background: #10b981 / 0.05;
        }

        .oops-sub-tabs {
          display: flex;
          gap: 0.5rem;
          background: hsl(var(--secondary) / 0.4);
          border: 1px solid hsl(var(--card-border) / 0.4);
          padding: 0.25rem;
          border-radius: 0.75rem;
          width: fit-content;
        }

        .sub-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1rem;
          background: transparent;
          border: none;
          border-radius: 0.5rem;
          color: hsl(var(--muted-foreground));
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .sub-tab-btn:hover {
          color: hsl(var(--foreground));
        }

        .sub-tab-btn.active {
          background: hsl(var(--primary));
          color: white;
          box-shadow: 0 4px 10px hsl(var(--primary) / 0.3);
        }

        .viewport-body {
          min-height: 250px;
        }

        .analogy-illustration {
          padding: 2rem;
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          background: hsl(var(--secondary) / 0.2);
          border-color: hsl(var(--card-border) / 0.6);
        }

        .illustration-icon-wrapper {
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.6));
          width: 4rem;
          height: 4rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 8px 20px hsl(var(--primary) / 0.25);
        }

        .illustration-text h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }

        .illustration-text p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: hsl(var(--foreground) / 0.85);
        }

        .blueprint-view-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .blueprint-overview h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }

        .blueprint-overview p {
          font-size: 0.95rem;
          color: hsl(var(--muted-foreground));
        }

        .oops-problem-editor {
          border-top: 1px solid hsl(var(--card-border) / 0.4);
          padding-top: 1.5rem;
        }

        .oops-prob-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .oops-prob-desc {
          font-size: 0.95rem;
          color: hsl(var(--foreground) / 0.9);
          margin-bottom: 1rem;
        }

        .drills-view-content {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .drills-view-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .drills-header-desc {
          font-size: 0.95rem;
          color: hsl(var(--muted-foreground));
          margin-bottom: 0.5rem;
        }

        .drills-stack {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .drill-card {
          padding: 1.25rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .drill-card:hover {
          border-color: hsl(var(--primary) / 0.2);
        }

        .drill-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          user-select: none;
        }

        .question-prefix {
          font-weight: 700;
          color: hsl(var(--primary));
          font-size: 1.05rem;
        }

        .drill-card-header h4 {
          font-size: 1.05rem;
          font-weight: 600;
          flex: 1;
        }

        .drill-toggle-arrow {
          color: hsl(var(--muted-foreground));
        }

        .drill-card-answer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid hsl(var(--card-border) / 0.3);
          animation: fadeIn 0.4s ease;
        }

        .drill-card-answer p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: hsl(var(--foreground) / 0.85);
          white-space: pre-wrap;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-3px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .viewport-title-box {
            flex-direction: column;
            align-items: flex-start;
          }
          .complete-toggle-btn {
            width: 100%;
            justify-content: center;
          }
          .oops-sub-tabs {
            width: 100%;
            justify-content: space-around;
          }
        }
      `}</style>
    </div>
  );
}
