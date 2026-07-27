import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Layers, 
  Code, 
  Sparkles, 
  Bookmark, 
  History, 
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Award,
  Flame,
  Trophy,
  TrendingUp,
  Zap,
  ChevronRight,
  Brain,
  Terminal,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { javaBasics } from '../data/javaBasics';
import { oopsConcepts } from '../data/oops';
import { dsaProblems } from '../data/dsaProblems';
import { javaQuestions, dsaQuestions } from '../data/interviewQuestions';

export default function Dashboard({ setActiveTab, setNavigationPayload, bookmarks = [], setBookmarks }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  // Fetch active user
  const activeUser = JSON.parse(localStorage.getItem('wingora_active_user') || 'null');
  const getDisplayName = (id) => {
    if (!id) return 'Engineer';
    if (id.toUpperCase() === 'TC0001') return 'Nithya';
    try {
      const students = JSON.parse(localStorage.getItem('wingora_students') || '[]');
      const match = students.find(s => s.userID === id);
      if (match && match.password) {
        return match.password.replace(/123/g, '');
      }
    } catch (e) {}
    return id;
  };
  const username = activeUser ? getDisplayName(activeUser.userID) : 'Engineer';

  // Fetch metrics from localStorage
  const completedJava = JSON.parse(localStorage.getItem('completed_java') || '[]');
  const completedOops = JSON.parse(localStorage.getItem('completed_oops') || '[]');
  const completedDsa = JSON.parse(localStorage.getItem('completed_dsa') || '[]');
  const completedInterviews = parseInt(localStorage.getItem('completed_interviews') || '0', 10);
  const recentlyViewed = JSON.parse(localStorage.getItem('recently_viewed') || '[]');

  // Fetch MCQ Quiz stats from localStorage
  const javaHighScore = parseInt(localStorage.getItem('wingora_quiz_highscore_java') || '0', 10);
  const htmlHighScore = parseInt(localStorage.getItem('wingora_quiz_highscore_html') || '0', 10);
  const cssHighScore = parseInt(localStorage.getItem('wingora_quiz_highscore_css') || '0', 10);
  const jsHighScore = parseInt(localStorage.getItem('wingora_quiz_highscore_js') || '0', 10);
  const jdbcHighScore = parseInt(localStorage.getItem('wingora_quiz_highscore_jdbc') || '0', 10);
  
  const totalCompletedQuizzes = 
    parseInt(localStorage.getItem('wingora_quiz_completed_java') || '0', 10) +
    parseInt(localStorage.getItem('wingora_quiz_completed_html') || '0', 10) +
    parseInt(localStorage.getItem('wingora_quiz_completed_css') || '0', 10) +
    parseInt(localStorage.getItem('wingora_quiz_completed_js') || '0', 10) +
    parseInt(localStorage.getItem('wingora_quiz_completed_jdbc') || '0', 10);

  const bestScore = Math.max(javaHighScore, htmlHighScore, cssHighScore, jsHighScore, jdbcHighScore);

  // TCS Coding Stats
  const tcsCodingProgressRaw = JSON.parse(localStorage.getItem('wingora_tcs_progress_coding') || '{}');
  const tcsCodingCompletedDays = Object.values(tcsCodingProgressRaw).filter(day => day.status === 'completed').length;
  const tcsCodingProgress = Math.round((tcsCodingCompletedDays / 75) * 100);

  const tcsCodingMetaRaw = JSON.parse(localStorage.getItem('wingora_tcs_user_meta_coding') || '{}');
  const codingStreak = tcsCodingMetaRaw.streak_count || 0;
  const codingBestStreak = tcsCodingMetaRaw.best_streak || 0;

  // TCS Aptitude Stats
  const tcsAptitudeProgressRaw = JSON.parse(localStorage.getItem('wingora_tcs_aptitude_progress') || '{}');
  let tcsAptitudeCompletedSheets = 0;
  Object.keys(tcsAptitudeProgressRaw).forEach(cat => {
    const catProg = tcsAptitudeProgressRaw[cat] || {};
    tcsAptitudeCompletedSheets += Object.values(catProg).filter(d => d.status === 'completed').length;
  });
  const tcsAptitudeProgress = Math.round((tcsAptitudeCompletedSheets / 225) * 100);

  // Developer rank calculations
  const totalCompletedItems = completedJava.length + completedOops.length + completedDsa.length + tcsCodingCompletedDays + tcsAptitudeCompletedSheets;
  const developerLevel = Math.max(1, Math.min(100, Math.floor(totalCompletedItems / 2) + 1));
  const levelTitle = developerLevel < 10 ? 'Novice Coder' : developerLevel < 25 ? 'Code Ninja' : developerLevel < 50 ? 'DSA Specialist' : developerLevel < 80 ? 'System Architect' : 'Legendary Engineer';

  // Math totals
  const totalJavaProblems = javaBasics.reduce((acc, cat) => acc + cat.problems.length, 0);
  const totalOopsProblems = oopsConcepts.reduce((acc, cat) => acc + cat.problems.length, 0);
  const totalDsaProblems = dsaProblems.length;

  const javaProgress = totalJavaProblems > 0 ? Math.round((completedJava.length / totalJavaProblems) * 100) : 0;
  const oopsProgress = totalOopsProblems > 0 ? Math.round((completedOops.length / totalOopsProblems) * 100) : 0;
  const dsaProgress = totalDsaProblems > 0 ? Math.round((completedDsa.length / totalDsaProblems) * 100) : 0;

  // Handler for global search query
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lower = query.toLowerCase();
    const results = [];

    // Search Java Basics
    javaBasics.forEach(cat => {
      if (cat.title.toLowerCase().includes(lower) || cat.explanation.toLowerCase().includes(lower)) {
        results.push({ type: 'java', title: `Java: ${cat.title}`, target: cat.id, desc: 'Core Java fundamental topic' });
      }
      cat.problems.forEach(prob => {
        if (prob.title.toLowerCase().includes(lower) || prob.description.toLowerCase().includes(lower)) {
          results.push({ type: 'java', title: `Java Code: ${prob.title}`, target: cat.id, subTarget: prob.id, desc: prob.description });
        }
      });
    });

    // Search OOPs
    oopsConcepts.forEach(cat => {
      if (cat.title.toLowerCase().includes(lower) || cat.realWorldExplanation.toLowerCase().includes(lower)) {
        results.push({ type: 'oops', title: `OOPs: ${cat.title}`, target: cat.id, desc: 'Object-oriented programming concept' });
      }
    });

    // Search DSA Leetcode
    dsaProblems.forEach(prob => {
      if (prob.title.toLowerCase().includes(lower) || prob.statement.toLowerCase().includes(lower) || prob.category.toLowerCase().includes(lower)) {
        results.push({ type: 'dsa', title: `DSA: ${prob.title}`, target: prob.id, desc: `[${prob.category}] - ${prob.difficulty} level difficulty` });
      }
    });

    // Search Interviews
    const allQs = [...javaQuestions, ...dsaQuestions];
    allQs.forEach(q => {
      if (q.question.toLowerCase().includes(lower) || q.answer.toLowerCase().includes(lower)) {
        results.push({ type: 'interview', title: `Interview Q: ${q.question}`, target: q.id, desc: `AI simulator preparation: ${q.category}` });
      }
    });

    setSearchResults(results.slice(0, 8)); // Limit to 8 matching entries
  };

  const handleResultClick = (res) => {
    setSearchQuery("");
    setSearchResults([]);
    
    // Pass navigation parameters to parent
    setNavigationPayload({
      target: res.target,
      subTarget: res.subTarget
    });
    
    setActiveTab(res.type);
  };

  const handleRecentClick = (recent) => {
    setNavigationPayload({
      target: recent.target,
      subTarget: recent.subTarget
    });
    setActiveTab(recent.type);
  };

  const removeBookmark = (e, dsaId) => {
    e.stopPropagation();
    const updated = bookmarks.filter(id => id !== dsaId);
    setBookmarks(updated);
    localStorage.setItem('wingora_bookmarks', JSON.stringify(updated));
  };

  return (
    <div className="dashboard-page">
      {/* Gamified Premium Developer Hero Banner */}
      <div className="premium-hero-card glass-panel">
        {/* Radial ambient glow decoration */}
        <div className="hero-radial-glow" />

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'2rem', position:'relative', zIndex:1}}>
          <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
            <div style={{display:'flex', alignItems:'center', gap:'0.65rem', flexWrap:'wrap'}}>
              <span className="badge-premium-rank">
                <Zap size={11} className="badge-zap-icon" />
                {levelTitle}
              </span>
              <span style={{fontSize:'0.72rem', color:'hsl(var(--muted-foreground))', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em'}}>
                Level {developerLevel} • Rank XP: {totalCompletedItems * 10}
              </span>
            </div>
            
            <h1 className="hero-welcome-title">
              Welcome back, {username}! ⚡
            </h1>
            
            <p style={{color:'hsl(var(--muted-foreground))', fontSize:'0.92rem', maxWidth:'620px', lineHeight:1.6}}>
              Accelerate your engineering milestones. Solve practice worksheets, analyze OOP blueprints, tackle coding tracks, and evaluate progress using interactive MCQ engines.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="quick-stats-strip">
            <div className="mini-stat-tile tile-orange">
              <div className="mini-icon-wrapper">
                <Flame size={15} style={{fill:'currentColor'}} />
              </div>
              <div style={{display:'flex', flexDirection:'column'}}>
                <span className="mini-label">Streak Count</span>
                <span className="mini-value">{codingStreak} days</span>
              </div>
            </div>
            
            <div className="mini-stat-tile tile-yellow">
              <div className="mini-icon-wrapper">
                <Trophy size={15} />
              </div>
              <div style={{display:'flex', flexDirection:'column'}}>
                <span className="mini-label">Best Streak</span>
                <span className="mini-value">{codingBestStreak} days</span>
              </div>
            </div>

            <div className="mini-stat-tile tile-purple">
              <div className="mini-icon-wrapper">
                <Award size={15} />
              </div>
              <div style={{display:'flex', flexDirection:'column'}}>
                <span className="mini-label">Total Solved</span>
                <span className="mini-value">{totalCompletedItems} items</span>
              </div>
            </div>

            <div className="mini-stat-tile tile-cyan">
              <div className="mini-icon-wrapper">
                <TrendingUp size={15} />
              </div>
              <div style={{display:'flex', flexDirection:'column'}}>
                <span className="mini-label">Best MCQ</span>
                <span className="mini-value">{bestScore > 0 ? `${Math.round((bestScore/25)*100)}%` : '0%'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sleek Dashboard Controls Dock */}
      <div className="dashboard-controls-dock" style={{
        display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1.5rem', flexWrap:'wrap'
      }}>
        <div style={{display:'flex', flexDirection:'column', gap:'0.15rem'}}>
          <h2 style={{fontSize:'1.15rem', fontWeight:850, letterSpacing:'-0.01em'}}>Curriculum Modules</h2>
          <span style={{fontSize:'0.75rem', color:'hsl(var(--muted-foreground))'}}>Click on any panel to launch practice modules</span>
        </div>

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search lessons, patterns, code challenges..."
              value={searchQuery}
              onChange={handleSearch}
              className="glass-input search-input"
            />
          </div>

          {searchResults.length > 0 && (
            <div className="search-results-overlay glass-panel">
              {searchResults.map((res, idx) => (
                <div key={idx} className="search-result-item" onClick={() => handleResultClick(res)}>
                  <div className="result-item-header">
                    <span className="result-title">{res.title}</span>
                    <span className="result-badge">{res.type}</span>
                  </div>
                  <p className="result-desc">{res.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress Cards Matrix */}
      <div className="metrics-grid">
        {/* TCS Coding Card */}
        <div className="metric-card-premium glass-panel" onClick={() => setActiveTab('tcs_challenge')} style={{'--accent-color': '#f97316'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', gap:'1rem'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'0.35rem', flexGrow:1}}>
              <span className="metric-pretitle" style={{color:'#f97316'}}>TCS Curriculum</span>
              <h3 className="metric-title">75-Day Coding</h3>
              <p className="metric-subtitle">{tcsCodingCompletedDays} of 75 days solved</p>
            </div>
            <div className="progress-ring-container">
              <svg width="52" height="52" viewBox="0 0 36 36">
                <path className="progress-ring-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                <path strokeDasharray={`${tcsCodingProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="progress-ring-text" style={{color:'#f97316'}}>{tcsCodingProgress}%</div>
            </div>
          </div>
        </div>

        {/* TCS Aptitude Card */}
        <div className="metric-card-premium glass-panel" onClick={() => setActiveTab('tcs_aptitude')} style={{'--accent-color': '#38bdf8'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', gap:'1rem'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'0.35rem', flexGrow:1}}>
              <span className="metric-pretitle" style={{color:'#38bdf8'}}>TCS Curriculum</span>
              <h3 className="metric-title">Aptitude &amp; Reason</h3>
              <p className="metric-subtitle">{tcsAptitudeCompletedSheets} of 225 sheets solved</p>
            </div>
            <div className="progress-ring-container">
              <svg width="52" height="52" viewBox="0 0 36 36">
                <path className="progress-ring-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                <path strokeDasharray={`${tcsAptitudeProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="progress-ring-text" style={{color:'#38bdf8'}}>{tcsAptitudeProgress}%</div>
            </div>
          </div>
        </div>

        {/* Core Java Card */}
        <div className="metric-card-premium glass-panel" onClick={() => setActiveTab('java')} style={{'--accent-color': '#c084fc'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', gap:'1rem'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'0.35rem', flexGrow:1}}>
              <span className="metric-pretitle" style={{color:'#c084fc'}}>Foundations</span>
              <h3 className="metric-title">Core Java Basics</h3>
              <p className="metric-subtitle">{completedJava.length} of {totalJavaProblems} concepts</p>
            </div>
            <div className="progress-ring-container">
              <svg width="52" height="52" viewBox="0 0 36 36">
                <path className="progress-ring-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                <path strokeDasharray={`${javaProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="progress-ring-text" style={{color:'#c084fc'}}>{javaProgress}%</div>
            </div>
          </div>
        </div>

        {/* OOPs Card */}
        <div className="metric-card-premium glass-panel" onClick={() => setActiveTab('oops')} style={{'--accent-color': '#818cf8'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', gap:'1rem'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'0.35rem', flexGrow:1}}>
              <span className="metric-pretitle" style={{color:'#818cf8'}}>Design Patterns</span>
              <h3 className="metric-title">OOPs Blueprints</h3>
              <p className="metric-subtitle">{completedOops.length} of {totalOopsProblems} patterns</p>
            </div>
            <div className="progress-ring-container">
              <svg width="52" height="52" viewBox="0 0 36 36">
                <path className="progress-ring-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                <path strokeDasharray={`${oopsProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="progress-ring-text" style={{color:'#818cf8'}}>{oopsProgress}%</div>
            </div>
          </div>
        </div>

        {/* LeetCode DSA Card */}
        <div className="metric-card-premium glass-panel" onClick={() => setActiveTab('dsa')} style={{'--accent-color': '#34d399'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', gap:'1rem'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'0.35rem', flexGrow:1}}>
              <span className="metric-pretitle" style={{color:'#34d399'}}>LeetCode Track</span>
              <h3 className="metric-title">Data Structures</h3>
              <p className="metric-subtitle">{completedDsa.length} of {totalDsaProblems} solved</p>
            </div>
            <div className="progress-ring-container">
              <svg width="52" height="52" viewBox="0 0 36 36">
                <path className="progress-ring-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                <path strokeDasharray={`${dsaProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="progress-ring-text" style={{color:'#34d399'}}>{dsaProgress}%</div>
            </div>
          </div>
        </div>

        {/* AI Interview Card */}
        <div className="metric-card-premium glass-panel" onClick={() => setActiveTab('interview')} style={{'--accent-color': '#f472b6'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', gap:'1rem'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'0.35rem', flexGrow:1}}>
              <span className="metric-pretitle" style={{color:'#f472b6'}}>Simulator</span>
              <h3 className="metric-title">AI Mock Interview</h3>
              <p className="metric-subtitle">{completedInterviews} sessions completed</p>
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:'52px'}}>
              <div style={{
                width:'40px', height:'40px', borderRadius:'50%', border:'2px solid #f472b6',
                display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, color:'#f472b6',
                background:'rgba(244,114,182,0.1)', fontSize:'0.9rem'
              }}>
                {completedInterviews}
              </div>
            </div>
          </div>
        </div>

        {/* MCQ Quiz Card */}
        <div className="metric-card-premium glass-panel" onClick={() => setActiveTab('quiz')} style={{'--accent-color': '#60a5fa'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', gap:'1rem'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'0.35rem', flexGrow:1}}>
              <span className="metric-pretitle" style={{color:'#60a5fa'}}>Evaluation</span>
              <h3 className="metric-title">MCQ Practice Quiz</h3>
              <p className="metric-subtitle">Best Score: {bestScore}/25</p>
            </div>
            <div className="progress-ring-container">
              <svg width="52" height="52" viewBox="0 0 36 36">
                <path className="progress-ring-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                <path strokeDasharray={`${bestScore > 0 ? Math.round((bestScore/25)*100) : 0}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="progress-ring-text" style={{color:'#60a5fa'}}>{bestScore > 0 ? Math.round((bestScore/25)*100) : 0}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        {/* Recently Viewed Panel */}
        <div className="content-panel glass-panel">
          <div className="panel-header">
            <History size={18} className="panel-header-icon" />
            <h2>Recently Viewed</h2>
          </div>
          <div className="panel-body">
            {recentlyViewed.length === 0 ? (
              <p className="empty-state-text">No recently viewed lessons. Start learning to populate your stack!</p>
            ) : (
              <div className="recent-list">
                {recentlyViewed.map((recent, idx) => (
                  <div key={idx} className="recent-item" onClick={() => handleRecentClick(recent)}>
                    <div className="recent-info">
                      <span className="recent-type-badge">{recent.type}</span>
                      <h4>{recent.name}</h4>
                    </div>
                    <ArrowRight size={16} className="recent-arrow" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bookmarked Questions Panel */}
        <div className="content-panel glass-panel">
          <div className="panel-header">
            <Bookmark size={18} className="panel-header-icon text-yellow-icon" />
            <h2>Bookmarked Challenges</h2>
          </div>
          <div className="panel-body">
            {bookmarks.length === 0 ? (
              <p className="empty-state-text">No bookmarked questions. Mark LeetCode problems to revise later!</p>
            ) : (
              <div className="bookmarks-list">
                {bookmarks.map((bId) => {
                  const prob = dsaProblems.find(p => p.id === bId);
                  if (!prob) return null;
                  return (
                    <div key={bId} className="bookmark-item" onClick={() => handleRecentClick({type: 'dsa', target: prob.id})}>
                      <div className="bookmark-info">
                        <h4>{prob.title}</h4>
                        <div className="bookmark-meta">
                          <span className="bookmark-cat">{prob.category}</span>
                          <span className={`badge badge-${prob.difficulty.toLowerCase()}`}>{prob.difficulty}</span>
                        </div>
                      </div>
                      <button className="remove-bookmark-btn" onClick={(e) => removeBookmark(e, bId)} title="Remove Bookmark">
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-page {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .header-greetings h1 {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header-greetings p {
          color: hsl(var(--muted-foreground));
          font-size: 1rem;
        }

        .search-bar-container {
          position: relative;
          width: 450px;
          max-width: 100%;
        }

        .search-input-wrapper {
          display: flex;
          align-items: center;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: hsl(var(--muted-foreground));
        }

        .search-input {
          width: 100%;
          padding-left: 2.75rem;
          height: 3rem;
        }

        .search-results-overlay {
          position: absolute;
          top: 3.5rem;
          left: 0;
          right: 0;
          z-index: 200;
          max-height: 400px;
          overflow-y: auto;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          background: hsl(var(--card) / 0.95);
          border: 1px solid hsl(var(--card-border) / 0.8);
          border-radius: var(--radius);
        }

        .search-result-item {
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid hsl(var(--card-border) / 0.4);
          cursor: pointer;
          transition: var(--transition);
        }

        .search-result-item:last-child {
          border-bottom: none;
        }

        .search-result-item:hover {
          background: hsl(var(--secondary) / 0.6);
        }

        .result-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .result-title {
          font-weight: 600;
          font-size: 0.95rem;
          color: hsl(var(--foreground));
        }

        .result-badge {
          font-size: 0.7rem;
          text-transform: uppercase;
          background: hsl(var(--primary) / 0.15);
          color: hsl(var(--primary));
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-weight: 700;
        }

        .result-desc {
          font-size: 0.8rem;
          color: hsl(var(--muted-foreground));
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .premium-hero-card {
          padding: 2.25rem;
          margin-bottom: 0.5rem;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(13, 17, 28, 0.7) 0%, rgba(124, 58, 237, 0.12) 100%);
          border: 1px solid rgba(139, 92, 246, 0.22);
          border-radius: var(--radius);
          box-shadow: 0 12px 40px rgba(0,0,0,0.25);
          backdrop-filter: blur(20px);
        }

        [data-theme='light'] .premium-hero-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(124, 58, 237, 0.08) 100%);
          border: 1px solid rgba(124, 58, 237, 0.18);
          box-shadow: 0 12px 40px rgba(0,0,0,0.06);
        }

        .hero-radial-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        [data-theme='light'] .hero-radial-glow {
          background: radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, transparent 70%);
        }

        .badge-premium-rank {
          background: linear-gradient(135deg, #7c3aed, #6d28d9);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.3rem 0.8rem;
          border-radius: 99px;
          box-shadow: 0 0 12px rgba(124, 58, 237, 0.4);
          display: inline-flex;
          align-items: center;
        }

        [data-theme='light'] .badge-premium-rank {
          box-shadow: 0 0 12px rgba(124, 58, 237, 0.2);
        }

        .badge-zap-icon {
          margin-right: 0.3rem;
          fill: #fff;
        }

        .hero-welcome-title {
          font-size: 2.5rem;
          font-weight: 950;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0.35rem 0;
          background: linear-gradient(135deg, #e2e8f0 0%, #a78bfa 50%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        [data-theme='light'] .hero-welcome-title {
          background: linear-gradient(135deg, #1e1b4b 0%, #6d28d9 50%, #7c3aed 100%);
        }

        .quick-stats-strip {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          min-width: 320px;
        }

        .mini-stat-tile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
          backdrop-filter: blur(10px);
        }

        [data-theme='light'] .mini-stat-tile {
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .tile-orange .mini-icon-wrapper {
          background: rgba(249, 115, 22, 0.12);
          border: 1px solid rgba(249, 115, 22, 0.2);
          color: #f97316;
        }
        .tile-orange .mini-value {
          color: #f97316;
        }

        .tile-yellow .mini-icon-wrapper {
          background: rgba(234, 179, 8, 0.12);
          border: 1px solid rgba(234, 179, 8, 0.2);
          color: #eab308;
        }
        .tile-yellow .mini-value {
          color: #eab308;
        }

        .tile-purple .mini-icon-wrapper {
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.2);
          color: #c084fc;
        }
        .tile-purple .mini-value {
          color: #c084fc;
        }

        .tile-cyan .mini-icon-wrapper {
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.2);
          color: #22d3ee;
        }
        .tile-cyan .mini-value {
          color: #22d3ee;
        }

        .mini-icon-wrapper {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mini-label {
          font-size: 0.65rem;
          color: hsl(var(--muted-foreground));
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
        }

        .mini-value {
          font-size: 0.85rem;
          font-weight: 800;
        }

        .dashboard-controls-dock {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 0.75rem;
          padding: 1rem 1.5rem;
          margin-bottom: 0.5rem;
          backdrop-filter: blur(15px);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .metric-card-premium {
          padding: 1.35rem 1.5rem;
          border-radius: 0.85rem;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .metric-card-premium::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: var(--accent-color);
          opacity: 0.45;
          transition: opacity 0.3s ease;
        }

        .metric-card-premium:hover {
          transform: translateY(-4px);
          border-color: var(--accent-color);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25), 0 0 15px rgba(var(--accent-color), 0.15);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
        }

        .metric-card-premium:hover::before {
          opacity: 1;
        }

        .metric-pretitle {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 800;
        }

        .metric-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: hsl(var(--foreground));
          margin: 0.15rem 0;
        }

        .metric-subtitle {
          font-size: 0.78rem;
          color: hsl(var(--muted-foreground));
        }

        .progress-ring-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          flex-shrink: 0;
        }

        .progress-ring-container svg {
          transform: rotate(-90deg);
        }

        .progress-ring-container path {
          transition: stroke-dasharray 0.6s ease;
        }

        .progress-ring-text {
          position: absolute;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .fill-purple { background: #7c3aed; }
        .fill-indigo { background: #4f46e5; }
        .fill-green { background: #059669; }

        .progress-percentage {
          font-size: 0.8rem;
          font-weight: 700;
          color: hsl(var(--foreground));
        }

        .metric-footer {
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
        }

        .interview-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-circle {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          border: 3px solid hsl(var(--primary));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-num {
          font-size: 1.1rem;
          font-weight: 800;
        }

        .dashboard-content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 1.5rem;
        }

        .content-panel {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border-bottom: 1px solid hsl(var(--card-border) / 0.4);
          padding-bottom: 0.75rem;
        }

        .panel-header-icon {
          color: hsl(var(--primary));
        }

        .text-yellow-icon {
          color: #f59e0b;
        }

        .panel-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .empty-state-text {
          font-size: 0.9rem;
          color: hsl(var(--muted-foreground));
          text-align: center;
          padding: 2rem 0;
        }

        .recent-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .recent-item {
          padding: 1rem;
          background: hsl(var(--secondary) / 0.3);
          border: 1px solid hsl(var(--card-border) / 0.4);
          border-radius: 0.75rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: var(--transition);
        }

        .recent-item:hover {
          background: hsl(var(--secondary) / 0.6);
          border-color: hsl(var(--primary) / 0.3);
        }

        .recent-info {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .recent-type-badge {
          font-size: 0.65rem;
          text-transform: uppercase;
          background: hsl(var(--primary) / 0.1);
          color: hsl(var(--primary));
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
          width: fit-content;
          font-weight: 700;
        }

        .recent-item h4 {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .recent-arrow {
          color: hsl(var(--muted-foreground));
          transition: var(--transition);
        }

        .recent-item:hover .recent-arrow {
          transform: translateX(4px);
          color: hsl(var(--primary));
        }

        .bookmarks-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .bookmark-item {
          padding: 1rem;
          background: hsl(var(--secondary) / 0.3);
          border: 1px solid hsl(var(--card-border) / 0.4);
          border-radius: 0.75rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: var(--transition);
        }

        .bookmark-item:hover {
          background: hsl(var(--secondary) / 0.6);
          border-color: hsl(var(--primary) / 0.3);
        }

        .bookmark-info {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .bookmark-info h4 {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .bookmark-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bookmark-cat {
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
        }

        .remove-bookmark-btn {
          background: transparent;
          border: none;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          font-size: 0.95rem;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .remove-bookmark-btn:hover {
          background: hsl(var(--destructive) / 0.15);
          color: #ef4444;
        }



        @media (max-width: 768px) {
          .quick-stats-strip {
            grid-template-columns: 1fr;
            min-width: 100%;
          }
          .dashboard-controls-dock {
            flex-direction: column;
            align-items: flex-start;
          }
          .search-bar-container {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .search-bar-container {
            width: 100%;
          }

          .dashboard-content-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
