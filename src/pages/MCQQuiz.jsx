import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Code, 
  Database, 
  Layers, 
  Sparkles, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  Check, 
  Award,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Brain,
  HelpCircle
} from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';

const CATEGORIES = [
  { id: 'java', name: 'Core Java', desc: 'Concurrency, Memory & Collections Internals', icon: BookOpen, color: 'purple' },
  { id: 'html', name: 'HTML5', desc: 'Semantic SEO, Web Storage & Offline APIs', icon: Brain, color: 'green' },
  { id: 'css', name: 'CSS3 Layouts', desc: 'Flexbox, Grid, Specificity & Animations', icon: Layers, color: 'indigo' },
  { id: 'js', name: 'JavaScript', desc: 'Event Loop, Closures, Scoping & Async Flow', icon: Code, color: 'yellow' },
  { id: 'jdbc', name: 'JDBC & DB', desc: 'Connection Pools, Transactions & PreparedStatements', icon: Database, color: 'pink' }
];

export default function MCQQuiz({ setActiveTab }) {
  const [currentScreen, setCurrentScreen] = useState('lobby'); // 'lobby', 'quiz', 'results'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // Array of selected option indices
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [timeTaken, setTimeTaken] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState({}); // Toggles for questions review list
  const timerRef = useRef(null);

  // Load stats from localStorage for display on lobby
  const [quizStats, setQuizStats] = useState({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const stats = {};
    CATEGORIES.forEach(cat => {
      stats[cat.id] = {
        highScore: parseInt(localStorage.getItem(`wingora_quiz_highscore_${cat.id}`) || '0', 10),
        completed: parseInt(localStorage.getItem(`wingora_quiz_completed_${cat.id}`) || '0', 10)
      };
    });
    setQuizStats(stats);
  };

  // Timer logic
  useEffect(() => {
    if (currentScreen === 'quiz') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishQuiz(true); // Auto-submit when timer hits 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentScreen]);

  const startQuiz = (catId) => {
    const allQs = quizQuestions[catId] || [];
    // Randomize questions order or slice exactly 25
    // Note: The dataset has exactly 25 questions. Let's shuffle them slightly to make it interactive, or keep order.
    // Keeping order or shuffling: shuffling makes it realistic. Let's do a shuffle!
    const shuffled = [...allQs].sort(() => 0.5 - Math.random()).slice(0, 25);
    
    setQuestions(shuffled);
    setSelectedCategory(catId);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(25 * 60); // 25 minutes
    setTimeTaken(0);
    setCurrentScreen('quiz');
  };

  const handleOptionClick = (optionIndex) => {
    if (isChecked) return; // Cannot change selection after checking
    setSelectedOption(optionIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    setIsChecked(true);
    const correctIndex = questions[currentIndex].answer;
    const isCorrect = selectedOption === correctIndex;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Save user answer
    setUserAnswers(prev => {
      const updated = [...prev];
      updated[currentIndex] = selectedOption;
      return updated;
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      finishQuiz(false);
    }
  };

  const finishQuiz = (isTimeout = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const elapsed = 25 * 60 - timeLeft;
    setTimeTaken(elapsed);

    // Calculate final score
    let finalScore = score;
    if (isTimeout) {
      // For any unanswered questions, mark as unselected (-1)
      setUserAnswers(prev => {
        const updated = [...prev];
        for (let i = prev.length; i < questions.length; i++) {
          updated[i] = -1;
        }
        return updated;
      });
    }

    // Save highscore
    const previousHigh = parseInt(localStorage.getItem(`wingora_quiz_highscore_${selectedCategory}`) || '0', 10);
    if (finalScore > previousHigh) {
      localStorage.setItem(`wingora_quiz_highscore_${selectedCategory}`, finalScore.toString());
    }
    
    // Increment completed count
    const prevCompleted = parseInt(localStorage.getItem(`wingora_quiz_completed_${selectedCategory}`) || '0', 10);
    localStorage.setItem(`wingora_quiz_completed_${selectedCategory}`, (prevCompleted + 1).toString());

    // Update global quizzes completed count
    const globalCount = parseInt(localStorage.getItem('wingora_quizzes_total_completed') || '0', 10);
    localStorage.setItem('wingora_quizzes_total_completed', (globalCount + 1).toString());

    loadStats();
    setCurrentScreen('results');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleReviewExpand = (index) => {
    setExpandedReviews(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getEvaluationRating = (scoreValue) => {
    if (scoreValue >= 23) return { title: 'Principal Engineer Grade', desc: 'Ready for any top-tier system design or developer interview! 🏆', color: 'text-green' };
    if (scoreValue >= 18) return { title: 'Senior Developer Grade', desc: 'Excellent score. Ready for realistic project challenges and developer tasks. 🚀', color: 'text-indigo' };
    if (scoreValue >= 12) return { title: 'Associate Developer Grade', desc: 'Good foundation. Review the incorrect answers to polish corner cases. ⚡', color: 'text-yellow' };
    return { title: 'Junior Developer / Review Needed', desc: 'Brush up on theory and coding structures. Review details below and try again! 📚', color: 'text-red' };
  };

  return (
    <div className="mcq-quiz-container">
      {/* Screen 1: Lobby */}
      {currentScreen === 'lobby' && (
        <motion.div 
          className="lobby-view"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <div className="lobby-header">
            <div>
              <span className="badge badge-easy font-semibold mb-2">Practice Mode</span>
              <h1>MCQ Technical Quiz Challenges</h1>
              <p className="text-muted-foreground text-lg">
                Test your knowledge with 25 highly specialized questions per category designed to mimic real-world interview loops and production scenarios.
              </p>
            </div>
            <button className="btn-secondary" onClick={() => setActiveTab('dashboard')}>
              <LayoutDashboard size={18} />
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div className="categories-grid mt-8">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const stats = quizStats[cat.id] || { highScore: 0, completed: 0 };
              const colorClass = `bg-${cat.color}`;
              return (
                <div key={cat.id} className="category-card glass-panel flex flex-col justify-between">
                  <div>
                    <div className={`cat-icon-box ${colorClass}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="cat-title mt-4 text-xl font-bold">{cat.name}</h3>
                    <p className="cat-desc text-muted-foreground mt-2 text-sm">{cat.desc}</p>
                    
                    <div className="cat-meta-stats mt-6 pt-4 border-t border-[hsl(var(--card-border)/0.3)]">
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">High Score:</span>
                        <span className="font-semibold">{stats.highScore ? `${stats.highScore} / 25` : 'Not attempted'}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-2">
                        <span className="text-muted-foreground">Completed:</span>
                        <span className="font-semibold">{stats.completed} {stats.completed === 1 ? 'time' : 'times'}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => startQuiz(cat.id)}
                    className="btn-primary w-full mt-6 justify-center"
                  >
                    <span>Start Challenge</span>
                    <Sparkles size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Screen 2: Active Quiz */}
      {currentScreen === 'quiz' && questions.length > 0 && (
        <motion.div 
          className="quiz-view max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Quiz Header */}
          <div className="quiz-header-bar flex items-center justify-between mb-6">
            <button className="back-lobby-btn" onClick={() => setCurrentScreen('lobby')}>
              <ArrowLeft size={16} />
              <span>Quit Quiz</span>
            </button>
            <div className="timer-wrapper glass-panel py-1 px-3 flex items-center gap-2">
              <Timer size={16} className={timeLeft < 60 ? 'text-red animate-pulse' : 'text-primary'} />
              <span className={`font-mono font-bold ${timeLeft < 60 ? 'text-red' : ''}`}>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="progress-section mb-6">
            <div className="flex justify-between text-sm mb-2 text-muted-foreground">
              <span>Category: <strong>{CATEGORIES.find(c => c.id === selectedCategory)?.name}</strong></span>
              <span>Question <strong>{currentIndex + 1}</strong> of <strong>{questions.length}</strong></span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill fill-purple" 
                style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Main Question Card */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="question-card glass-panel p-6 mb-6"
            >
              {/* Question Difficulty */}
              <div className="flex justify-between items-center mb-4">
                <span className={`badge badge-${questions[currentIndex].difficulty}`}>
                  {questions[currentIndex].difficulty}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <HelpCircle size={14} />
                  {questions[currentIndex].type === 'practical' ? 'Practical Scenario' : 'Theory Core'}
                </span>
              </div>

              {/* Question Text */}
              <h2 className="question-text text-xl font-semibold mb-6">
                {questions[currentIndex].question}
              </h2>

              {/* Code Snippet Block if practical */}
              {questions[currentIndex].code && (
                <div className="code-editor-container mb-6">
                  <div className="code-editor-header">
                    <div className="editor-dots">
                      <div className="editor-dot editor-dot-red"></div>
                      <div className="editor-dot editor-dot-yellow"></div>
                      <div className="editor-dot editor-dot-green"></div>
                    </div>
                    <div className="editor-tab">
                      {selectedCategory === 'java' ? 'Snippet.java' : selectedCategory === 'js' ? 'script.js' : selectedCategory === 'jdbc' ? 'Database.java' : 'index.html'}
                    </div>
                  </div>
                  <div className="code-editor-body">
                    <pre className="font-mono text-sm leading-relaxed" style={{ color: '#e6edf3' }}>
                      <code>{questions[currentIndex].code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Options List */}
              <div className="options-list flex flex-col gap-3">
                {questions[currentIndex].options.map((option, idx) => {
                  let optionClass = '';
                  let Icon = null;
                  
                  if (isChecked) {
                    const isCorrectOption = idx === questions[currentIndex].answer;
                    const isSelectedOption = idx === selectedOption;
                    
                    if (isCorrectOption) {
                      optionClass = 'option-correct';
                      Icon = CheckCircle2;
                    } else if (isSelectedOption) {
                      optionClass = 'option-wrong';
                      Icon = XCircle;
                    } else {
                      optionClass = 'option-disabled';
                    }
                  } else if (idx === selectedOption) {
                    optionClass = 'option-selected';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      disabled={isChecked}
                      className={`option-btn ${optionClass} transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="option-label-badge">{String.fromCharCode(65 + idx)}</span>
                        <span className="option-text text-left">{option}</span>
                      </div>
                      {Icon && <Icon className="option-status-icon" size={20} />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Expand Panel */}
              {isChecked && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="explanation-box mt-6 p-4 rounded-xl border border-primary/20 bg-primary/5"
                >
                  <div className="flex items-center gap-2 mb-2 text-primary font-bold text-sm">
                    <Sparkles size={16} />
                    <span>Interview & Production Insight</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {questions[currentIndex].explanation}
                  </p>
                </motion.div>
              )}

              {/* Action Button footer */}
              <div className="mt-8 pt-6 border-t border-[hsl(var(--card-border)/0.4)] flex justify-end">
                {!isChecked ? (
                  <button 
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="btn-primary px-8"
                  >
                    <span>Check Answer</span>
                    <Check size={16} />
                  </button>
                ) : (
                  <button 
                    onClick={handleNextQuestion}
                    className="btn-primary px-8"
                  >
                    <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                  </button>
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* Screen 3: Results */}
      {currentScreen === 'results' && (
        <motion.div 
          className="results-view max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="results-card glass-panel p-8 text-center mb-6">
            <div className="flex justify-center mb-6">
              <div className="score-ring-wrapper relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="hsl(var(--card-border) / 0.5)"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="hsl(var(--primary))"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 54}
                    initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - score / questions.length) }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-extrabold">{score}</span>
                  <span className="text-muted-foreground text-sm">/ {questions.length}</span>
                </div>
              </div>
            </div>

            <Award size={48} className="mx-auto text-yellow mb-2" />
            <h2 className="text-2xl font-bold mt-1">Quiz Completed Successfully!</h2>
            
            <div className="evaluation-box mt-4 max-w-md mx-auto">
              <h3 className={`text-lg font-bold ${getEvaluationRating(score).color}`}>
                {getEvaluationRating(score).title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {getEvaluationRating(score).desc}
              </p>
            </div>

            <div className="flex justify-center gap-6 mt-8 py-4 px-6 bg-[hsl(var(--secondary)/0.3)] rounded-xl border border-[hsl(var(--card-border)/0.4)] max-w-lg mx-auto">
              <div className="text-center">
                <span className="block text-xl font-bold text-green">{score}</span>
                <span className="text-xs text-muted-foreground">Correct</span>
              </div>
              <div className="border-r border-[hsl(var(--card-border)/0.5)]"></div>
              <div className="text-center">
                <span className="block text-xl font-bold text-red">{questions.length - score}</span>
                <span className="text-xs text-muted-foreground">Incorrect</span>
              </div>
              <div className="border-r border-[hsl(var(--card-border)/0.5)]"></div>
              <div className="text-center">
                <span className="block text-xl font-bold text-indigo">{formatTime(timeTaken)}</span>
                <span className="text-xs text-muted-foreground">Time Spent</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8 flex-wrap">
              <button onClick={() => startQuiz(selectedCategory)} className="btn-primary">
                <RotateCcw size={16} />
                <span>Retry Quiz</span>
              </button>
              <button onClick={() => setCurrentScreen('lobby')} className="btn-secondary">
                <span>Select Another Subject</span>
              </button>
              <button onClick={() => setActiveTab('dashboard')} className="btn-secondary">
                <LayoutDashboard size={16} />
                <span>Exit to Dashboard</span>
              </button>
            </div>
          </div>

          {/* Section: Revision Panel */}
          <div className="revision-panel mt-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Brain size={20} className="text-primary" />
              <span>Review Detailed Explanations</span>
            </h2>

            <div className="flex flex-col gap-4">
              {questions.map((q, idx) => {
                const userAnswer = userAnswers[idx];
                const isCorrect = userAnswer === q.answer;
                const isExpanded = expandedReviews[idx];

                return (
                  <div 
                    key={idx} 
                    className={`revision-item glass-panel border ${isCorrect ? 'border-green/20' : 'border-red/20'}`}
                  >
                    <div 
                      className="revision-item-header p-4 flex items-center justify-between cursor-pointer"
                      onClick={() => toggleReviewExpand(idx)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-full ${isCorrect ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
                          {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        </div>
                        <span className="font-semibold text-sm text-left">
                          Q{idx + 1}: {q.question.length > 80 ? q.question.substring(0, 80) + '...' : q.question}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-xs font-mono">
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="revision-item-body p-4 border-t border-[hsl(var(--card-border)/0.3)] bg-[hsl(var(--card)/0.2)]"
                        >
                          <p className="text-sm font-semibold mb-3">{q.question}</p>

                          {q.code && (
                            <pre className="font-mono text-xs p-3 rounded bg-[#0d1117] overflow-x-auto mb-3" style={{ color: '#a5d6ff' }}>
                              <code>{q.code}</code>
                            </pre>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            {q.options.map((opt, oIdx) => {
                              let optionClass = 'bg-[hsl(var(--secondary)/0.3)] text-muted-foreground border border-transparent';
                              if (oIdx === q.answer) {
                                optionClass = 'bg-green/15 text-green border border-green/30';
                              } else if (oIdx === userAnswer && !isCorrect) {
                                optionClass = 'bg-red/15 text-red border border-red/30';
                              }
                              return (
                                <div key={oIdx} className={`p-2.5 rounded text-xs ${optionClass}`}>
                                  <strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                                </div>
                              );
                            })}
                          </div>

                          <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 text-xs text-foreground/90 leading-relaxed">
                            <strong className="block text-primary mb-1 flex items-center gap-1">
                              <Sparkles size={12} />
                              <span>Insight & Explanation</span>
                            </strong>
                            {q.explanation}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Styled inline components styles */}
      <style>{`
        .mcq-quiz-container {
          padding: 1rem 0;
          color: hsl(var(--foreground));
        }
        
        .lobby-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .lobby-header h1 {
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--foreground) / 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .category-card {
          padding: 2rem;
          border-radius: var(--radius);
          height: 100%;
        }

        .cat-icon-box {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .bg-purple { background: linear-gradient(135deg, #a78bfa, #7c3aed); }
        .bg-green { background: linear-gradient(135deg, #34d399, #059669); }
        .bg-indigo { background: linear-gradient(135deg, #818cf8, #4f46e5); }
        .bg-yellow { background: linear-gradient(135deg, #fbbf24, #d97706); }
        .bg-pink { background: linear-gradient(135deg, #f472b6, #db2777); }

        .back-lobby-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          font-family: var(--font-sans);
          font-weight: 500;
          transition: var(--transition);
        }

        .back-lobby-btn:hover {
          color: hsl(var(--foreground));
        }

        .text-red {
          color: #ef4444 !important;
        }

        .option-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.25rem;
          background: hsl(var(--secondary) / 0.25);
          border: 1px solid hsl(var(--card-border) / 0.5);
          border-radius: 0.75rem;
          color: hsl(var(--foreground));
          font-family: var(--font-sans);
          font-size: 0.95rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .option-btn:hover:not(:disabled) {
          background: hsl(var(--secondary) / 0.6);
          border-color: hsl(var(--primary) / 0.4);
          transform: translateX(3px);
          box-shadow: 0 4px 12px hsl(var(--primary) / 0.05);
        }

        .option-selected {
          border-color: hsl(var(--primary)) !important;
          background: hsl(var(--primary) / 0.08) !important;
          box-shadow: 0 0 15px hsl(var(--primary) / 0.15) !important;
        }

        .option-correct {
          border-color: #10b981 !important;
          background: rgba(16, 185, 129, 0.1) !important;
          color: #10b981 !important;
        }

        .option-wrong {
          border-color: #ef4444 !important;
          background: rgba(239, 68, 68, 0.1) !important;
          color: #ef4444 !important;
        }

        .option-disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .option-label-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.75rem;
          height: 1.75rem;
          background: hsl(var(--secondary));
          border-radius: 0.35rem;
          font-weight: 700;
          font-size: 0.85rem;
          color: hsl(var(--muted-foreground));
          transition: var(--transition);
        }

        .option-selected .option-label-badge {
          background: hsl(var(--primary));
          color: white;
        }

        .option-correct .option-label-badge {
          background: #10b981;
          color: white;
        }

        .option-wrong .option-label-badge {
          background: #ef4444;
          color: white;
        }

        .option-status-icon {
          flex-shrink: 0;
        }

        .text-green { color: #10b981; }
        .text-indigo { color: #818cf8; }
        .text-yellow { color: #fbbf24; }
        .text-red { color: #ef4444; }

        .score-ring-wrapper svg {
          transform: rotate(-90deg);
        }

        .revision-item {
          border-radius: 0.75rem;
          overflow: hidden;
          transition: var(--transition);
        }

        .revision-item-header {
          transition: var(--transition);
        }

        .revision-item-header:hover {
          background: hsl(var(--secondary) / 0.3);
        }

        .flex-wrap {
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
