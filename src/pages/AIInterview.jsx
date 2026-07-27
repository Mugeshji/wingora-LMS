import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Clock, 
  CheckCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw,
  AlertCircle,
  Award,
  BookOpen,
  UserCheck,
  Cpu
} from 'lucide-react';
import { javaQuestions, dsaQuestions, hrQuestions } from '../data/interviewQuestions';
import TypingAnimation from '../components/TypingAnimation';

export default function AIInterview() {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [category, setCategory] = useState("Adaptive"); // "Java", "DSA", "HR", "Adaptive"
  const [currentDiff, setCurrentDiff] = useState("Easy"); // "Easy", "Medium", "Hard"
  
  const [questionCount, setQuestionCount] = useState(0);
  const [maxQuestions] = useState(5);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Timer State
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Performance Log
  const [history, setHistory] = useState([]);
  const [interviewFinished, setInterviewFinished] = useState(false);

  // Sound effect mock (we'll play a clean beep via browser synth)
  const playSound = (freq = 440, duration = 0.08) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context may be blocked by browser policy
    }
  };

  // Timer Management
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Select next question adaptively
  const getNextQuestion = (feedback = null) => {
    let nextDifficulty = currentDiff;
    
    // Adapt difficulty based on performance
    if (feedback === "nailed") {
      if (currentDiff === "Easy") nextDifficulty = "Medium";
      else if (currentDiff === "Medium") nextDifficulty = "Hard";
    } else if (feedback === "failed") {
      if (currentDiff === "Hard") nextDifficulty = "Medium";
      else if (currentDiff === "Medium") nextDifficulty = "Easy";
    }
    setCurrentDiff(nextDifficulty);

    // Filter potential questions
    let dataset = [];
    if (category === "Java") dataset = javaQuestions;
    else if (category === "DSA") dataset = dsaQuestions;
    else if (category === "HR") dataset = hrQuestions;
    else {
      // Adaptive aggregates Java + DSA
      dataset = [...javaQuestions, ...dsaQuestions];
    }

    // Attempt to match difficulty first
    let candidates = dataset.filter(q => q.difficulty === nextDifficulty);
    if (candidates.length === 0) {
      candidates = dataset; // Fallback
    }

    // Exclude previously asked questions
    const askedIds = history.map(h => h.question.id);
    let freshCandidates = candidates.filter(q => !askedIds.includes(q.id));
    if (freshCandidates.length === 0) {
      freshCandidates = candidates; // Reset list if all consumed
    }

    // Select randomly
    const randomQ = freshCandidates[Math.floor(Math.random() * freshCandidates.length)];
    
    setActiveQuestion(randomQ);
    setSeconds(0);
    setIsTimerRunning(true);
    setShowAnswer(false);
    setQuestionCount(prev => prev + 1);
    playSound(600, 0.1);
  };

  const startInterviewLoop = (selectedCat) => {
    playSound(800, 0.15);
    setCategory(selectedCat);
    setHistory([]);
    setQuestionCount(0);
    setCurrentDiff("Easy");
    setInterviewFinished(false);
    setInterviewStarted(true);
    
    // Wait tiny bit for state sync
    setTimeout(() => {
      // Inline generation for first question
      let dataset = selectedCat === "Java" ? javaQuestions : selectedCat === "DSA" ? dsaQuestions : selectedCat === "HR" ? hrQuestions : [...javaQuestions, ...dsaQuestions];
      const candidates = dataset.filter(q => q.difficulty === "Easy");
      const randomQ = candidates[Math.floor(Math.random() * candidates.length)] || dataset[0];
      
      setActiveQuestion(randomQ);
      setSeconds(0);
      setIsTimerRunning(true);
      setShowAnswer(false);
      setQuestionCount(1);
    }, 100);
  };

  const handleFeedback = (performance) => {
    // Save to history log
    setHistory(prev => [
      ...prev,
      {
        question: activeQuestion,
        time: seconds,
        rating: performance // "nailed" or "practice"
      }
    ]);
    
    setIsTimerRunning(false);

    if (questionCount >= maxQuestions) {
      // Finish interview
      setTimeout(() => {
        setInterviewFinished(true);
        setIsTimerRunning(false);
        playSound(1000, 0.3);
        
        // Log interview count to local storage
        const counts = parseInt(localStorage.getItem('completed_interviews') || '0', 10);
        localStorage.setItem('completed_interviews', (counts + 1).toString());
      }, 500);
    } else {
      getNextQuestion(performance);
    }
  };

  const getAccuracy = () => {
    const nailedCount = history.filter(h => h.rating === 'nailed').length;
    return Math.round((nailedCount / maxQuestions) * 100);
  };

  return (
    <div className="interview-page">
      {!interviewStarted ? (
        // Starter Landing Screen
        <div className="interview-landing glass-panel">
          <div className="landing-badge">
            <Sparkles size={16} />
            <span>AI Simulator Ready</span>
          </div>
          <h1>Realistic Technical Interview Simulator</h1>
          <p>
            Put your knowledge to the test. Simulate a premium tech panel. 
            Select a target vertical and answer 5 consecutive conceptual prompts. 
            The system adapts question difficulties based on your real-time performance.
          </p>

          <div className="setup-category-row">
            <h3>Choose your interview track:</h3>
            <div className="categories-card-grid">
              <button className="category-setup-card glass-card" onClick={() => startInterviewLoop("Java")}>
                <BookOpen size={24} className="cat-icon text-purple" />
                <h4>Java Core</h4>
                <p>Heap vs Stack, Immutability, Collections working parameters, multithreading.</p>
              </button>

              <button className="category-setup-card glass-card" onClick={() => startInterviewLoop("DSA")}>
                <Cpu size={24} className="cat-icon text-green" />
                <h4>Data Structures</h4>
                <p>Complexity analysis, search mechanics, dynamic comparisons, recurrences.</p>
              </button>

              <button className="category-setup-card glass-card" onClick={() => startInterviewLoop("HR")}>
                <UserCheck size={24} className="cat-icon text-pink" />
                <h4>HR & Behavior</h4>
                <p>STAR behavioral methods, conflict resolution, past experience reviews.</p>
              </button>

              <button className="category-setup-card glass-card active-adaptive" onClick={() => startInterviewLoop("Adaptive")}>
                <Sparkles size={24} className="cat-icon text-gold" />
                <h4>AI Adaptive</h4>
                <p>Fully progressive flow combining Java + DSA questions shifting from Easy to Hard.</p>
              </button>
            </div>
          </div>
        </div>
      ) : interviewFinished ? (
        // Finished Screen (Report Card)
        <div className="interview-report glass-panel animate-fade">
          <div className="report-badge">
            <Award size={20} />
            <span>Interview Complete</span>
          </div>
          <h1>Candidate Evaluation Summary</h1>
          <p>Fantastic job completing the mock tech interview panel. Review your architectural alignment scoring details below.</p>

          <div className="eval-results-grid">
            <div className="eval-card glass-card">
              <h3>Overall Grade</h3>
              <div className="grade-badge-circle">
                <span>{getAccuracy() >= 80 ? 'A+' : getAccuracy() >= 60 ? 'B' : 'C'}</span>
              </div>
              <p>{getAccuracy()}% Nailed Score</p>
            </div>

            <div className="eval-card glass-card">
              <h3>Track Specs</h3>
              <div className="specs-list">
                <div className="spec-row">
                  <span>Interview Track:</span>
                  <b>{category}</b>
                </div>
                <div className="spec-row">
                  <span>Questions Asked:</span>
                  <b>{maxQuestions}</b>
                </div>
                <div className="spec-row">
                  <span>Peak Difficulty:</span>
                  <b className={`text-${currentDiff.toLowerCase()}`}>{currentDiff}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline-review">
            <h3>Question-by-Question Evaluation</h3>
            <div className="review-stack">
              {history.map((h, idx) => (
                <div key={idx} className="review-card glass-panel">
                  <div className="review-card-header">
                    <span className="review-num">Q{idx + 1}</span>
                    <span className={`badge badge-${h.question.difficulty.toLowerCase()}`}>{h.question.difficulty}</span>
                    <span className="review-time"><Clock size={12} /> {formatTime(h.time)}</span>
                    <span className={`rating-pill ${h.rating === 'nailed' ? 'pill-green' : 'pill-yellow'}`}>
                      {h.rating === 'nailed' ? 'Nailed It' : 'Need Practice'}
                    </span>
                  </div>
                  <h4>{h.question.question}</h4>
                </div>
              ))}
            </div>
          </div>

          <button className="btn-primary reset-btn" onClick={() => setInterviewStarted(false)}>
            <RotateCcw size={16} />
            <span>Start Fresh Session</span>
          </button>
        </div>
      ) : (
        // Active Question Screen (Simulator Cockpit)
        <div className="interview-cockpit glass-panel">
          <div className="cockpit-header">
            <div className="cockpit-meta-left">
              <span className="track-badge">{category} Panel</span>
              <span className="count-badge">Question {questionCount} of {maxQuestions}</span>
            </div>
            
            <div className="cockpit-meta-right">
              <span className={`difficulty-indicator diff-${currentDiff.toLowerCase()}`}>
                Level: {currentDiff}
              </span>
              <div className="mock-timer">
                <Clock size={16} className="timer-icon" />
                <span>{formatTime(seconds)}</span>
              </div>
            </div>
          </div>

          {/* Prompt card containing typing question */}
          <div className="question-prompt-card glass-card">
            <div className="robot-avatar">🤖</div>
            <div className="question-content">
              <h3>Interviewer prompt:</h3>
              <p className="typed-question-box">
                {activeQuestion && (
                  <TypingAnimation 
                    text={activeQuestion.question} 
                    speed={25}
                  />
                )}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="cockpit-actions">
            {!showAnswer ? (
              <button className="btn-primary reveal-btn" onClick={() => { setShowAnswer(true); playSound(700, 0.08); }}>
                <span>Reveal Architectural Answer</span>
              </button>
            ) : (
              <div className="evaluation-panel animate-fade">
                <div className="evaluation-card glass-card">
                  <div className="answer-section">
                    <h4>Optimal Reference Response</h4>
                    <p className="answer-text">{activeQuestion?.answer}</p>
                  </div>
                  
                  {activeQuestion?.followUp && (
                    <div className="followup-section">
                      <div className="followup-title">
                        <AlertCircle size={14} />
                        <span>Adaptive Follow-up Query</span>
                      </div>
                      <p className="followup-text">{activeQuestion.followUp}</p>
                    </div>
                  )}
                </div>

                <div className="scoring-row">
                  <h4>Rate your response alignment:</h4>
                  <div className="scoring-btns">
                    <button className="score-btn btn-need-practice" onClick={() => handleFeedback("failed")}>
                      <span>Need Practice 👎</span>
                    </button>
                    <button className="score-btn btn-nailed" onClick={() => handleFeedback("nailed")}>
                      <span>Nailed It! 👍</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .interview-page {
          max-width: 900px;
          margin: 0 auto;
        }

        .interview-landing {
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
        }

        .landing-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: hsl(var(--primary) / 0.12);
          border: 1px solid hsl(var(--primary) / 0.3);
          border-radius: 9999px;
          color: hsl(var(--primary));
          font-size: 0.8rem;
          font-weight: 700;
        }

        .interview-landing h1 {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .interview-landing p {
          color: hsl(var(--muted-foreground));
          font-size: 1.05rem;
          line-height: 1.6;
          max-width: 650px;
        }

        .setup-category-row {
          width: 100%;
          border-top: 1px solid hsl(var(--card-border) / 0.4);
          padding-top: 2rem;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .setup-category-row h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: hsl(var(--foreground));
        }

        .categories-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          width: 100%;
        }

        .category-setup-card {
          padding: 1.5rem 1.25rem;
          cursor: pointer;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          height: 100%;
        }

        .category-setup-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .category-setup-card p {
          font-size: 0.75rem;
          line-height: 1.4;
          color: hsl(var(--muted-foreground));
        }

        .cat-icon {
          color: hsl(var(--muted-foreground));
        }

        .text-purple { color: #a78bfa; }
        .text-green { color: #34d399; }
        .text-pink { color: #f472b6; }
        .text-gold { color: #f59e0b; }

        .category-setup-card.active-adaptive {
          border-color: #f59e0b / 0.5;
          background: #f59e0b / 0.03;
        }

        .category-setup-card:hover {
          border-color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.05);
        }

        /* Simulator Cockpit styling */
        .interview-cockpit {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .cockpit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cockpit-meta-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .track-badge {
          background: hsl(var(--primary) / 0.15);
          color: hsl(var(--primary));
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .count-badge {
          font-size: 0.8rem;
          color: hsl(var(--muted-foreground));
        }

        .cockpit-meta-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .difficulty-indicator {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .diff-easy { color: #10b981; }
        .diff-medium { color: #f59e0b; }
        .diff-hard { color: #ef4444; }

        .mock-timer {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.6rem;
          background: hsl(var(--secondary));
          border: 1px solid hsl(var(--card-border) / 0.6);
          border-radius: 6px;
          font-size: 0.85rem;
          font-family: var(--font-mono);
          color: hsl(var(--foreground));
        }

        .timer-icon {
          color: hsl(var(--muted-foreground));
        }

        .question-prompt-card {
          padding: 2rem;
          display: flex;
          gap: 1.5rem;
          background: hsl(var(--secondary) / 0.15);
          border-color: hsl(var(--card-border) / 0.6);
          align-items: flex-start;
        }

        .robot-avatar {
          font-size: 2.25rem;
          width: 3.5rem;
          height: 3.5rem;
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.6));
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px hsl(var(--primary) / 0.2);
          flex-shrink: 0;
        }

        .question-content {
          flex: 1;
        }

        .question-content h3 {
          font-size: 0.85rem;
          color: hsl(var(--muted-foreground));
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .typed-question-box {
          font-size: 1.25rem;
          font-weight: 700;
          color: hsl(var(--foreground));
        }

        .cockpit-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .reveal-btn {
          padding: 0.9rem 2.25rem;
          font-size: 1rem;
        }

        .evaluation-panel {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .evaluation-card {
          padding: 1.75rem;
          background: hsl(var(--card) / 0.8);
          border-color: hsl(var(--card-border) / 0.7);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .answer-section h4 {
          font-size: 1rem;
          font-weight: 700;
          color: hsl(var(--primary));
          margin-bottom: 0.5rem;
        }

        .answer-text {
          font-size: 1rem;
          line-height: 1.6;
          color: hsl(var(--foreground) / 0.95);
          white-space: pre-wrap;
        }

        .followup-section {
          background: hsl(var(--background) / 0.4);
          border: 1px solid hsl(var(--card-border) / 0.6);
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .followup-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #f59e0b;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }

        .followup-text {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #ffb83d;
        }

        .scoring-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid hsl(var(--card-border) / 0.4);
        }

        .scoring-row h4 {
          font-size: 1rem;
          font-weight: 700;
        }

        .scoring-btns {
          display: flex;
          gap: 0.75rem;
        }

        .score-btn {
          border: 1px solid hsl(var(--card-border));
          padding: 0.65rem 1.25rem;
          border-radius: 0.5rem;
          font-family: var(--font-sans);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-need-practice {
          background: transparent;
          color: #ef4444;
          border-color: #ef4444 / 0.3;
        }

        .btn-need-practice:hover {
          background: #ef4444 / 0.08;
          border-color: #ef4444;
        }

        .btn-nailed {
          background: #10b981;
          color: white;
          border: none;
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.25);
        }

        .btn-nailed:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(16, 185, 129, 0.4);
        }

        /* Report evaluation board */
        .interview-report {
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .report-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: #10b981 / 0.15;
          border: 1px solid #10b981 / 0.3;
          border-radius: 9999px;
          color: #10b981;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .interview-report h1 {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .interview-report p {
          color: hsl(var(--muted-foreground));
          text-align: center;
          font-size: 1rem;
          max-width: 500px;
        }

        .eval-results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          width: 100%;
          max-width: 600px;
          margin-top: 1rem;
        }

        .eval-card {
          padding: 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          justify-content: center;
        }

        .grade-badge-circle {
          width: 5.5rem;
          height: 5.5rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          font-size: 2.5rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }

        .specs-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .spec-row span {
          color: hsl(var(--muted-foreground));
        }

        .text-easy { color: #10b981; }
        .text-medium { color: #f59e0b; }
        .text-hard { color: #ef4444; }

        .timeline-review {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .timeline-review h3 {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .review-stack {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .review-card {
          padding: 1rem 1.25rem;
        }

        .review-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.4rem;
        }

        .review-num {
          font-weight: 700;
          color: hsl(var(--primary));
          font-size: 0.9rem;
        }

        .review-time {
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
          display: flex;
          align-items: center;
          gap: 0.2rem;
          margin-left: auto;
        }

        .rating-pill {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
        }

        .pill-green {
          background: #10b981 / 0.15;
          color: #10b981;
        }

        .pill-yellow {
          background: #f59e0b / 0.15;
          color: #f59e0b;
        }

        .review-card h4 {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .reset-btn {
          margin-top: 1.5rem;
          padding: 0.75rem 1.75rem;
        }

        .animate-fade {
          animation: evalFade 0.5s ease-out;
        }

        @keyframes evalFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .eval-results-grid {
            grid-template-columns: 1fr;
          }
          .cockpit-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .cockpit-meta-right {
            width: 100%;
            justify-content: space-between;
          }
          .scoring-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .scoring-btns {
            width: 100%;
          }
          .score-btn {
            flex: 1;
            justify-content: center;
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
