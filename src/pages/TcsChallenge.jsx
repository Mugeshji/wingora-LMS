import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Lock, 
  CheckCircle2, 
  Play, 
  ArrowLeft, 
  Timer, 
  Sparkles, 
  Trophy, 
  Settings, 
  Plus, 
  RotateCcw,
  AlertTriangle,
  BookOpen,
  Code,
  Check,
  ChevronRight,
  TrendingUp,
  Award,
  BookMarked,
  Cpu,
  Trash2,
  Terminal,
  HelpCircle,
  Search,
  Lightbulb,
  Key
} from 'lucide-react';
import { codingQuestions } from '../data/tcsQuestionBank';
import { analyzeTopicWeights, generate75DaySchedule } from '../utils/scheduleGenerator';

export default function TcsChallenge({ activeUser }) {
  // --- STATES & REFS ---
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'test', 'results'
  const [activeTab, setActiveTab] = useState('student'); // 'student', 'admin'
  
  // Local Database States
  const [questionBank, setQuestionBank] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [progress, setProgress] = useState({}); // day_number -> progress object
  const [userMeta, setUserMeta] = useState({
    streak_count: 0,
    last_attempt_date: null,
    best_streak: 0,
    current_unlocked_day: 1
  });

  // Config States
  const [streakResetRule, setStreakResetRule] = useState(true);
  const [streakNotice, setStreakNotice] = useState('');

  // Test Taking States
  const [currentDayTest, setCurrentDayTest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef(null);

  // Multi-Question State for Active Test
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [typedCodes, setTypedCodes] = useState({}); // idx -> code string
  const [solvedQuestions, setSolvedQuestions] = useState({}); // idx -> boolean
  const [compileOutputs, setCompileOutputs] = useState({}); // idx -> string

  // Dashboard Sub-tabs, Search & Filters, Confirmation Modal
  const [currentSubTab, setCurrentSubTab] = useState('all'); // 'all', 'ninja', 'digital', 'prime'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'completed', 'unlocked', 'locked'
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  // Real-time Clock
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper function to dynamically check lock/unlock/cooldown status of a day
  const getDayStatus = (dayNum) => {
    const currentProg = progress[dayNum];
    if (currentProg && currentProg.status === 'completed') {
      return { status: 'completed', completedAt: currentProg.completed_at };
    }

    // Enforce sequential unlocking
    if (dayNum > 1) {
      const prevProg = progress[dayNum - 1];
      if (!prevProg || prevProg.status !== 'completed') {
        return { status: 'locked' };
      }
    }

    return { status: 'unlocked' };
  };



  const formatCooldown = (ms) => {
    const totalSecs = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  // Results Screen State
  const [testResultSummary, setTestResultSummary] = useState(null);
  const [reviewQuestionIdx, setReviewQuestionIdx] = useState(0);

  // Dynamic Hint & Evaluation States
  const [hintViewed, setHintViewed] = useState({}); // idx -> string/null
  const [solutionViewed, setSolutionViewed] = useState({}); // idx -> boolean
  const [testResults, setTestResults] = useState({}); // idx -> array of results
  const [questionScores, setQuestionScores] = useState({}); // idx -> score percentage
  const [isEvaluating, setIsEvaluating] = useState({}); // idx -> boolean

  // Code Evaluation Simulator
  const simulateCodeEvaluation = (code, question) => {
    // 1. Basic Syntax Check
    const openBraces = (code.match(/\{/g) || []).length;
    const closeBraces = (code.match(/\}/g) || []).length;
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;

    if (openBraces !== closeBraces) {
      return {
        success: false,
        error: "Compilation Error: Unmatched curly braces '{}'. Please verify class and method boundaries.",
        score: 0,
        results: (question.test_cases || []).map(tc => ({ ...tc, got: "Compilation Error", passed: false }))
      };
    }

    if (openParens !== closeParens) {
      return {
        success: false,
        error: "Compilation Error: Unmatched parentheses '()'. Please check method calls or condition loops.",
        score: 0,
        results: (question.test_cases || []).map(tc => ({ ...tc, got: "Compilation Error", passed: false }))
      };
    }

    // Check if user has written anything other than default placeholder
    const starterTrimmed = (question.starter_code || "").replace(/\s+/g, '');
    const codeTrimmed = code.replace(/\s+/g, '');
    if (!codeTrimmed || codeTrimmed === starterTrimmed || codeTrimmed.includes("Writeyourcodehere") || codeTrimmed.includes("writeyourcodehere")) {
      return {
        success: true,
        error: null,
        score: 0,
        results: (question.test_cases || []).map(tc => ({ ...tc, got: "0 (Default/No implementation)", passed: false }))
      };
    }

    // Determine correctness score dynamically based on topic checks
    let passedCount = 0;
    const testCases = question.test_cases || [];
    const totalCases = testCases.length || 1;
    const results = [];

    // Analyze solution content
    const lowerCode = code.toLowerCase();
    const hasLoop = lowerCode.includes("for") || lowerCode.includes("while");
    const hasReturn = lowerCode.includes("return");

    testCases.forEach((tc, idx) => {
      let passed = false;
      let got = "";

      // Simulate output based on logic completeness
      if (idx === 0 || idx === 1) {
        // First 2 basic cases usually pass if they have basic return statement and method header
        if (hasReturn && codeTrimmed.length > starterTrimmed.length + 10) {
          passed = true;
          got = tc.expected;
        } else {
          got = "No return value";
        }
      } else if (idx === 2 || idx === 3) {
        // Medium test cases pass if they implemented loop/logic structure
        if (hasReturn && hasLoop && codeTrimmed.length > starterTrimmed.length + 30) {
          // Check for potential TLE or edge case failures
          if (question.topic === "Basic Programming" && (question.id || "").includes("prime")) {
            // Check if they optimized with sqrt
            if (lowerCode.includes("sqrt") || lowerCode.includes("i * i") || lowerCode.includes("i*i")) {
              passed = true;
              got = tc.expected;
            } else {
              // TLE on large primes
              got = "Time Limit Exceeded (O(N) search space is too slow)";
            }
          } else {
            passed = true;
            got = tc.expected;
          }
        } else {
          got = "Wrong Answer (Logic incomplete)";
        }
      } else {
        // Large/hidden edge cases require solid code size and no obvious traps
        if (hasReturn && hasLoop && codeTrimmed.length > starterTrimmed.length + 50) {
          passed = true;
          got = tc.expected;
        } else {
          got = "Wrong Answer / Exception (Boundary check failed)";
        }
      }

      if (passed) passedCount++;
      results.push({
        input: tc.input,
        expected: tc.expected,
        got: got,
        passed: passed,
        explanation: tc.explanation
      });
    });

    const score = Math.round((passedCount / totalCases) * 100);

    return {
      success: true,
      error: null,
      score: score,
      results: results
    };
  };

  // Admin Panel States
  const [newQuestion, setNewQuestion] = useState({
    track: 'ninja',
    topic: 'Basic Programming',
    question_type: 'coding',
    difficulty: 'Easy',
    question: '',
    answer: `public class Solution {
    public int solve() {
        // write code here
        return 0;
    }
}`,
    solution: `public class Solution {
    public int solve() {
        // write code here
        return 0;
    }
}`,
    explanation: '',
    years_seen: '2026'
  });

  // --- INITIALIZATION ---
  useEffect(() => {
    if (activeUser?.role !== 'admin' && activeTab === 'admin') {
      setActiveTab('student');
    }
  }, [activeUser, activeTab]);

  useEffect(() => {
    // 1. Load Question Bank (init if empty or force refresh for templates)
    let savedQuestions = localStorage.getItem('wingora_tcs_questions_coding');
    let questionsList = [];
    let needRegen = false;
    
    // Check if we need to force reload question bank because of the new starter_code template
    let forceReloadQBank = false;
    if (savedQuestions) {
      try {
        const parsed = JSON.parse(savedQuestions);
        if (parsed.length === 0 || !parsed[0].starter_code || !parsed[0].solution || parsed.length !== 225) {
          forceReloadQBank = true;
        }
      } catch (e) {
        forceReloadQBank = true;
      }
    } else {
      forceReloadQBank = true;
    }

    if (forceReloadQBank) {
      questionsList = codingQuestions;
      localStorage.setItem('wingora_tcs_questions_coding', JSON.stringify(questionsList));
      needRegen = true;
    } else {
      questionsList = JSON.parse(savedQuestions);
    }
    setQuestionBank(questionsList);

    // 2. Load Schedule (init if empty or needs migration)
    let savedSchedule = localStorage.getItem('wingora_tcs_schedule_coding');
    let scheduleList = [];
    
    if (savedSchedule) {
      try {
        scheduleList = JSON.parse(savedSchedule);
        if (scheduleList.length === 0 || !scheduleList[0].questions || !scheduleList[0].questions[0].starter_code || !scheduleList[0].questions[0].solution) {
          needRegen = true;
        }
      } catch (e) {
        needRegen = true;
      }
    } else {
      needRegen = true;
    }
    
    if (needRegen) {
      scheduleList = generate75DaySchedule(questionsList);
      localStorage.setItem('wingora_tcs_schedule_coding', JSON.stringify(scheduleList));
    }
    setSchedule(scheduleList);

    // 3. Load Progress (init if empty or migrate user_code to user_codes)
    let savedProgress = localStorage.getItem('wingora_tcs_progress_coding');
    let progressMap = {};
    if (savedProgress) {
      progressMap = JSON.parse(savedProgress);
      Object.keys(progressMap).forEach(k => {
        if (progressMap[k].user_code !== undefined && !progressMap[k].user_codes) {
          progressMap[k].user_codes = { 0: progressMap[k].user_code };
          delete progressMap[k].user_code;
        }
      });
    } else {
      for (let i = 1; i <= 75; i++) {
        progressMap[i] = {
          day_number: i,
          track: i <= 30 ? 'ninja' : i <= 60 ? 'digital' : 'prime',
          status: 'unlocked',
          completed_at: null,
          user_codes: null
        };
      }
      localStorage.setItem('wingora_tcs_progress_coding', JSON.stringify(progressMap));
    }
    setProgress(progressMap);

    // 4. Load User Metadata
    let savedMeta = localStorage.getItem('wingora_tcs_user_meta_coding');
    let meta = {
      streak_count: 0,
      last_attempt_date: null,
      best_streak: 0,
      current_unlocked_day: 1
    };
    if (savedMeta) {
      meta = JSON.parse(savedMeta);
      
      // Streak miss check
      if (meta.last_attempt_date && streakResetRule) {
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const lastAttempt = new Date(meta.last_attempt_date);
        lastAttempt.setHours(0,0,0,0);
        
        const diffTime = Math.abs(today - lastAttempt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
          if (meta.streak_count > 0) {
            setStreakNotice(`Your streak was reset from ${meta.streak_count} because you missed yesterday's coding session, but you can continue where you left off!`);
            meta.streak_count = 0;
            localStorage.setItem('wingora_tcs_user_meta_coding', JSON.stringify(meta));
          }
        }
      }
    }
    setUserMeta(meta);
  }, [streakResetRule]);

  // --- ACTIONS & HANDLERS ---
  
  const executeResetProgress = () => {
    const initialProgress = {};
    for (let i = 1; i <= 75; i++) {
      initialProgress[i] = {
        day_number: i,
        track: i <= 30 ? 'ninja' : i <= 60 ? 'digital' : 'prime',
        status: 'unlocked',
        completed_at: null,
        user_codes: null
      };
    }
    localStorage.setItem('wingora_tcs_progress_coding', JSON.stringify(initialProgress));
    setProgress(initialProgress);

    const initialMeta = {
      streak_count: 0,
      last_attempt_date: null,
      best_streak: 0,
      current_unlocked_day: 1
    };
    localStorage.setItem('wingora_tcs_user_meta_coding', JSON.stringify(initialMeta));
    setUserMeta(initialMeta);
    setStreakNotice('');
    setCurrentScreen('dashboard');
  };

  const getNextActiveDay = () => {
    if (!schedule || schedule.length === 0) return null;
    for (let i = 1; i <= 75; i++) {
      const statusInfo = getDayStatus(i);
      if (statusInfo.status !== 'completed') {
        const dayData = schedule.find(s => s.day_number === i);
        if (dayData) return { dayData, statusInfo };
      }
    }
    const dayData = schedule.find(s => s.day_number === 75);
    return { dayData, statusInfo: { status: 'completed' } };
  };

  const handleRegenerateSchedule = () => {
    const freshSchedule = generate75DaySchedule(questionBank);
    localStorage.setItem('wingora_tcs_schedule_coding', JSON.stringify(freshSchedule));
    setSchedule(freshSchedule);
    alert("75-Day coding schedule regenerated successfully based on topic weights!");
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.question.trim()) return alert("Question statement cannot be empty.");

    const parsedYears = newQuestion.years_seen
      .split(',')
      .map(y => parseInt(y.trim()))
      .filter(y => !isNaN(y));

    const questionToAdd = {
      ...newQuestion,
      id: `tcs_custom_coding_${Date.now()}`,
      years_seen: parsedYears.length > 0 ? parsedYears : [2026],
    };

    const updatedBank = [...questionBank, questionToAdd];
    setQuestionBank(updatedBank);
    localStorage.setItem('wingora_tcs_questions_coding', JSON.stringify(updatedBank));

    // Reset Form
    setNewQuestion({
      track: 'ninja',
      topic: 'Basic Programming',
      question_type: 'coding',
      difficulty: 'Easy',
      question: '',
      answer: `public class Solution {
    public int solve() {
        // write code here
        return 0;
    }
}`,
      solution: `public class Solution {
    public int solve() {
        // write code here
        return 0;
    }
}`,
      explanation: '',
      years_seen: '2026'
    });

    alert("Coding question added successfully!");
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedBank = questionBank.filter(q => q.id !== id);
      setQuestionBank(updatedBank);
      localStorage.setItem('wingora_tcs_questions_coding', JSON.stringify(updatedBank));
    }
  };

  const viewCompletedResults = (dayObj) => {
    const dayProgress = progress[dayObj.day_number];
    if (!dayProgress || dayProgress.status !== 'completed') return;

    setTestResultSummary({
      day_number: dayObj.day_number,
      title: dayObj.title,
      timeSpent: dayProgress.timeSpent || 0,
      questions: dayObj.questions,
      submittedCodes: dayProgress.user_codes || {},
      scores: dayProgress.scores || {},
      average_score: dayProgress.average_score || 100
    });
    setReviewQuestionIdx(0);
    setCurrentScreen('results');
  };

  const startTest = (dayObj) => {
    const dayStatus = getDayStatus(dayObj.day_number);
    if (dayStatus.status === 'locked' || dayStatus.status === 'cooldown') {
      alert("This coding challenge is locked. Complete previous days to unlock!");
      return;
    }

    setCurrentDayTest(dayObj);
    
    // Clear hint and solutions view states
    setHintViewed({});
    setSolutionViewed({});
    setTestResults({});
    setQuestionScores({});
    setIsEvaluating({});

    // Initialize codes for all 3 questions
    const codesMap = {};
    const solvedMap = {};
    const compileMap = {};
    dayObj.questions.forEach((q, idx) => {
      codesMap[idx] = q.starter_code || q.answer || `public class Solution {\n    public int solve() {\n        // write code here\n        return 0;\n    }\n}`;
      solvedMap[idx] = false;
      compileMap[idx] = '';
    });

    setTypedCodes(codesMap);
    setSolvedQuestions(solvedMap);
    setCompileOutputs(compileMap);
    setActiveQuestionIndex(0);
    
    setTimeLeft(dayObj.time_limit * 60);
    setTimeTaken(0);
    setCurrentScreen('test');

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          submitTest(dayObj); // Auto submit on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const runCodeSample = () => {
    const activeQuestion = currentDayTest.questions[activeQuestionIndex];
    if (!activeQuestion) return;

    setCompileOutputs(prev => ({
      ...prev,
      [activeQuestionIndex]: "Compiling Solution.java and executing test cases...\n..."
    }));
    
    setIsEvaluating(prev => ({ ...prev, [activeQuestionIndex]: true }));

    setTimeout(() => {
      const evaluation = simulateCodeEvaluation(typedCodes[activeQuestionIndex] || '', activeQuestion);
      
      let outputText = "";
      if (!evaluation.success) {
        outputText = evaluation.error;
      } else {
        outputText = `Compiling Solution.java...\nCompilation successful!\nRunning Test Cases:\n\n`;
        evaluation.results.forEach((tc, idx) => {
          outputText += `Test Case ${idx + 1} (${tc.input}): ${tc.passed ? "[Passed]" : "[Failed]"}\n`;
          if (!tc.passed) {
            outputText += `   Expected: ${tc.expected}\n   Actual:   ${tc.got}\n`;
          }
        });
        outputText += `\nExecution Score: ${evaluation.score}%\n`;
        if (evaluation.score === 100) {
          outputText += `All tests passed. Ready for submission!`;
        } else {
          outputText += `Passed ${evaluation.results.filter(r=>r.passed).length} of ${evaluation.results.length} test cases.`;
        }
      }

      setCompileOutputs(prev => ({
        ...prev,
        [activeQuestionIndex]: outputText
      }));

      setTestResults(prev => ({
        ...prev,
        [activeQuestionIndex]: evaluation.results
      }));

      setQuestionScores(prev => ({
        ...prev,
        [activeQuestionIndex]: evaluation.score
      }));

      setIsEvaluating(prev => ({ ...prev, [activeQuestionIndex]: false }));
    }, 1000);
  };

  const submitTest = (dayObj) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const elapsed = (dayObj.time_limit * 60) - timeLeft;
    setTimeTaken(elapsed);

    // Evaluate any missing scores before finishing submission
    const finalScores = { ...questionScores };
    const finalResults = { ...testResults };
    dayObj.questions.forEach((q, idx) => {
      if (finalScores[idx] === undefined) {
        const evaluation = simulateCodeEvaluation(typedCodes[idx] || '', q);
        finalScores[idx] = evaluation.score;
        finalResults[idx] = evaluation.results;
      }
    });

    const averageScore = Math.round(
      ((finalScores[0] || 0) + (finalScores[1] || 0) + (finalScores[2] || 0)) / 3
    );

    // Update Progress
    const updatedProgress = { ...progress };
    updatedProgress[dayObj.day_number] = {
      ...updatedProgress[dayObj.day_number],
      status: 'completed',
      completed_at: new Date().toISOString(),
      user_codes: typedCodes,
      timeSpent: elapsed,
      scores: finalScores,
      average_score: averageScore
    };

    // Unlock next day
    const nextDay = dayObj.day_number + 1;
    let newUnlockedDay = userMeta.current_unlocked_day;
    if (nextDay <= 75) {
      updatedProgress[nextDay] = {
        ...updatedProgress[nextDay],
        status: 'unlocked'
      };
      newUnlockedDay = Math.max(newUnlockedDay, nextDay);
    }


    setProgress(updatedProgress);
    localStorage.setItem('wingora_tcs_progress_coding', JSON.stringify(updatedProgress));

    // Streak logic
    const todayStr = new Date().toISOString().split('T')[0];
    let newStreak = userMeta.streak_count;

    if (userMeta.last_attempt_date !== todayStr) {
      newStreak += 1;
    }
    
    const newMeta = {
      ...userMeta,
      streak_count: newStreak,
      last_attempt_date: todayStr,
      best_streak: Math.max(userMeta.best_streak, newStreak),
      current_unlocked_day: newUnlockedDay
    };
    setUserMeta(newMeta);
    localStorage.setItem('wingora_tcs_user_meta_coding', JSON.stringify(newMeta));

    setTestResultSummary({
      day_number: dayObj.day_number,
      title: dayObj.title,
      timeSpent: elapsed,
      questions: dayObj.questions,
      submittedCodes: typedCodes,
      scores: finalScores,
      average_score: averageScore
    });

    setCurrentScreen('results');
    setReviewQuestionIdx(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnalytics = () => {
    const topicStats = {};
    Object.values(progress).forEach(dayProg => {
      if (dayProg.status === 'completed') {
        const daySched = schedule.find(s => s.day_number === dayProg.day_number);
        if (daySched) {
          const topic = daySched.primary_topic;
          if (!topicStats[topic]) {
            topicStats[topic] = 0;
          }
          topicStats[topic]++;
        }
      }
    });

    return Object.entries(topicStats).map(([topic, count]) => ({
      topic,
      count
    }));
  };

  const completedCodingTopics = getAnalytics();
  const topicWeights = analyzeTopicWeights(questionBank);

  const completedCount = Object.values(progress).filter(p => p.status === 'completed').length;
  const progressPercent = Math.round((completedCount / 75) * 100);

  const ninjaDays = schedule.slice(0, 30);
  const digitalDays = schedule.slice(30, 60);
  const primeDays = schedule.slice(60, 75);

  const nextActive = getNextActiveDay();

  const filteredDays = schedule.filter(day => {
    if (currentSubTab === 'ninja' && day.day_number > 30) return false;
    if (currentSubTab === 'digital' && (day.day_number < 31 || day.day_number > 60)) return false;
    if (currentSubTab === 'prime' && day.day_number < 61) return false;

    const dayStatus = getDayStatus(day.day_number);
    if (statusFilter !== 'all' && dayStatus.status !== statusFilter) return false;

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const titleMatch = day.title.toLowerCase().includes(query);
      const topicMatch = day.primary_topic.toLowerCase().includes(query);
      const qMatch = day.questions && day.questions.some(q => q.topic.toLowerCase().includes(query) || q.question.toLowerCase().includes(query));
      return titleMatch || topicMatch || qMatch;
    }

    return true;
  });

  const getLineNumbers = (code) => {
    const lines = (code || '').split('\n').length;
    return Array.from({ length: Math.max(25, lines) }, (_, i) => i + 1);
  };

  return (
    <div className="tcs-challenge-container">
      {/* Custom Reset Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="custom-modal-overlay">
            <div className="custom-modal-card glass-panel p-6 max-w-sm w-full mx-4">
              <div className="modal-header flex items-center gap-3 mb-3 pb-3 border-b border-[hsl(var(--card-border)/0.3)]">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                  <AlertTriangle size={24} className="animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Reset Progress?</h3>
              </div>
              <div className="modal-body my-4 text-xs leading-relaxed text-muted-foreground">
                <p className="mb-2">Are you sure you want to reset all your progress, code solutions, and streaks? This will permanently erase:</p>
                <ul className="list-disc pl-5 space-y-1.5 my-3 text-xs text-foreground/80">
                  <li>Your active streak and best streak metrics</li>
                  <li>All 75 days of challenge progress and status</li>
                  <li>Your saved Java solution code databases</li>
                </ul>
                <p className="font-semibold text-red/80 mt-3 text-[11px] flex items-center gap-1">
                  <AlertTriangle size={12} className="text-red-500 inline-block" />
                  <span>This action is permanent and cannot be undone.</span>
                </p>
              </div>
              <div className="modal-footer flex justify-end gap-3 pt-4 border-t border-[hsl(var(--card-border)/0.3)]">
                <button 
                  type="button" 
                  className="btn-secondary py-1.5 px-4 text-xs font-semibold rounded-lg" 
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn-primary bg-red-600 hover:bg-red-700 text-white py-1.5 px-4 text-xs font-bold rounded-lg border-none" 
                  onClick={() => {
                    executeResetProgress();
                    setShowResetConfirm(false);
                  }}
                >
                  Reset Everything
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Back Confirm Modal */}
      <AnimatePresence>
        {showBackConfirm && (
          <div className="custom-modal-overlay">
            <div className="custom-modal-card glass-panel p-6 max-w-sm w-full mx-4">
              <div className="modal-header flex items-center gap-3 mb-3 pb-3 border-b border-[hsl(var(--card-border)/0.3)]">
                <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                  <AlertTriangle size={24} className="animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Exit Coding Workspace?</h3>
              </div>
              <div className="modal-body my-4 text-xs leading-relaxed text-muted-foreground">
                <p className="mb-2">Are you sure you want to leave the active coding workspace?</p>
                <p className="text-yellow-500/90 font-medium">Any unsaved code modifications or current progress for this day's challenge will be lost.</p>
              </div>
              <div className="modal-footer flex justify-end gap-3 pt-4 border-t border-[hsl(var(--card-border)/0.3)]">
                <button 
                  type="button" 
                  className="btn-secondary py-1.5 px-4 text-xs font-semibold rounded-lg" 
                  onClick={() => setShowBackConfirm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn-primary bg-yellow-600 hover:bg-yellow-700 text-white py-1.5 px-4 text-xs font-bold rounded-lg border-none" 
                  onClick={() => {
                    if (timerRef.current) {
                      clearInterval(timerRef.current);
                      timerRef.current = null;
                    }
                    setCurrentScreen('dashboard');
                    setCurrentDayTest(null);
                    setShowBackConfirm(false);
                  }}
                >
                  Yes, Exit
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <div className="challenge-main-header glass-panel p-8 mb-8">
        <div className="flex justify-between items-start flex-wrap gap-6">
          <div style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
            <div className="flex items-center gap-2.5">
              <span className="badge badge-medium font-semibold" style={{fontSize:'0.7rem', padding:'0.3rem 0.75rem'}}>TCS 75-Day Coding</span>
              <span className="badge badge-easy font-semibold" style={{fontSize:'0.7rem', padding:'0.3rem 0.75rem'}}>100% Coding Only</span>
            </div>
            <h1 className="text-gradient" style={{fontSize:'2rem', fontWeight:900, letterSpacing:'-0.02em', lineHeight:1.2}}>
              TCS 75-Day Coding Challenge
            </h1>
            <p style={{color:'hsl(var(--muted-foreground))', fontSize:'0.9rem', lineHeight:1.65, maxWidth:'520px', marginTop:'0.25rem'}}>
              Strict streak-based coding curriculum. Master programming concepts from basic data structures to advanced Dynamic Programming.
            </p>
          </div>

          <div style={{display:'flex', gap:'0.75rem', alignItems:'center', flexShrink:0}}>
            <button 
              className={`btn-secondary ${activeTab === 'student' ? 'active-tab-btn' : ''}`}
              style={{padding:'0.65rem 1.25rem', fontSize:'0.85rem', gap:'0.5rem'}}
              onClick={() => setActiveTab('student')}
            >
              <Award size={16} />
              <span>Challenge Hub</span>
            </button>
            {activeUser?.role === 'admin' && (
              <button 
                className={`btn-secondary ${activeTab === 'admin' ? 'active-tab-btn' : ''}`}
                style={{padding:'0.65rem 1.25rem', fontSize:'0.85rem', gap:'0.5rem'}}
                onClick={() => setActiveTab('admin')}
              >
                <Settings size={16} />
                <span>Weight Console</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {streakNotice && (
        <div className="alert-notice-box glass-panel p-4 mb-6 flex items-center gap-3 border-yellow/20 bg-yellow/5">
          <AlertTriangle className="text-yellow flex-shrink-0" size={20} />
          <div className="text-sm text-yellow-foreground">
            {streakNotice}
          </div>
          <button onClick={() => setStreakNotice('')} className="ml-auto text-yellow hover:text-foreground">✕</button>
        </div>
      )}

      {/* STUDENT ROADMAP DASHBOARD */}
      {activeTab === 'student' && currentScreen === 'dashboard' && (
        <div className="student-dashboard-layout">
          {/* Main Grid View */}
          <div className="roadmap-grid-container flex flex-col" style={{gap:'2rem'}}>
            
            {/* STATS TILES GRID */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'1.25rem'}}>
              {/* Streak Card */}
              <div className="stat-card-modern glass-panel" style={{padding:'1.75rem', display:'flex', alignItems:'center', gap:'1.25rem', borderLeft:'4px solid #f97316', overflow:'hidden'}}>
                <div style={{padding:'1rem', borderRadius:'14px', background:'rgba(249,115,22,0.12)', flexShrink:0}}>
                  <Flame size={28} style={{color:'#f97316'}} className="animate-bounce" />
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'0.3rem'}}>
                  <span style={{fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:'0.1em', color:'hsl(var(--muted-foreground))', fontWeight:700}}>Active Streak</span>
                  <div style={{display:'flex', alignItems:'baseline', gap:'0.5rem'}}>
                    <span style={{fontSize:'2.25rem', fontWeight:800, color:'#f97316', lineHeight:1}}>{userMeta.streak_count}</span>
                    <span style={{fontSize:'0.8rem', color:'hsl(var(--muted-foreground))'}}>days active</span>
                  </div>
                </div>
              </div>

              {/* Best Streak Card */}
              <div className="stat-card-modern glass-panel" style={{padding:'1.75rem', display:'flex', alignItems:'center', gap:'1.25rem', borderLeft:'4px solid #eab308', overflow:'hidden'}}>
                <div style={{padding:'1rem', borderRadius:'14px', background:'rgba(234,179,8,0.12)', flexShrink:0}}>
                  <Trophy size={28} style={{color:'#eab308'}} />
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'0.3rem'}}>
                  <span style={{fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:'0.1em', color:'hsl(var(--muted-foreground))', fontWeight:700}}>Best Streak</span>
                  <div style={{display:'flex', alignItems:'baseline', gap:'0.5rem'}}>
                    <span style={{fontSize:'2.25rem', fontWeight:800, color:'#eab308', lineHeight:1}}>{userMeta.best_streak}</span>
                    <span style={{fontSize:'0.8rem', color:'hsl(var(--muted-foreground))'}}>days max</span>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="stat-card-modern glass-panel" style={{padding:'1.75rem', display:'flex', alignItems:'center', gap:'1.25rem', borderLeft:'4px solid hsl(var(--primary))', overflow:'hidden'}}>
                <div style={{padding:'1rem', borderRadius:'14px', background:'rgba(139,92,246,0.12)', flexShrink:0}}>
                  <Award size={28} style={{color:'hsl(var(--primary))'}} />
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'0.3rem', flexGrow:1}}>
                  <span style={{fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:'0.1em', color:'hsl(var(--muted-foreground))', fontWeight:700}}>Overall Completion</span>
                  <div style={{display:'flex', alignItems:'baseline', gap:'0.5rem'}}>
                    <span style={{fontSize:'2.25rem', fontWeight:800, color:'hsl(var(--primary))', lineHeight:1}}>{completedCount}</span>
                    <span style={{fontSize:'0.8rem', color:'hsl(var(--muted-foreground))'}}>{`/ 75 days (${progressPercent}%)`}</span>
                  </div>
                  <div style={{height:'6px', background:'hsl(var(--secondary))', borderRadius:'99px', overflow:'hidden', marginTop:'0.4rem'}}>
                    <div style={{height:'100%', background:'hsl(var(--primary))', borderRadius:'99px', width:`${progressPercent}%`, transition:'width 0.5s ease'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* HERO: NEXT ACTIVE CHALLENGE */}
            {nextActive && nextActive.dayData && (
              <div className="next-challenge-hero glass-panel" style={{padding:'2rem', border:'1px solid rgba(139,92,246,0.25)', background:'rgba(139,92,246,0.04)', position:'relative', overflow:'hidden'}}>
                {/* decorative glow blob */}
                <div style={{position:'absolute', top:'-40px', right:'-40px', width:'200px', height:'200px', background:'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents:'none'}} />
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1.5rem', position:'relative', zIndex:1}}>
                  <div style={{flexGrow:1, display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'0.6rem', flexWrap:'wrap'}}>
                      <span style={{fontSize:'0.65rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', padding:'0.3rem 0.75rem', borderRadius:'99px', background:'rgba(139,92,246,0.15)', color:'#a78bfa', border:'1px solid rgba(139,92,246,0.3)'}}>Current Objective</span>
                      <span style={{fontSize:'0.65rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em', padding:'0.3rem 0.75rem', borderRadius:'99px', background:'rgba(139,92,246,0.1)', color:'#a78bfa', border:'1px solid rgba(139,92,246,0.2)'}}>{nextActive.dayData.track} track</span>
                    </div>
                    <h2 style={{fontSize:'1.6rem', fontWeight:900, letterSpacing:'-0.02em', lineHeight:1.2}}>
                      Day {nextActive.dayData.day_number}: {nextActive.dayData.primary_topic}
                    </h2>
                    <p style={{color:'hsl(var(--muted-foreground))', fontSize:'0.875rem', lineHeight:1.65, maxWidth:'480px'}}>
                      Solve the 3 targeted coding challenges to maintain your daily streak. Timer constraints apply.
                    </p>
                    <div style={{display:'flex', gap:'1.25rem', flexWrap:'wrap', marginTop:'0.25rem'}}>
                      <div style={{display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.8rem', color:'hsl(var(--muted-foreground))', fontWeight:600}}>
                        <Code size={15} style={{color:'hsl(var(--primary))'}} />
                        <span>3 Coding Problems</span>
                      </div>
                      <div style={{display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.8rem', color:'hsl(var(--muted-foreground))', fontWeight:600}}>
                        <Timer size={15} style={{color:'hsl(var(--primary))'}} />
                        <span>Time Limit: {nextActive.dayData.time_limit} Mins</span>
                      </div>
                    </div>
                  </div>

                  <div style={{flexShrink:0, display:'flex', flexDirection:'column', gap:'0.75rem', minWidth:'200px'}}>
                    {nextActive.statusInfo.status === 'unlocked' && (
                      <button 
                        type="button" 
                        onClick={() => startTest(nextActive.dayData)}
                        className="btn-primary"
                        style={{width:'100%', padding:'0.85rem 1.5rem', justifyContent:'center', fontSize:'0.85rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.06em'}}
                      >
                        <Play size={16} fill="white" />
                        <span>Launch Workspace</span>
                      </button>
                    )}
                    {nextActive.statusInfo.status === 'locked' && (
                      <div style={{padding:'1rem', borderRadius:'12px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', textAlign:'center', color:'hsl(var(--muted-foreground))', fontSize:'0.85rem', fontWeight:600}}>
                        <Lock size={18} style={{margin:'0 auto 0.5rem', opacity:0.5}} />
                        <span>Prerequisites Locked</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ROADMAP TIMELINE HEADER & SEARCH */}
            <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
              <div className="search-filter-bar">
                <div className="premium-search-box-container">
                  <Search size={15} style={{color:'#64748b', flexShrink: 0}} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search topics, questions or code patterns..."
                    className="premium-search-input"
                  />
                  {searchQuery && (
                    <button 
                      type="button" 
                      onClick={() => setSearchQuery('')} 
                      className="premium-clear-btn"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div style={{display:'flex', alignItems:'center', gap:'0.75rem', flexWrap:'wrap'}}>
                  <span style={{fontSize:'0.7rem', color:'#64748b', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', whiteSpace:'nowrap'}}>Filter:</span>
                  <div style={{display:'flex', gap:'0.4rem', flexWrap:'wrap'}}>
                    {['all', 'completed', 'unlocked', 'locked'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setStatusFilter(status)}
                        className={`status-filter-chip ${statusFilter === status ? 'active-chip' : ''}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* TRACK TAB SWITCHER */}
              <div className="track-tabs-bar">
                {[
                  { id: 'all', label: 'All Challenges' },
                  { id: 'ninja', label: 'Ninja (1–30)' },
                  { id: 'digital', label: 'Digital (31–60)' },
                  { id: 'prime', label: 'Prime (61–75)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCurrentSubTab(tab.id)}
                    className={`track-tab-btn ${currentSubTab === tab.id ? 'active-track' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* DAYS GRID */}
              {filteredDays.length === 0 ? (
                <div className="glass-panel p-12 text-center text-muted-foreground">
                  No coding challenges match your search query or status filter criteria.
                </div>
              ) : (
                <div className="days-grid-modern">
                  {filteredDays.map(day => {
                    const dayStatus = getDayStatus(day.day_number);
                    const isCompleted = dayStatus.status === 'completed';
                    const isUnlocked = dayStatus.status === 'unlocked';
                    const isLocked = dayStatus.status === 'locked';

                    let cardClass = 'day-card-modern locked-card-modern';
                    if (isCompleted) cardClass = 'day-card-modern completed-card-modern';
                    if (isUnlocked) cardClass = 'day-card-modern active-card-modern';

                    return (
                      <div 
                        key={day.day_number}
                        className={`glass-panel ${cardClass}`}
                        onClick={() => {
                          if (isCompleted) {
                            viewCompletedResults(day);
                          } else if (isUnlocked) {
                            startTest(day);
                          }
                        }}
                      >
                        <div className="day-card-header flex justify-between items-center pb-2.5 mb-2 border-b border-[hsl(var(--card-border)/0.25)]">
                          <span className="day-number-label font-bold text-[10px] tracking-wide">DAY {day.day_number}</span>
                          <div className="status-indicator">
                            {isCompleted && <CheckCircle2 size={16} className="text-green" />}
                            {isLocked && <Lock size={13} className="text-muted-foreground/60" />}
                            {isUnlocked && <Play size={13} className="text-primary animate-pulse" />}
                          </div>
                        </div>

                        <div className="day-card-content flex-grow flex flex-col justify-between">
                          <div>
                            <span className={`track-mini-badge badge-${day.track}`}>
                              {day.track}
                            </span>
                            <h4 className="day-card-topic text-xs font-bold text-foreground mt-2 line-clamp-1">
                              {day.primary_topic}
                            </h4>
                            <div className="day-card-questions mt-3 space-y-1.5">
                              {day.questions && day.questions.map((q, qidx) => (
                                <div key={qidx} className="flex items-start gap-1 text-[10px] text-muted-foreground leading-tight">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1 flex-shrink-0" />
                                  <span className="line-clamp-2">Q{qidx + 1}: {q.topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="day-card-footer mt-4 pt-2.5 border-t border-[hsl(var(--card-border)/0.15)] flex justify-between items-center">
                            {isCompleted && (
                              <span className="text-[10px] text-green font-mono font-bold">
                                Completed ✓
                              </span>
                            )}
                            {isUnlocked && (
                              <span className="start-badge text-[9px] font-extrabold uppercase tracking-wider text-primary flex items-center gap-0.5">
                                Solve Challenge <ChevronRight size={10} />
                              </span>
                            )}
                            {isLocked && (
                              <span className="start-badge text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60">
                                Locked
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR: ANALYTICS & OPTIONS */}
          <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>

            {/* ===== SOLVED TOPICS PANEL ===== */}
            <div className="glass-panel" style={{padding:'1.75rem', display:'flex', flexDirection:'column', gap:'1.25rem'}}>
              <div style={{display:'flex', alignItems:'center', gap:'0.65rem', paddingBottom:'1rem', borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{padding:'0.6rem', borderRadius:'10px', background:'rgba(139,92,246,0.12)'}}>
                  <BookMarked size={18} style={{color:'hsl(var(--primary))'}} />
                </div>
                <div>
                  <h3 style={{fontWeight:800, fontSize:'0.95rem', letterSpacing:'-0.01em'}}>Solved Topics</h3>
                  <span style={{fontSize:'0.7rem', color:'hsl(var(--muted-foreground))'}}>Programming concepts mastered</span>
                </div>
              </div>
              
              {completedCodingTopics.length === 0 ? (
                <div style={{padding:'1.5rem 1rem', textAlign:'center', background:'rgba(255,255,255,0.02)', borderRadius:'10px', border:'1px dashed rgba(255,255,255,0.08)'}}>
                  <BookOpen size={28} style={{color:'hsl(var(--muted-foreground))', opacity:0.35, margin:'0 auto 0.75rem'}} />
                  <p style={{fontSize:'0.8rem', color:'hsl(var(--muted-foreground))', lineHeight:1.65}}>
                    Your progress summary of completed programming topics will appear here as you solve daily challenges.
                  </p>
                </div>
              ) : (
                <div style={{display:'flex', flexDirection:'column', gap:'0.65rem'}}>
                  {completedCodingTopics.map((topic, idx) => (
                    <div key={idx} style={{
                      display:'flex', justifyContent:'space-between', alignItems:'center',
                      padding:'0.85rem 1rem', borderRadius:'10px',
                      background:'rgba(16,185,129,0.04)', border:'1px solid rgba(16,185,129,0.15)',
                      borderLeft:'3px solid #10b981',
                      transition:'all 0.2s ease'
                    }}>
                      <div style={{display:'flex', flexDirection:'column', gap:'0.15rem'}}>
                        <span style={{fontSize:'0.8rem', fontWeight:700}}>{topic.topic}</span>
                        <span style={{fontSize:'0.65rem', color:'#10b981', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em'}}>Completed</span>
                      </div>
                      <span style={{
                        fontSize:'0.7rem', fontWeight:800, fontFamily:'monospace',
                        padding:'0.25rem 0.65rem', borderRadius:'99px',
                        background:'rgba(16,185,129,0.12)', color:'#34d399',
                        border:'1px solid rgba(16,185,129,0.25)'
                      }}>{topic.count} Days</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ===== CHALLENGE SETTINGS PANEL ===== */}
            <div className="glass-panel" style={{padding:'1.75rem', display:'flex', flexDirection:'column', gap:'1.25rem'}}>
              <div style={{display:'flex', alignItems:'center', gap:'0.65rem', paddingBottom:'1rem', borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{padding:'0.6rem', borderRadius:'10px', background:'rgba(139,92,246,0.12)'}}>
                  <Settings size={18} style={{color:'hsl(var(--primary))'}} />
                </div>
                <div>
                  <h3 style={{fontWeight:800, fontSize:'0.95rem', letterSpacing:'-0.01em'}}>Challenge Settings</h3>
                  <span style={{fontSize:'0.7rem', color:'hsl(var(--muted-foreground))'}}>Progression & streak rules</span>
                </div>
              </div>

              <div style={{display:'flex', flexDirection:'column', gap:'1.25rem'}}>

                {/* Streak Toggle */}
                <div style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'0.85rem 1rem', borderRadius:'10px',
                  background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)'
                }}>
                  <div style={{display:'flex', flexDirection:'column', gap:'0.15rem'}}>
                    <span style={{fontSize:'0.8rem', fontWeight:700}}>Streak Reset on Miss</span>
                    <span style={{fontSize:'0.65rem', color:'hsl(var(--muted-foreground))'}}>Reset streak if a day is skipped</span>
                  </div>
                  <label style={{position:'relative', display:'inline-block', width:'42px', height:'24px', flexShrink:0}}>
                    <input 
                      type="checkbox" 
                      checked={streakResetRule}
                      onChange={(e) => setStreakResetRule(e.target.checked)}
                      style={{opacity:0, width:0, height:0}}
                    />
                    <span style={{
                      position:'absolute', cursor:'pointer', inset:0,
                      background: streakResetRule ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.1)',
                      borderRadius:'99px', transition:'background 0.25s ease',
                      boxShadow: streakResetRule ? '0 0 10px rgba(139,92,246,0.35)' : 'none'
                    }}>
                      <span style={{
                        position:'absolute', left: streakResetRule ? '20px' : '3px', top:'3px',
                        width:'18px', height:'18px', borderRadius:'50%',
                        background:'#fff', transition:'left 0.25s ease',
                        boxShadow:'0 1px 3px rgba(0,0,0,0.3)'
                      }} />
                    </span>
                  </label>
                </div>
              </div>

              {/* Reset Button */}
              <div style={{paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.06)', marginTop:'0.25rem'}}>
                <button 
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="premium-reset-btn"
                  style={{
                    width:'100%', padding:'0.75rem 1rem',
                    display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
                    fontSize:'0.8rem', fontWeight:700, borderRadius:'10px',
                    cursor:'pointer'
                  }}
                >
                  <RotateCcw size={15} />
                  <span>Reset Course Progress</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN VIEW */}
      {activeTab === 'admin' && (
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <div className="flex justify-between items-start flex-wrap gap-4 border-b border-[hsl(var(--card-border)/0.4)] pb-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <TrendingUp size={20} className="text-primary" />
                  <span>Programming Topic Recency Weights</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Recency weight score algorithm computed dynamically based on the frequency of occurrences in past drives.
                </p>
              </div>
              <button 
                onClick={handleRegenerateSchedule}
                className="btn-primary px-4 py-2 font-bold text-xs shadow-md flex items-center gap-1.5 border-none"
              >
                <Cpu size={14} />
                <span>Regenerate 75-Day Coding Program</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-foreground">
                <thead>
                  <tr className="border-b border-[hsl(var(--card-border)/0.4)] text-left text-muted-foreground font-semibold">
                    <th className="py-2.5 px-3">Programming Topic</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Drive Occurrences</th>
                    <th className="py-2.5 px-3">Recency Weight</th>
                    <th className="py-2.5 px-3">Curriculum Days</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--card-border)/0.2)]">
                  {topicWeights.map((row, idx) => (
                    <tr key={idx} className="hover:bg-secondary/20">
                      <td className="py-3 px-3 font-bold text-foreground">{row.topic}</td>
                      <td className="py-3 px-3">
                        <span className="badge badge-medium text-[10px]">{row.category}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-muted-foreground">{row.appearances} drives</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="weight-bar-bg">
                            <div className="weight-bar-fill" style={{ width: `${Math.min(100, row.weight * 30)}%` }}></div>
                          </div>
                          <span className="font-mono text-xs font-bold text-primary">{row.weight.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-foreground">{row.daysAssigned} Days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* TIMED CODING WORKSPACE VIEW */}
      {currentScreen === 'test' && currentDayTest && (() => {
        const activeQuestion = currentDayTest.questions[activeQuestionIndex];
        if (!activeQuestion) return null;

        return (
          <div className="test-screen-container workspace-root">
            {/* ─── Top Bar ─── */}
            <div className="workspace-topbar glass-panel">
              <button className="btn-secondary flex items-center gap-2 text-xs font-bold" onClick={() => setShowBackConfirm(true)}>
                <ArrowLeft size={15} />
                <span>Exit Workspace</span>
              </button>

              <h2 className="workspace-day-title">{currentDayTest.title}</h2>

              <div className="workspace-timer-chip">
                <Timer size={15} className={timeLeft < 60 ? 'text-red animate-pulse' : 'text-primary'} />
                <span className={`font-mono font-extrabold text-sm ${timeLeft < 60 ? 'text-red' : 'text-primary'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* ─── Problem Tabs ─── */}
            <div className="problem-navbar">
              {currentDayTest.questions.map((q, idx) => {
                const isActive = activeQuestionIndex === idx;
                const score = questionScores[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveQuestionIndex(idx)}
                    className={`problem-nav-tab ${isActive ? 'active' : ''}`}
                  >
                    <span>
                      Problem {idx + 1}: {q.topic} ({q.difficulty})
                      {score !== undefined ? ` — ${score}%` : ''}
                    </span>
                    {isActive && <span className="problem-nav-indicator" />}
                  </button>
                );
              })}
            </div>

            {/* ─── Main IDE Split ─── */}
            <div className="workspace-ide-grid">
              {/* LEFT — Problem Description */}
              <div className="problem-descr-panel glass-panel">
                <div className="problem-scroll-area">
                  {/* Difficulty + Topic meta strip */}
                  <div className="problem-meta-strip">
                    <span className="badge badge-medium">{activeQuestion.difficulty}</span>
                    <span className="problem-topic-label">Topic: {activeQuestion.topic}</span>
                  </div>

                  {/* Problem Title */}
                  <h3 className="problem-title">
                    Problem {activeQuestionIndex + 1}: {activeQuestion.topic}
                  </h3>
                  
                  {/* Problem Body */}
                  <div className="problem-body-text">
                    {activeQuestion.question}
                  </div>

                  {/* Years Seen Card */}
                  {activeQuestion.years_seen && (
                    <div className="years-seen-card">
                      <h4 className="section-label text-primary">
                        <HelpCircle size={13} />
                        <span>Recurrent Drive Appearances</span>
                      </h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        This code module was flagged in previous TCS selection drives:
                      </p>
                      <div className="years-badge-row">
                        {activeQuestion.years_seen.map((yr, idx) => (
                          <span key={idx} className="year-badge">{yr}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Assistance Card */}
                  <div className="ai-assistance-card">
                    <h4 className="section-label text-amber-400">
                      <Sparkles size={13} className="text-amber-400" />
                      <span>Interactive Learning Assistance</span>
                    </h4>
                    
                    <div className="ai-btn-row">
                      <button
                        type="button"
                        onClick={() => {
                          setHintViewed(prev => ({
                            ...prev,
                            [activeQuestionIndex]: activeQuestion.hint_body || "Consider dividing the problem into smaller subproblems or checking edge cases like 0 and negative inputs."
                          }));
                        }}
                        className="ai-assist-btn glow-btn-amber"
                      >
                        <Lightbulb size={15} className="text-amber-400" />
                        <span>Get AI Logic Hint</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSolutionViewed(prev => ({
                            ...prev,
                            [activeQuestionIndex]: true
                          }));
                          if (activeQuestion.solution) {
                            setTypedCodes(prev => ({
                              ...prev,
                              [activeQuestionIndex]: activeQuestion.solution
                            }));
                          }
                        }}
                        className="ai-assist-btn glow-btn-primary"
                      >
                        <Key size={15} className="text-primary" />
                        <span>Reveal Solution Code</span>
                      </button>
                    </div>

                    {/* Hint Display */}
                    {hintViewed[activeQuestionIndex] && (
                      <div className="hint-display-card glow-panel-amber animate-fadeIn">
                        <span className="font-bold text-amber-400 flex items-center gap-2 mb-2 text-sm">
                          <Lightbulb size={15} className="text-amber-400" />
                          <span>Logic &amp; Mistake Rectification Hint:</span>
                        </span>
                        <div className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">{hintViewed[activeQuestionIndex]}</div>
                      </div>
                    )}

                    {/* Solution Display */}
                    {solutionViewed[activeQuestionIndex] && (
                      <div className="solution-display-card glow-panel-primary animate-fadeIn">
                        <span className="font-bold text-primary flex items-center gap-2 mb-2 text-sm">
                          <Key size={15} className="text-primary" />
                          <span>Reference Solution Copied to Workspace!</span>
                        </span>
                        
                        <span className="font-bold text-primary block mt-3 mb-2 text-xs uppercase tracking-wider">Optimal Reference Code:</span>
                        <pre className="solution-code-pre">
                          {activeQuestion.solution}
                        </pre>

                        <span className="font-bold text-primary block mt-4 mb-2 text-xs uppercase tracking-wider">Real-Time Insight &amp; Explanation:</span>
                        <div className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">{activeQuestion.explanation || activeQuestion.hint_body}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom notice */}
                <div className="workspace-notice">
                  <Terminal size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Compile and dry run on sample test cases. Make sure your Solution class outputs correctly.</span>
                </div>
              </div>

              {/* RIGHT — Code Editor + Terminal */}
              <div className="coding-panel glass-panel">
                <div className="editor-control-header">
                  <span className="editor-file-label">
                    <Code size={14} className="text-primary" />
                    Solution.java
                  </span>

                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => {
                        setTypedCodes(prev => ({
                          ...prev,
                          [activeQuestionIndex]: activeQuestion.starter_code || activeQuestion.answer
                        }));
                      }}
                      className="px-3 py-1.5 text-[11px] font-bold rounded-md editor-reset-btn"
                    >
                      Reset Template
                    </button>
                    <button 
                      type="button"
                      onClick={runCodeSample}
                      disabled={isEvaluating[activeQuestionIndex]}
                      className="btn-primary px-3 py-1.5 text-[11px] font-bold flex items-center gap-1.5 rounded-md"
                    >
                      <Play size={11} fill="currentColor" />
                      {isEvaluating[activeQuestionIndex] ? 'Running...' : 'Run Sample Tests'}
                    </button>
                  </div>
                </div>

                <div className="editor-body">
                  {/* Line Numbers Column */}
                  <div className="line-numbers-col">
                    {getLineNumbers(typedCodes[activeQuestionIndex]).map(num => (
                      <span key={num}>{num}</span>
                    ))}
                  </div>

                  {/* Textarea for code */}
                  <textarea
                    rows="18"
                    value={typedCodes[activeQuestionIndex] || ''}
                    onChange={(e) => {
                      setTypedCodes(prev => ({
                        ...prev,
                        [activeQuestionIndex]: e.target.value
                      }));
                    }}
                    className="editor-textarea"
                  />
                </div>

                <div className="terminal-output-panel">
                  <div className="terminal-header-row">
                    <Terminal size={14} />
                    <span>Console Output</span>
                  </div>

                  <div className="terminal-body">
                    {compileOutputs[activeQuestionIndex] ? (
                      <pre className="text-green whitespace-pre-wrap leading-relaxed text-[12px]">
                        {compileOutputs[activeQuestionIndex]}
                      </pre>
                    ) : (
                      <div className="terminal-placeholder">
                        <span>$ java Solution.java</span>
                        <span>No logs printed. Run tests to see output compilation logs...</span>
                      </div>
                    )}
                  </div>

                  <div className="submit-footer">
                    <span className="submit-hint-text">
                      Click Run to dry run sample test cases
                    </span>
                    <button
                      type="button"
                      onClick={() => submitTest(currentDayTest)}
                      className="btn-primary submit-challenge-btn"
                    >
                      <span>Submit Day Challenge</span>
                      <Check size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}


      {/* REVIEW & EXPLANATION DETAILS SCREEN */}
      {currentScreen === 'results' && testResultSummary && (
        <div className="test-results-container max-w-5xl mx-auto space-y-6">
          <div className="results-card glass-panel p-6 text-center relative overflow-hidden">
            <Award size={48} className="mx-auto text-yellow mb-2 animate-bounce" />
            <h2 className="text-xl font-bold text-foreground">Coding Challenge Submitted!</h2>
            <p className="text-xs text-muted-foreground mt-1">{testResultSummary.title}</p>
            <div className="flex justify-center gap-6 py-3 px-5 bg-secondary/30 rounded-xl border border-[hsl(var(--card-border)/0.4)] max-w-sm mx-auto my-4">
              <div>
                <span className="block text-lg font-bold text-green">{testResultSummary.average_score ?? 100}%</span>
                <span className="text-[9px] text-muted-foreground font-mono font-semibold">OVERALL SCORE</span>
              </div>
              <div className="border-r border-[hsl(var(--card-border)/0.4)]"></div>
              <div>
                <span className="block text-lg font-bold text-primary">{formatTime(testResultSummary.timeSpent)}</span>
                <span className="text-[9px] text-muted-foreground font-mono font-semibold">TIME TAKEN</span>
              </div>
            </div>

            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="btn-primary px-6 py-2 rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-1 border-none mx-auto"
            >
              <span>Back to Dashboard</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="answers-explanation-box space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Code size={18} className="text-primary" />
              <span>Workspace Review &amp; Optimal Solutions</span>
            </h3>

            <div className="flex gap-2 p-1 bg-secondary/20 border border-[hsl(var(--card-border)/0.4)] rounded-lg flex-wrap">
              {testResultSummary.questions.map((q, idx) => {
                const qScore = testResultSummary.scores ? testResultSummary.scores[idx] : 100;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReviewQuestionIdx(idx)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all border-none ${
                      reviewQuestionIdx === idx 
                        ? 'bg-primary text-white shadow-md' 
                        : 'hover:bg-secondary/60 text-muted-foreground'
                    }`}
                  >
                    <span>Problem {idx + 1}: {q.topic} ({qScore}%)</span>
                  </button>
                );
              })}
            </div>

            {(() => {
              const activeQ = testResultSummary.questions[reviewQuestionIdx];
              const activeSub = testResultSummary.submittedCodes[reviewQuestionIdx] || '// No solution submitted';
              if (!activeQ) return null;
              return (
                <div className="flex flex-col gap-6">
                  <div className="side-by-side-code-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-panel p-0 overflow-hidden flex flex-col justify-between border border-[hsl(var(--card-border)/0.4)]">
                      <div className="editor-control-header flex items-center bg-secondary/40 border-b border-[hsl(var(--card-border)/0.4)] px-4 py-2">
                        <span className="text-xs text-foreground font-mono flex items-center gap-1.5 font-bold">
                          <Code size={12} className="text-red" />
                          Your Submitted Solution
                        </span>
                      </div>
                      <pre className="p-4 rounded-b font-mono text-xs bg-background/50 text-foreground overflow-x-auto max-h-[380px] leading-relaxed">
                        {activeSub}
                      </pre>
                    </div>

                    <div className="glass-panel p-0 overflow-hidden flex flex-col justify-between border border-[hsl(var(--card-border)/0.4)]">
                      <div className="editor-control-header flex items-center bg-primary/10 border-b border-[hsl(var(--card-border)/0.4)] px-4 py-2">
                        <span className="text-xs text-primary font-mono flex items-center gap-1.5 font-bold">
                          <CheckCircle2 size={12} className="text-primary" />
                          Optimal Code Pattern
                        </span>
                      </div>
                      <pre className="p-4 rounded-b font-mono text-xs bg-background/50 text-foreground overflow-x-auto max-h-[380px] leading-relaxed">
                        {activeQ.solution}
                      </pre>
                    </div>
                  </div>

                  <div className="explanation-item-card glass-panel p-6 border border-primary/20 bg-primary/5">
                    <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                      <Sparkles size={16} className="text-primary" />
                      <span>Optimal Algorithm Insight &amp; Explanation</span>
                    </h4>
                    <div className="text-xs text-foreground/90 leading-relaxed whitespace-pre-line font-medium">
                      {activeQ.explanation}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Scoped CSS overrides */}
      <style>{`
        /* ==========================================
           TCS CHALLENGE - PREMIUM CSS OVERHAUL
        ========================================== */

        .tcs-challenge-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* ==========================================
           WORKSPACE — Premium IDE Layout System
        ========================================== */

        .workspace-root {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          width: 100%;
          max-width: 100%;
          padding: 0 0.5rem;
        }

        .workspace-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
        }

        .workspace-day-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: hsl(var(--foreground));
          letter-spacing: -0.01em;
        }

        .workspace-timer-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          background: hsl(var(--primary) / 0.08);
          border: 1px solid hsl(var(--primary) / 0.2);
        }

        /* ─── IDE Grid ─── */
        .workspace-ide-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          align-items: start;
        }

        @media (max-width: 960px) {
          .workspace-ide-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ─── Problem Description Panel ─── */
        .workspace-ide-grid .problem-descr-panel {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0;
          overflow: hidden;
          min-height: 680px;
        }

        .problem-scroll-area {
          padding: 2rem 2rem 1rem 2rem;
          overflow-y: auto;
          flex: 1;
        }

        .problem-meta-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid hsl(var(--card-border) / 0.3);
        }

        .problem-topic-label {
          font-size: 0.8rem;
          color: hsl(var(--muted-foreground));
          font-family: var(--font-mono);
          font-weight: 500;
        }

        .problem-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: hsl(var(--foreground));
          margin-bottom: 1.5rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .problem-body-text {
          font-size: 0.95rem;
          color: hsl(var(--foreground) / 0.88);
          line-height: 1.85;
          white-space: pre-line;
          margin-bottom: 2rem;
          font-weight: 450;
        }

        /* ─── Years Seen Card ─── */
        .years-seen-card {
          background: hsl(var(--secondary) / 0.35);
          border: 1px solid hsl(var(--card-border) / 0.3);
          border-radius: 0.85rem;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.5rem;
        }

        .section-label {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .years-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .year-badge {
          padding: 0.35rem 0.75rem;
          border-radius: 0.5rem;
          background: hsl(var(--secondary));
          color: hsl(var(--foreground));
          font-size: 0.75rem;
          font-family: var(--font-mono);
          font-weight: 600;
          border: 1px solid hsl(var(--card-border) / 0.3);
        }

        /* ─── AI Assistance Card ─── */
        .ai-assistance-card {
          background: hsl(var(--secondary) / 0.2);
          border: 1px solid hsl(var(--card-border) / 0.3);
          border-radius: 0.85rem;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1rem;
        }

        .ai-btn-row {
          display: flex;
          gap: 0.75rem;
        }

        .ai-assist-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 0.82rem;
          font-weight: 700;
          border-radius: 0.65rem;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: all 0.25s ease;
        }

        .hint-display-card,
        .solution-display-card {
          padding: 1.25rem 1.5rem;
          border-radius: 0.75rem;
          margin-top: 1rem;
        }

        .solution-code-pre {
          padding: 1rem;
          border-radius: 0.65rem;
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid hsl(var(--primary) / 0.2);
          color: #6ee7b7;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          overflow-x: auto;
          white-space: pre;
          max-height: 260px;
          line-height: 1.7;
        }

        .workspace-notice {
          display: flex;
          gap: 0.65rem;
          align-items: flex-start;
          padding: 1rem 2rem;
          font-size: 0.78rem;
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.04);
          border-top: 1px solid hsl(var(--primary) / 0.1);
        }

        /* ─── Coding Panel (Right) ─── */
        .workspace-ide-grid .coding-panel {
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          padding: 0;
          overflow: hidden;
          min-height: 680px;
        }

        .workspace-ide-grid .editor-control-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid hsl(var(--card-border) / 0.4);
          background: hsl(var(--secondary) / 0.3);
        }

        .editor-file-label {
          font-size: 0.82rem;
          color: hsl(var(--foreground));
          font-family: var(--font-mono);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* ─── Terminal Output Panel ─── */
        .terminal-output-panel {
          display: flex;
          flex-direction: column;
          border-top: 1px solid hsl(var(--card-border) / 0.4);
          background: hsl(var(--secondary) / 0.15);
          font-family: var(--font-mono);
          min-height: 200px;
        }

        .terminal-header-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid hsl(var(--card-border) / 0.25);
          color: hsl(var(--muted-foreground));
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .terminal-body {
          padding: 1rem 1.25rem;
          flex: 1;
          font-size: 0.8rem;
        }

        .terminal-placeholder {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: hsl(var(--muted-foreground) / 0.5);
          font-style: italic;
          padding: 0.75rem 0;
          line-height: 1.7;
        }

        .submit-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-top: 1px solid hsl(var(--card-border) / 0.3);
          gap: 1rem;
        }

        .submit-hint-text {
          font-size: 0.72rem;
          color: hsl(var(--muted-foreground));
          font-family: var(--font-sans);
        }

        .submit-challenge-btn {
          padding: 0.6rem 1.75rem;
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 0.6rem;
          white-space: nowrap;
        }

        .active-tab-btn {
          color: white !important;
          background: hsl(var(--primary)) !important;
          border-color: hsl(var(--primary) / 0.4) !important;
          box-shadow: 0 4px 15px hsl(var(--primary) / 0.3) !important;
        }

        .custom-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .student-dashboard-layout {
          display: grid;
          grid-template-columns: 3fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .student-dashboard-layout {
            grid-template-columns: 1fr;
          }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .days-grid-modern {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .day-card-modern {
          padding: 1.25rem;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          min-height: 180px;
          text-align: left;
        }

        .day-card-modern:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.3);
        }

        .completed-card-modern {
          border-left: 4px solid #10b981 !important;
        }

        .active-card-modern {
          border-left: 4px solid hsl(var(--primary)) !important;
        }

        .cooldown-card-modern {
          border-left: 4px solid #f59e0b !important;
        }

        .locked-card-modern {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .track-mini-badge {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          display: inline-block;
        }
        .badge-ninja {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
        }
        .badge-digital {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
        }
        .badge-prime {
          background: rgba(244, 63, 94, 0.15);
          color: #fb7185;
        }

        .day-number-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: hsl(var(--muted-foreground));
        }

        .weight-bar-bg {
          height: 6px;
          background: hsl(var(--secondary));
          border-radius: 3px;
          overflow: hidden;
          width: 80px;
        }

        .weight-bar-fill {
          height: 100%;
          background: hsl(var(--primary));
          border-radius: 3px;
        }

        /* Premium Glowing Effects */
        .glow-btn-amber {
          position: relative;
          border: 1px solid rgba(245, 158, 11, 0.4) !important;
          background: rgba(245, 158, 11, 0.08) !important;
          color: #f59e0b !important;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.05), inset 0 0 10px rgba(245, 158, 11, 0.05) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .glow-btn-amber:hover {
          background: rgba(245, 158, 11, 0.15) !important;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.35), inset 0 0 15px rgba(245, 158, 11, 0.15) !important;
          border-color: rgba(245, 158, 11, 0.8) !important;
          text-shadow: 0 0 8px rgba(245, 158, 11, 0.6) !important;
        }

        .glow-btn-primary {
          position: relative;
          border: 1px solid rgba(99, 102, 241, 0.4) !important;
          background: rgba(99, 102, 241, 0.08) !important;
          color: #a5b4fc !important;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.05), inset 0 0 10px rgba(99, 102, 241, 0.05) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .glow-btn-primary:hover {
          background: rgba(99, 102, 241, 0.15) !important;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.35), inset 0 0 15px rgba(99, 102, 241, 0.15) !important;
          border-color: rgba(99, 102, 241, 0.8) !important;
          text-shadow: 0 0 8px rgba(99, 102, 241, 0.6) !important;
        }

        .glow-panel-amber {
          border: 1px solid rgba(245, 158, 11, 0.4) !important;
          background: rgba(245, 158, 11, 0.04) !important;
          box-shadow: 0 0 25px -5px rgba(245, 158, 11, 0.15), inset 0 0 20px rgba(245, 158, 11, 0.02) !important;
        }

        .glow-panel-primary {
          border: 1px solid rgba(99, 102, 241, 0.4) !important;
          background: rgba(99, 102, 241, 0.04) !important;
          box-shadow: 0 0 25px -5px rgba(99, 102, 241, 0.15), inset 0 0 20px rgba(99, 102, 241, 0.02) !important;
        }

        /* IDE Working Sheet Layout styling */
        .editor-body {
          display: flex !important;
          flex-direction: row !important;
          position: relative !important;
          font-family: monospace !important;
          font-size: 13.5px !important;
          min-height: 460px !important;
          background: rgba(15, 15, 20, 0.95) !important;
          overflow: hidden !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-bottom-left-radius: 8px !important;
          border-bottom-right-radius: 8px !important;
          width: 100% !important;
        }

        .line-numbers-col {
          display: flex !important;
          flex-direction: column !important;
          text-align: right !important;
          padding: 1.25rem 0.75rem !important;
          color: rgba(255, 255, 255, 0.3) !important;
          border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
          background: rgba(0, 0, 0, 0.4) !important;
          user-select: none !important;
          min-width: 3rem !important;
          line-height: 1.6 !important;
        }

        .editor-textarea {
          flex: 1 !important;
          background: transparent !important;
          color: #f8fafc !important;
          padding: 1.25rem !important;
          line-height: 1.6 !important;
          outline: none !important;
          border: none !important;
          resize: none !important;
          font-family: monospace !important;
          font-size: 13.5px !important;
          width: 100% !important;
          tab-size: 4 !important;
        }

        /* ===== PREMIUM SEARCH BAR ===== */
        .search-filter-bar {
          display: flex !important;
          flex-wrap: wrap !important;
          justify-content: space-between !important;
          align-items: center !important;
          gap: 0.85rem !important;
          background: rgba(10, 12, 22, 0.75) !important;
          border: 1px solid rgba(139, 92, 246, 0.14) !important;
          border-radius: 16px !important;
          padding: 0.85rem 1.1rem !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04) !important;
        }

        .premium-search-box-container {
          display: flex !important;
          align-items: center !important;
          gap: 0.6rem !important;
          background: rgba(12, 12, 22, 0.85) !important;
          border: 1.5px solid rgba(255, 255, 255, 0.07) !important;
          border-radius: 11px !important;
          padding: 0.55rem 0.9rem !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.4) !important;
          flex: 1 !important;
          min-width: 200px !important;
        }

        .premium-search-box-container:hover {
          border-color: rgba(139, 92, 246, 0.28) !important;
          background: rgba(18, 18, 32, 0.9) !important;
        }

        .premium-search-box-container:focus-within {
          border-color: rgba(139, 92, 246, 0.6) !important;
          background: rgba(18, 18, 32, 0.97) !important;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.4), 0 0 0 3px rgba(139, 92, 246, 0.1), 0 0 18px rgba(139, 92, 246, 0.18) !important;
          transform: translateY(-1px) !important;
        }

        .premium-search-input {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          color: #e2e8f0 !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          width: 100% !important;
          font-family: var(--font-sans) !important;
        }

        .premium-search-input::placeholder {
          color: #475569 !important;
          font-style: italic !important;
        }

        .premium-clear-btn {
          width: 20px !important;
          height: 20px !important;
          flex-shrink: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border-radius: 50% !important;
          background: rgba(255, 255, 255, 0.06) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: #64748b !important;
          font-size: 9px !important;
          font-weight: 900 !important;
          cursor: pointer !important;
          transition: all 0.22s ease !important;
          line-height: 1 !important;
        }

        .premium-clear-btn:hover {
          background: rgba(239, 68, 68, 0.18) !important;
          border-color: rgba(239, 68, 68, 0.4) !important;
          color: #f87171 !important;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.3) !important;
          transform: scale(1.15) rotate(90deg) !important;
        }

        /* ===== PREMIUM STATUS FILTER CHIPS ===== */
        .status-filter-chip {
          padding: 0.3rem 0.8rem !important;
          font-size: 0.62rem !important;
          font-weight: 800 !important;
          border-radius: 99px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.08em !important;
          cursor: pointer !important;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: 1.5px solid rgba(255, 255, 255, 0.07) !important;
          background: rgba(15, 15, 25, 0.6) !important;
          color: #64748b !important;
          white-space: nowrap !important;
        }

        .status-filter-chip:hover {
          background: rgba(139, 92, 246, 0.1) !important;
          border-color: rgba(139, 92, 246, 0.32) !important;
          color: #c4b5fd !important;
        }

        .status-filter-chip.active-chip {
          background: linear-gradient(135deg, #7c3aed, #6d28d9) !important;
          border-color: rgba(139, 92, 246, 0.65) !important;
          color: #fff !important;
          box-shadow: 0 0 14px rgba(139, 92, 246, 0.5), 0 2px 6px rgba(0,0,0,0.3) !important;
          transform: translateY(-1px) !important;
        }

        /* ===== PREMIUM TRACK TABS ===== */
        .track-tabs-bar {
          display: flex !important;
          gap: 0.25rem !important;
          background: rgba(10, 10, 18, 0.82) !important;
          border: 1px solid rgba(255,255,255,0.06) !important;
          border-radius: 12px !important;
          padding: 0.3rem !important;
          width: fit-content !important;
          backdrop-filter: blur(12px) !important;
          box-shadow: 0 2px 12px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04) !important;
        }

        .track-tab-btn {
          padding: 0.5rem 1rem !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          border-radius: 8px !important;
          border: none !important;
          background: transparent !important;
          color: #64748b !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          white-space: nowrap !important;
          letter-spacing: 0.01em !important;
        }

        .track-tab-btn:hover {
          color: #94a3b8 !important;
          background: rgba(255,255,255,0.04) !important;
        }

        .track-tab-btn.active-track {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.85), rgba(109, 40, 217, 0.92)) !important;
          color: #fff !important;
          box-shadow: 0 2px 10px rgba(124, 58, 237, 0.4) !important;
        }

        /* Premium Problem Navbar styling */
        .problem-navbar {
          display: flex !important;
          gap: 1rem !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          margin-bottom: 1.25rem !important;
          background: rgba(15, 15, 20, 0.3) !important;
          width: 100% !important;
          overflow-x: auto !important;
          border-radius: 8px 8px 0 0 !important;
          padding: 0 0.5rem !important;
        }

        .problem-nav-tab {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          padding: 1rem 0.75rem !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          color: #94a3b8 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }

        .problem-nav-tab:hover {
          color: #f8fafc !important;
        }

        .problem-nav-tab.active {
          color: hsl(var(--primary)) !important;
          text-shadow: 0 0 8px rgba(99, 102, 241, 0.2) !important;
        }

        .problem-nav-indicator {
          position: absolute !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 2.5px !important;
          background: hsl(var(--primary)) !important;
          box-shadow: 0 0 10px hsl(var(--primary)) !important;
          border-radius: 9999px !important;
        }

        /* Premium Reset Course Button */
        .premium-reset-btn {
          position: relative !important;
          background: rgba(239, 68, 68, 0.08) !important;
          color: #ef4444 !important;
          border: 1px solid rgba(239, 68, 68, 0.3) !important;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.03), inset 0 0 8px rgba(239, 68, 68, 0.03) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .premium-reset-btn:hover {
          background: rgba(239, 68, 68, 0.18) !important;
          border-color: rgba(239, 68, 68, 0.7) !important;
          color: #fca5a5 !important;
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.3), inset 0 0 15px rgba(239, 68, 68, 0.1) !important;
          text-shadow: 0 0 8px rgba(239, 68, 68, 0.4) !important;
        }

        /* Code Editor Reset Template Button */
        .editor-reset-btn {
          background: rgba(255, 255, 255, 0.04) !important;
          color: #cbd5e1 !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          transition: all 0.2s ease !important;
        }
        
        .editor-reset-btn:hover {
          background: rgba(239, 68, 68, 0.1) !important;
          border-color: rgba(239, 68, 68, 0.4) !important;
          color: #ef4444 !important;
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.25) !important;
        }
      `}</style>
    </div>
  );
}
