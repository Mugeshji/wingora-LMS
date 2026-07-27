import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Search, 
  SlidersHorizontal, 
  HelpCircle, 
  Clock, 
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { dsaProblems } from '../data/dsaProblems';
import CodeEditor from '../components/CodeEditor';

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

  // Load completed list from local storage
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('completed_dsa') || '[]');
    setCompletedDsaList(list);
  }, []);

  // Handle payload from global search
  useEffect(() => {
    if (navigationPayload && navigationPayload.target) {
      const match = dsaProblems.find(p => p.id === navigationPayload.target);
      if (match) {
        setExpandedProbId(match.id);
        setShowSolutionId(match.id);
        // Reset filters so the selected problem is visible
        setSelectedTopic("All");
        setSelectedDifficulty("All");
        setSearchQuery("");
      }
      setNavigationPayload(null);
    }
  }, [navigationPayload, setNavigationPayload]);

  // Save to recently viewed when a problem is expanded
  useEffect(() => {
    if (!expandedProbId) return;
    const prob = dsaProblems.find(p => p.id === expandedProbId);
    if (!prob) return;

    const recent = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
    const filtered = recent.filter(item => !(item.type === 'dsa' && item.target === prob.id));
    const updated = [
      { type: 'dsa', name: `DSA: ${prob.title}`, target: prob.id },
      ...filtered
    ].slice(0, 5);
    localStorage.setItem('recently_viewed', JSON.stringify(updated));
  }, [expandedProbId]);

  const toggleBookmark = (e, probId) => {
    e.stopPropagation();
    let updated;
    if (bookmarks.includes(probId)) {
      updated = bookmarks.filter(id => id !== probId);
    } else {
      updated = [...bookmarks, probId];
    }
    setBookmarks(updated);
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
    localStorage.setItem('completed_dsa', JSON.stringify(updated));
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
      <div className="dsa-header-section">
        <div className="dsa-title-area">
          <h1>LeetCode DSA Practice</h1>
          <p>Sharpen your algorithmic thinking. Filter by topic or difficulty and explore hand-crafted solutions.</p>
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
                <div className="dsa-card-header" onClick={() => setExpandedProbId(isExpanded ? null : prob.id)}>
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
                          <h4>Solution Vault</h4>
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
                        </div>

                        {isShowingSolution ? (
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
          background: hsl(var(--secondary) / 0.6);
          cursor: pointer;
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

        @media (max-width: 1024px) {
          .problem-content-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
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
