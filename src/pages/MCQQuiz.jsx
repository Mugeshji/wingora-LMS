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
  HelpCircle,
  Lock,
  Unlock,
  Trophy,
  Rocket,
  Zap,
  Coffee,
  Wrench,
  Terminal,
  Star
} from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { javaTopicQuizQuestions as baseJavaTopicQuestions } from '../data/javaTopicQuizQuestions';
import { collectionAndJava8Questions } from '../data/javaCollectionAndJava8Questions';

const javaTopicQuizQuestions = {
  ...baseJavaTopicQuestions,
  ...collectionAndJava8Questions
};

const CATEGORIES = [
  { id: 'java', name: 'Core Java Track', desc: 'Structured 45-Day progression from History to Advanced Topics', icon: BookOpen, color: 'purple' },
  { id: 'html', name: 'HTML5', desc: 'Semantic SEO, Web Storage & Offline APIs', icon: Brain, color: 'purple' },
  { id: 'css', name: 'CSS3 Layouts', desc: 'Flexbox, Grid, Specificity & Animations', icon: Layers, color: 'purple' },
  { id: 'js', name: 'JavaScript', desc: 'Event Loop, Closures, Scoping & Async Flow', icon: Code, color: 'purple' },
  { id: 'jdbc', name: 'JDBC & DB', desc: 'Connection Pools, Transactions & PreparedStatements', icon: Database, color: 'purple' }
];

const JAVA_TOPICS = [
  { id: 'day1_history', name: 'Day 1: History of Java', desc: 'Origins, Oak, Sun Microsystems, Green Team, release milestones' },
  { id: 'day2_features', name: 'Day 2: Features of Java', desc: 'Platform independence, security, robustness, WORA, JIT internals' },
  { id: 'day3_jdk_jre_jvm', name: 'Day 3: JDK, JRE & JVM Internals', desc: 'JVM memory architecture (Metaspace, Stack, Heap), ClassLoaders, Pros & Cons' },
  { id: 'day4_data_types', name: 'Day 4: Data Types', desc: 'Primitive vs reference types, ranges, overflow behavior, promotions' },
  { id: 'day5_variables', name: 'Day 5: Variables & Scopes', desc: 'Local, instance, static scopes, final constants, shadowing, type inference' },
  { id: 'day6_methods', name: 'Day 6: Methods & Call Semantics', desc: 'Pass-by-value, overloading resolution, varargs rules, static vs instance' },
  { id: 'day7_constructor', name: 'Day 7: Constructors & Chaining', desc: 'Default constructors, chaining (this vs super), initialization sequences' },
  { id: 'day8_operators', name: 'Day 8: Operators', desc: 'Arithmetic, relational, logical, bitwise, assignment, shift operators, operator precedence and associativity rules' },
  { id: 'day9_loops_for', name: 'Day 9: For Loop & Nested For Loop', desc: 'Basic for loop execution, initialization, condition, increment steps, break, continue, nested loops, labeled loops' },
  { id: 'day10_loops_while', name: 'Day 10: While & Do-While', desc: 'While loop, do-while loop difference, loop conditions, loop body execution order, exit-control logic, infinite loop traps' },
  { id: 'day11_switch_case', name: 'Day 11: Switch Case', desc: 'Switch statement syntax, support for byte, short, char, int, String, and Enums, break omission (fall-through), yield keyword' },
  { id: 'day8_class_object', name: 'Day 12: Classes & Objects', desc: 'Heap allocation, java.lang.Object methods (equals/hashCode/clone), Java Records' },
  { id: 'day9_inheritance', name: 'Day 13: Inheritance & Subclassing', desc: 'Diamond problem, extends, method overrides, dynamic dispatch, sealed classes' },
  { id: 'day10_typecasting', name: 'Day 14: Typecasting & Promotions', desc: 'Upcasting, downcasting, ClassCastException, implicit promotion, instanceof patterns' },
  { id: 'day11_wrapper', name: 'Day 15: Wrapper Classes', desc: 'Autoboxing, unboxing, caching rules (-128 to 127), parsing, footprint cost' },
  { id: 'day12_abstraction', name: 'Day 16: Abstraction', desc: 'Abstract classes, abstract methods rules, modifiers, partial abstraction concepts' },
  { id: 'day13_interface', name: 'Day 17: Interfaces', desc: 'Default methods, static/private methods, multiple implementation conflicts' },
  { id: 'day14_polymorphism', name: 'Day 18: Polymorphism', desc: 'Compile-time vs runtime, vtables, polymorphic fields/static lookup, constructor traps' },
  { id: 'day15_encapsulation', name: 'Day 19: Encapsulation', desc: 'Access control, data hiding, mutable getters/setters, defensive copying' },
  { id: 'day16_package', name: 'Day 20: Packages & Imports', desc: 'Namespaces, directory alignment, wildcard vs specific imports, static imports' },
  { id: 'day17_access_modifier', name: 'Day 21: Access Modifiers', desc: 'Private, default, protected, public, visibility hierarchies and override limits' },
  { id: 'day18_array', name: 'Day 22: Arrays', desc: '1D & Multidimensional arrays, runtime checks, covariance, Arrays helper class' },
  { id: 'day19_string', name: 'Day 23: Strings & Immutability', desc: 'String pool, StringBuilder/StringBuffer differences, text blocks, performance' },
  { id: 'day20_exception_handling', name: 'Day 24: Exception Handling', desc: 'Checked/Unchecked, Throwable root, try-with-resources, suppressed exceptions' },
  { id: 'day21_file_handling', name: 'Day 25: File Handling & IO', desc: 'Byte vs Character streams, serialization, transient fields, serialVersionUID' },
  { id: 'day22_thread', name: 'Day 26: Multithreading & Concurrency', desc: 'Thread lifecycle, start vs run, synchronized monitors, wait/notify, volatile' },
  { id: 'day23_inner_class', name: 'Day 27: Inner Classes', desc: 'Member, static nested, local, anonymous inner classes, variable shadowing, classfiles' },
  { id: 'day28_arraylist', name: 'Day 28: ArrayList', desc: 'Dynamic array internals, capacity growth formula, O(1) random access, fail-fast iterators, subList views' },
  { id: 'day29_linkedlist', name: 'Day 29: LinkedList', desc: 'Doubly linked node structures, Deque/List interfaces, pointer lookup overhead, spatial locality comparisons' },
  { id: 'day30_vector', name: 'Day 30: Vector', desc: 'Legacy synchronized operations, 100% capacity growth rate, Enumeration iterators, performance tradeoffs' },
  { id: 'day31_stack', name: 'Day 31: Stack', desc: 'LIFO structures, Vector inheritance design flaws, Stack vs ArrayDeque recommendations' },
  { id: 'day32_hashset', name: 'Day 32: HashSet', desc: 'HashMap-backed unique sets, equals/hashCode contracts, PRESENT dummy values, mutable key risks' },
  { id: 'day33_linkedhashset', name: 'Day 33: LinkedHashSet', desc: 'Doubly-linked insertion tracking, O(size) sparse iteration advantages, load factors' },
  { id: 'day34_treeset', name: 'Day 34: TreeSet', desc: 'Red-Black tree implementations, natural vs custom sorting, NavigableSet range methods, comparison-based equality' },
  { id: 'day35_priorityqueue', name: 'Day 35: PriorityQueue', desc: 'Binary heap representation, min-heap default order, O(log N) dynamic operations, PriorityBlockingQueue concurrency' },
  { id: 'day36_arraydeque', name: 'Day 36: ArrayDeque', desc: 'Double-ended queue circular arrays, pointer-free stack/queue efficiency, powers of 2 size optimizations' },
  { id: 'day37_hashmap', name: 'Day 37: HashMap', desc: 'Array of nodes, bucket treeification thresholds, hash distribution formulas, resize cycles, JDK 7 concurrency loops' },
  { id: 'day38_linkedhashmap', name: 'Day 38: LinkedHashMap', desc: 'Doubly-linked entry ordering, access-order constructors, LRU cache evictions' },
  { id: 'day39_treemap', name: 'Day 39: TreeMap', desc: 'Red-Black tree key-value maps, NavigableMap floor/ceiling lookups, comparator-based sorting' },
  { id: 'day40_hashtable', name: 'Day 40: Hashtable', desc: 'Legacy synchronized thread safety, absolute null restrictions, Enumeration vs Iterator fail-fast behavior' },
  { id: 'day41_lambdas', name: 'Day 41: Lambda Expressions', desc: 'Anonymous functional blocks, invokedynamic bytecode implementations, lexical this scopes, effectively final local constraints' },
  { id: 'day42_method_refs', name: 'Day 42: Method References', desc: 'Static/Instance/Constructor reference types, double-colon syntax, target type inference resolution' },
  { id: 'day43_functional_interfaces', name: 'Day 43: Functional Interfaces', desc: 'Single Abstract Method contracts, Predicate/Function/Consumer/Supplier generic APIs, primitive optimizations' },
  { id: 'day44_streams', name: 'Day 44: Stream API', desc: 'Lazy intermediate operations, terminal aggregations, map vs flatMap transformations, stateful sorting limits' },
  { id: 'day45_datetime', name: 'Day 45: Date and Time API', desc: 'Immutable java.time package design, LocalDate/LocalTime models, DateTimeFormatter thread safety, Duration/Period offsets' }
];

export default function MCQQuiz({ setActiveTab }) {
  const activeUser = React.useMemo(() => {
    try {
      const saved = localStorage.getItem('wingora_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const userSuffix = activeUser?.userID ? `_${activeUser.userID}` : '';

  const [currentScreen, setCurrentScreen] = useState('lobby'); // 'lobby', 'java-topics', 'quiz', 'results'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedJavaTopic, setSelectedJavaTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // Array of selected option indices
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes or 15 minutes
  const [timeTaken, setTimeTaken] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState({}); // Toggles for questions review list
  const [resetConfirmType, setResetConfirmType] = useState(null); // null, 'java', 'all'
  const timerRef = useRef(null);

  useEffect(() => {
    if (resetConfirmType) {
      const t = setTimeout(() => setResetConfirmType(null), 3000);
      return () => clearTimeout(t);
    }
  }, [resetConfirmType]);

  // Load stats from localStorage for display on lobby
  const [quizStats, setQuizStats] = useState({});
  const [javaTopicStats, setJavaTopicStats] = useState({});

  useEffect(() => {
    loadStats();
  }, [userSuffix]);

  const loadStats = () => {
    const stats = {};
    CATEGORIES.forEach(cat => {
      const highKey = `wingora_quiz_highscore_${cat.id}`;
      const compKey = `wingora_quiz_completed_${cat.id}`;
      const savedHigh = localStorage.getItem(`${highKey}${userSuffix}`) ||
                        localStorage.getItem(highKey) || '0';
      const savedComp = localStorage.getItem(`${compKey}${userSuffix}`) ||
                        localStorage.getItem(compKey) || '0';

      stats[cat.id] = {
        highScore: parseInt(savedHigh, 10),
        completed: parseInt(savedComp, 10)
      };
    });
    setQuizStats(stats);

    const jStats = {};
    JAVA_TOPICS.forEach(topic => {
      const highKey = `wingora_quiz_highscore_java_${topic.id}`;
      const compKey = `wingora_quiz_completed_java_${topic.id}`;
      const savedHigh = localStorage.getItem(`${highKey}${userSuffix}`) ||
                        localStorage.getItem(highKey) || '0';
      const savedComp = localStorage.getItem(`${compKey}${userSuffix}`) ||
                        localStorage.getItem(compKey) || '0';

      jStats[topic.id] = {
        highScore: parseInt(savedHigh, 10),
        completed: parseInt(savedComp, 10)
      };
    });
    setJavaTopicStats(jStats);
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
    const shuffled = [...allQs].sort(() => 0.5 - Math.random()).slice(0, 25).map(q => {
      const optionsWithIndex = q.options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === q.answer
      }));
      const shuffledOptions = [...optionsWithIndex].sort(() => 0.5 - Math.random());
      return {
        ...q,
        options: shuffledOptions.map(o => o.text),
        answer: shuffledOptions.findIndex(o => o.isCorrect)
      };
    });
    
    setQuestions(shuffled);
    setSelectedCategory(catId);
    setSelectedJavaTopic(null);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(25 * 60); // 25 minutes
    setTimeTaken(0);
    setCurrentScreen('quiz');
  };

  const startJavaTopicQuiz = (topicId) => {
    const allQs = javaTopicQuizQuestions[topicId] || [];
    // Shuffle the 15 questions, and shuffle options per question
    const shuffled = [...allQs].sort(() => 0.5 - Math.random()).map(q => {
      const optionsWithIndex = q.options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === q.answer
      }));
      const shuffledOptions = [...optionsWithIndex].sort(() => 0.5 - Math.random());
      return {
        ...q,
        options: shuffledOptions.map(o => o.text),
        answer: shuffledOptions.findIndex(o => o.isCorrect)
      };
    });
    
    setQuestions(shuffled);
    setSelectedCategory('java');
    setSelectedJavaTopic(topicId);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(15 * 60); // 15 minutes for 15 questions
    setTimeTaken(0);
    setCurrentScreen('quiz');
  };

  const resetJavaProgress = () => {
    JAVA_TOPICS.forEach(topic => {
      const highKey = `wingora_quiz_highscore_java_${topic.id}`;
      const compKey = `wingora_quiz_completed_java_${topic.id}`;
      
      localStorage.removeItem(`${highKey}${userSuffix}`);
      localStorage.removeItem(highKey);
      localStorage.removeItem(`${compKey}${userSuffix}`);
      localStorage.removeItem(compKey);
    });
    loadStats();
    setResetConfirmType(null);
  };

  const resetAllProgress = () => {
    JAVA_TOPICS.forEach(topic => {
      const highKey = `wingora_quiz_highscore_java_${topic.id}`;
      const compKey = `wingora_quiz_completed_java_${topic.id}`;
      
      localStorage.removeItem(`${highKey}${userSuffix}`);
      localStorage.removeItem(highKey);
      localStorage.removeItem(`${compKey}${userSuffix}`);
      localStorage.removeItem(compKey);
    });

    CATEGORIES.forEach(cat => {
      const highKey = `wingora_quiz_highscore_${cat.id}`;
      const compKey = `wingora_quiz_completed_${cat.id}`;
      
      localStorage.removeItem(`${highKey}${userSuffix}`);
      localStorage.removeItem(highKey);
      localStorage.removeItem(`${compKey}${userSuffix}`);
      localStorage.removeItem(compKey);
    });

    const globKey = 'wingora_quizzes_total_completed';
    localStorage.removeItem(`${globKey}${userSuffix}`);
    localStorage.removeItem(globKey);

    loadStats();
    setResetConfirmType(null);
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
    
    const elapsed = (selectedJavaTopic ? 15 * 60 : 25 * 60) - timeLeft;
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
    const highKey = selectedJavaTopic
      ? `wingora_quiz_highscore_java_${selectedJavaTopic}`
      : `wingora_quiz_highscore_${selectedCategory}`;
    const previousHigh = parseInt(
      localStorage.getItem(`${highKey}${userSuffix}`) ||
      localStorage.getItem(highKey) || '0',
      10
    );
    if (finalScore > previousHigh) {
      localStorage.setItem(`${highKey}${userSuffix}`, finalScore.toString());
      localStorage.setItem(highKey, finalScore.toString());
    }
    
    // Increment completed count
    const compKey = selectedJavaTopic
      ? `wingora_quiz_completed_java_${selectedJavaTopic}`
      : `wingora_quiz_completed_${selectedCategory}`;
    const prevCompleted = parseInt(
      localStorage.getItem(`${compKey}${userSuffix}`) ||
      localStorage.getItem(compKey) || '0',
      10
    );
    const newComp = (prevCompleted + 1).toString();
    localStorage.setItem(`${compKey}${userSuffix}`, newComp);
    localStorage.setItem(compKey, newComp);

    // Update global quizzes completed count
    const globKey = 'wingora_quizzes_total_completed';
    const globalCount = parseInt(
      localStorage.getItem(`${globKey}${userSuffix}`) ||
      localStorage.getItem(globKey) || '0',
      10
    );
    const newGlob = (globalCount + 1).toString();
    localStorage.setItem(`${globKey}${userSuffix}`, newGlob);
    localStorage.setItem(globKey, newGlob);

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
    if (selectedJavaTopic) {
      if (scoreValue >= 14) return { title: 'Principal Engineer Grade', desc: 'Ready for any top-tier system design or developer interview!', color: 'text-green' };
      if (scoreValue >= 11) return { title: 'Senior Developer Grade', desc: 'Excellent score. Ready for realistic project challenges and developer tasks.', color: 'text-indigo' };
      if (scoreValue >= 8) return { title: 'Associate Developer Grade', desc: 'Good foundation. Review the incorrect answers to polish corner cases.', color: 'text-yellow' };
      return { title: 'Junior Developer / Review Needed', desc: 'Brush up on theory and coding structures. Review details below and try again.', color: 'text-red' };
    }
    if (scoreValue >= 23) return { title: 'Principal Engineer Grade', desc: 'Ready for any top-tier system design or developer interview!', color: 'text-green' };
    if (scoreValue >= 18) return { title: 'Senior Developer Grade', desc: 'Excellent score. Ready for realistic project challenges and developer tasks.', color: 'text-indigo' };
    if (scoreValue >= 12) return { title: 'Associate Developer Grade', desc: 'Good foundation. Review the incorrect answers to polish corner cases.', color: 'text-yellow' };
    return { title: 'Junior Developer / Review Needed', desc: 'Brush up on theory and coding structures. Review details below and try again.', color: 'text-red' };
  };

  const totalJavaDays = JAVA_TOPICS.length;
  const completedJavaDays = JAVA_TOPICS.filter(t => (javaTopicStats[t.id]?.completed || 0) > 0).length;
  const perfectJavaDays = JAVA_TOPICS.filter(t => (javaTopicStats[t.id]?.highScore || 0) === 15).length;

  return (
    <div className="mcq-root">
      {currentScreen === 'lobby' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mcq-lobby">
          <div className="mcq-hero">
            <div className="mcq-hero-glow" />
            <div className="mcq-hero-content">
              <span className="mcq-chip"><Zap size={12} style={{display:'inline', marginRight:'0.3rem', verticalAlign:'middle'}}/> Practice Arena</span>
              <h1 className="mcq-title">Technical Quiz Lab</h1>
              <p className="mcq-subtitle">Master interview-grade questions across multiple technologies. Each challenge simulates real coding assessments.</p>
            </div>
            <div className="mcq-topics-actions">
              <button 
                className="mcq-btn-danger" 
                onClick={() => {
                  if (resetConfirmType === 'all') {
                    resetAllProgress();
                  } else {
                    setResetConfirmType('all');
                  }
                }}
              >
                <RotateCcw size={14}/> {resetConfirmType === 'all' ? 'Confirm Reset?' : 'Reset'}
              </button>
              <button className="mcq-btn-ghost" onClick={() => setActiveTab('dashboard')}>
                <LayoutDashboard size={16} /> Dashboard
              </button>
            </div>
          </div>

          <div className="mcq-cards-row">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const stats = quizStats[cat.id] || { highScore: 0, completed: 0 };
              return (
                <motion.div key={cat.id} whileHover={{ y: -6, scale: 1.02 }} className={`mcq-subject-card mcq-glow-${cat.color}`}>
                  <div className="mcq-card-top">
                    <div className={`mcq-icon-ring mcq-ring-${cat.color}`}><Icon size={22} /></div>
                    <div className="mcq-card-badges">
                      {cat.id === 'java' ? (
                        <span className="mcq-mini-stat">{completedJavaDays}/{totalJavaDays} days</span>
                      ) : stats.highScore > 0 ? (
                        <span className="mcq-mini-stat">{stats.highScore}/25 best</span>
                      ) : null}
                    </div>
                  </div>
                  <h3 className="mcq-card-name">{cat.name}</h3>
                  <p className="mcq-card-desc">{cat.desc}</p>
                  <div className="mcq-card-footer">
                    <div className="mcq-card-meta">
                      {cat.id === 'java' ? (
                        <><span className="mcq-dot mcq-dot-green" />{perfectJavaDays} perfect</>
                      ) : (
                        <><span className="mcq-dot mcq-dot-blue" />{stats.completed} attempts</>
                      )}
                    </div>
                    <button className={`mcq-btn-start mcq-btn-${cat.color}`} onClick={() => {
                      if (cat.id === 'java') { setSelectedCategory('java'); setSelectedJavaTopic(null); setCurrentScreen('java-topics'); }
                      else { startQuiz(cat.id); }
                    }}>
                      {cat.id === 'java' ? 'Enter Track' : 'Start'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {currentScreen === 'java-topics' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mcq-topics">
          <div className="mcq-topics-head">
            <div>
              <span className="mcq-chip mcq-chip-purple"><Coffee size={12} style={{display:'inline', marginRight:'0.3rem', verticalAlign:'middle'}}/> Core Java Track</span>
              <h1 className="mcq-title" style={{fontSize:'1.75rem'}}>Daily Challenge Roadmap</h1>
              <p className="mcq-subtitle">{totalJavaDays}-day structured progression · 15 questions per topic · Interview-grade difficulty</p>
            </div>
            <div className="mcq-topics-actions">
              <button 
                className="mcq-btn-danger" 
                onClick={() => {
                  if (resetConfirmType === 'java') {
                    resetJavaProgress();
                  } else {
                    setResetConfirmType('java');
                  }
                }}
              >
                <RotateCcw size={14}/> {resetConfirmType === 'java' ? 'Confirm Reset?' : 'Reset'}
              </button>
              <button className="mcq-btn-ghost" onClick={() => setCurrentScreen('lobby')}><ArrowLeft size={16}/> Back</button>
            </div>
          </div>

          <div className="mcq-progress-overview">
            <div className="mcq-po-item"><span className="mcq-po-val">{completedJavaDays}</span><span className="mcq-po-label">Completed</span></div>
            <div className="mcq-po-divider"/>
            <div className="mcq-po-item"><span className="mcq-po-val mcq-val-gold">{perfectJavaDays}</span><span className="mcq-po-label">Perfect</span></div>
            <div className="mcq-po-divider"/>
            <div className="mcq-po-item"><span className="mcq-po-val">{totalJavaDays - completedJavaDays}</span><span className="mcq-po-label">Remaining</span></div>
          </div>

          <div className="mcq-timeline">
            {JAVA_TOPICS.map((topic, index) => {
              const stats = javaTopicStats[topic.id] || { highScore: 0, completed: 0 };
              const done = stats.completed > 0;
              const perfect = stats.highScore === 15;
              let locked = false;
              if (index > 0) { const prev = javaTopicStats[JAVA_TOPICS[index-1].id] || {completed:0}; locked = prev.completed === 0; }

              return (
                <motion.div key={topic.id} whileHover={!locked ? {scale:1.015} : {}} className={`mcq-day-card ${locked ? 'mcq-day-locked' : ''} ${perfect ? 'mcq-day-perfect' : done ? 'mcq-day-done' : ''}`}>
                  <div className="mcq-day-left">
                    <div className={`mcq-day-num ${perfect ? 'mcq-num-gold' : done ? 'mcq-num-green' : locked ? 'mcq-num-gray' : 'mcq-num-blue'}`}>
                      {locked ? <Lock size={14}/> : perfect ? <Star size={12} fill="#fbbf24" stroke="none"/> : index + 1}
                    </div>
                    <div className="mcq-day-connector" />
                  </div>
                  <div className="mcq-day-body">
                    <div className="mcq-day-row">
                      <h4 className="mcq-day-title">{topic.name.replace(/^Day \d+:\s*/, '')}</h4>
                      <div className="mcq-day-badges">
                        {perfect && <span className="mcq-badge-gold"><Star size={10} fill="#fbbf24" stroke="none" style={{display:'inline', marginRight:'0.15rem', verticalAlign:'middle'}}/> Perfect</span>}
                        {done && !perfect && <span className="mcq-badge-score">{stats.highScore}/15</span>}
                      </div>
                    </div>
                    <p className="mcq-day-desc">{topic.desc}</p>
                    <div className="mcq-day-actions">
                      <span className="mcq-day-meta">{done ? `${stats.completed} attempt${stats.completed>1?'s':''}` : '15 Questions'}</span>
                      {locked ? (
                        <span className="mcq-btn-locked"><Lock size={12}/> Complete Day {index}</span>
                      ) : (
                        <button className="mcq-btn-go" onClick={() => startJavaTopicQuiz(topic.id)}>
                          {done ? 'Retry' : 'Start'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {currentScreen === 'quiz' && questions.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mcq-quiz">
          <div className="mcq-quiz-top">
            <button className="mcq-btn-ghost" onClick={() => setCurrentScreen(selectedJavaTopic ? 'java-topics' : 'lobby')}>
              <ArrowLeft size={14}/> Exit
            </button>
            <div className="mcq-step-dots">
              {questions.map((_, i) => (
                <div key={i} className={`mcq-dot-step ${i === currentIndex ? 'mcq-dot-active' : i < currentIndex ? 'mcq-dot-done' : ''}`} />
              ))}
            </div>
            <div className={`mcq-timer ${timeLeft < 60 ? 'mcq-timer-danger' : ''}`}>
              <Timer size={14} /> {formatTime(timeLeft)}
            </div>
          </div>

          <div className="mcq-quiz-info">
            <span className="mcq-quiz-cat">{CATEGORIES.find(c => c.id === selectedCategory)?.name}{selectedJavaTopic && ` · Day ${JAVA_TOPICS.findIndex(t => t.id === selectedJavaTopic) + 1}`}</span>
            <span className="mcq-quiz-progress">{currentIndex + 1} / {questions.length}</span>
          </div>
          <div className="mcq-quiz-bar"><div className="mcq-quiz-bar-fill" style={{width:`${((currentIndex+1)/questions.length)*100}%`}}/></div>

          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{x:40,opacity:0}} animate={{x:0,opacity:1}} exit={{x:-40,opacity:0}} transition={{duration:0.2}} className="mcq-q-card">
              <div className="mcq-q-meta">
                <span className={`mcq-q-diff mcq-diff-${questions[currentIndex].difficulty}`}>{questions[currentIndex].difficulty}</span>
                <span className="mcq-q-type">
                  {questions[currentIndex].type === 'practical' ? (
                    <><Terminal size={12} style={{display:'inline', marginRight:'0.2rem', verticalAlign:'middle'}}/> Practical</>
                  ) : (
                    <><BookOpen size={12} style={{display:'inline', marginRight:'0.2rem', verticalAlign:'middle'}}/> Theory</>
                  )}
                </span>
              </div>
              <h2 className="mcq-q-text">{questions[currentIndex].question}</h2>

              {questions[currentIndex].code && (
                <div className="mcq-code-block">
                  <div className="mcq-code-header"><span className="mcq-code-dot r"/><span className="mcq-code-dot y"/><span className="mcq-code-dot g"/><span className="mcq-code-file">{selectedCategory === 'java' ? 'Main.java' : 'script.js'}</span></div>
                  <pre className="mcq-code-body"><code>{questions[currentIndex].code}</code></pre>
                </div>
              )}

              <div className="mcq-options">
                {questions[currentIndex].options.map((option, idx) => {
                  let cls = 'mcq-opt';
                  let StatusIcon = null;
                  if (isChecked) {
                    if (idx === questions[currentIndex].answer) { cls += ' mcq-opt-correct'; StatusIcon = CheckCircle2; }
                    else if (idx === selectedOption) { cls += ' mcq-opt-wrong'; StatusIcon = XCircle; }
                    else { cls += ' mcq-opt-dim'; }
                  } else if (idx === selectedOption) { cls += ' mcq-opt-picked'; }

                  return (
                    <button key={idx} onClick={() => handleOptionClick(idx)} disabled={isChecked} className={cls}>
                      <div className="mcq-opt-inner">
                        <span className="mcq-opt-letter">{String.fromCharCode(65+idx)}</span>
                        <span className="mcq-opt-text">{option}</span>
                      </div>
                      {StatusIcon && <StatusIcon size={18}/>}
                    </button>
                  );
                })}
              </div>

              {isChecked && (
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mcq-insight">
                  <div className="mcq-insight-head">Interview Insight</div>
                  <p>{questions[currentIndex].explanation}</p>
                </motion.div>
              )}

              <div className="mcq-q-footer">
                {!isChecked ? (
                  <button onClick={handleCheckAnswer} disabled={selectedOption===null} className="mcq-btn-check">Check Answer <Check size={15}/></button>
                ) : (
                  <button onClick={handleNextQuestion} className="mcq-btn-next">{currentIndex < questions.length-1 ? 'Next Question' : 'View Results'}</button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {currentScreen === 'results' && (
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="mcq-results">
          <div className="mcq-results-card">
            <div className="mcq-score-visual">
              <svg className="mcq-score-ring" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
                <motion.circle cx="60" cy="60" r="52" fill="none" stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={2*Math.PI*52} initial={{strokeDashoffset:2*Math.PI*52}} animate={{strokeDashoffset:2*Math.PI*52*(1-score/questions.length)}} transition={{duration:1.5,ease:"easeOut"}}/>
                <defs><linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs>
              </svg>
              <div className="mcq-score-center"><span className="mcq-score-num">{score}</span><span className="mcq-score-den">/{questions.length}</span></div>
            </div>
            <h2 className="mcq-results-title">Challenge Complete!</h2>
            <div className={`mcq-eval ${getEvaluationRating(score).color}`}>
              <strong>{getEvaluationRating(score).title}</strong>
              <p>{getEvaluationRating(score).desc}</p>
            </div>
            <div className="mcq-stats-row">
              <div className="mcq-stat-box"><span className="mcq-stat-v" style={{color:'#10b981'}}>{score}</span><span className="mcq-stat-l">Correct</span></div>
              <div className="mcq-stat-box"><span className="mcq-stat-v" style={{color:'#ef4444'}}>{questions.length-score}</span><span className="mcq-stat-l">Wrong</span></div>
              <div className="mcq-stat-box"><span className="mcq-stat-v" style={{color:'#818cf8'}}>{formatTime(timeTaken)}</span><span className="mcq-stat-l">Time</span></div>
            </div>
            <div className="mcq-results-btns">
              <button className="mcq-btn-check" onClick={() => selectedJavaTopic ? startJavaTopicQuiz(selectedJavaTopic) : startQuiz(selectedCategory)}><RotateCcw size={14}/> Retry</button>
              <button className="mcq-btn-ghost" onClick={() => setCurrentScreen(selectedJavaTopic ? 'java-topics' : 'lobby')}>{selectedJavaTopic ? 'Back to Topics' : 'Back to Lobby'}</button>
              <button className="mcq-btn-ghost" onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={14}/> Dashboard</button>
            </div>
          </div>

          <div className="mcq-review">
            <h3 className="mcq-review-title"><Brain size={18}/> Answer Review</h3>
            {questions.map((q, idx) => {
              const ua = userAnswers[idx]; const correct = ua === q.answer; const open = expandedReviews[idx];
              return (
                <div key={idx} className={`mcq-rev-item ${correct ? 'mcq-rev-ok' : 'mcq-rev-fail'}`}>
                  <div className="mcq-rev-head" onClick={() => toggleReviewExpand(idx)}>
                    <div className="mcq-rev-left">
                      {correct ? <CheckCircle2 size={15} style={{color:'#10b981'}}/> : <XCircle size={15} style={{color:'#ef4444'}}/>}
                      <span>Q{idx+1}: {q.question.length > 70 ? q.question.substring(0,70)+'...' : q.question}</span>
                    </div>
                    {open ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                  </div>
                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="mcq-rev-body">
                        <p className="mcq-rev-q">{q.question}</p>
                        {q.code && <pre className="mcq-rev-code"><code>{q.code}</code></pre>}
                        <div className="mcq-rev-opts">
                          {q.options.map((opt, oi) => (
                            <div key={oi} className={`mcq-rev-opt ${oi===q.answer ? 'mcq-rev-opt-right' : oi===ua && !correct ? 'mcq-rev-opt-wrong' : ''}`}>
                              <strong>{String.fromCharCode(65+oi)}.</strong> {opt}
                            </div>
                          ))}
                        </div>
                        <div className="mcq-rev-explain"><span>{q.explanation}</span></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      <style>{`
.mcq-root{padding:1rem 0;color:hsl(var(--foreground));font-family:var(--font-sans)}
.mcq-hero{display:flex;justify-content:space-between;align-items:flex-start;gap:2rem;margin-bottom:2.5rem;position:relative;padding:2rem 2.5rem;border-radius:1.25rem;background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(6,182,212,0.06));border:1px solid rgba(124,58,237,0.15);overflow:hidden}
.mcq-hero-glow{position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:radial-gradient(circle,rgba(124,58,237,0.2),transparent 70%);pointer-events:none}
.mcq-chip{display:inline-block;padding:0.3rem 0.85rem;border-radius:2rem;font-size:0.75rem;font-weight:700;letter-spacing:0.04em;background:rgba(124,58,237,0.12);color:#a78bfa;border:1px solid rgba(124,58,237,0.25);margin-bottom:0.75rem}
.mcq-chip-purple{background:rgba(124,58,237,0.15);color:#c4b5fd}
.mcq-title{font-size:2rem;font-weight:800;letter-spacing:-0.03em;background:linear-gradient(135deg,#f0f0f0,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:0.4rem}
.mcq-subtitle{color:hsl(var(--muted-foreground));font-size:0.9rem;max-width:520px;line-height:1.6}
.mcq-btn-ghost{display:inline-flex;align-items:center;gap:0.4rem;padding:0.5rem 1rem;border-radius:0.6rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:hsl(var(--muted-foreground));font-size:0.8rem;font-weight:600;cursor:pointer;transition:all 0.2s}
.mcq-btn-ghost:hover{background:rgba(255,255,255,0.08);color:hsl(var(--foreground))}
.mcq-cards-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem}
.mcq-subject-card{padding:1.75rem;border-radius:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);backdrop-filter:blur(16px);transition:all 0.3s;cursor:default;display:flex;flex-direction:column;justify-content:space-between}
.mcq-glow-purple{box-shadow:0 0 0 0 transparent;transition:all 0.3s ease}.mcq-glow-purple:hover{border-color:rgba(139,92,246,0.6) !important;box-shadow:0 12px 40px rgba(139,92,246,0.22),0 0 20px rgba(139,92,246,0.12) !important}
.mcq-glow-green:hover{border-color:rgba(16,185,129,0.3);box-shadow:0 8px 30px rgba(16,185,129,0.08)}
.mcq-glow-indigo:hover{border-color:rgba(99,102,241,0.3);box-shadow:0 8px 30px rgba(99,102,241,0.08)}
.mcq-glow-yellow:hover{border-color:rgba(234,179,8,0.3);box-shadow:0 8px 30px rgba(234,179,8,0.08)}
.mcq-glow-pink:hover{border-color:rgba(236,72,153,0.3);box-shadow:0 8px 30px rgba(236,72,153,0.08)}
.mcq-card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
.mcq-icon-ring{width:2.75rem;height:2.75rem;border-radius:0.75rem;display:flex;align-items:center;justify-content:center;color:#fff}
.mcq-ring-purple{background:linear-gradient(135deg,#a78bfa,#7c3aed)}.mcq-ring-green{background:linear-gradient(135deg,#34d399,#059669)}.mcq-ring-indigo{background:linear-gradient(135deg,#818cf8,#4f46e5)}.mcq-ring-yellow{background:linear-gradient(135deg,#fbbf24,#d97706)}.mcq-ring-pink{background:linear-gradient(135deg,#f472b6,#db2777)}
.mcq-mini-stat{font-size:0.7rem;padding:0.2rem 0.5rem;border-radius:1rem;background:rgba(255,255,255,0.06);color:hsl(var(--muted-foreground));font-weight:600}
.mcq-card-name{font-size:1.1rem;font-weight:700;margin-bottom:0.4rem}
.mcq-card-desc{font-size:0.78rem;color:hsl(var(--muted-foreground));line-height:1.5;margin-bottom:1.25rem}
.mcq-card-footer{display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.06)}
.mcq-card-meta{font-size:0.72rem;color:hsl(var(--muted-foreground));display:flex;align-items:center;gap:0.4rem}
.mcq-dot{width:6px;height:6px;border-radius:50%;display:inline-block}.mcq-dot-green{background:#10b981}.mcq-dot-blue{background:#818cf8}
.mcq-btn-start{padding:0.45rem 1rem;border-radius:0.5rem;font-size:0.75rem;font-weight:700;border:none;cursor:pointer;color:#fff;transition:all 0.2s}
.mcq-btn-purple{background:linear-gradient(135deg,#a78bfa,#7c3aed)}.mcq-btn-green{background:linear-gradient(135deg,#34d399,#059669)}.mcq-btn-indigo{background:linear-gradient(135deg,#818cf8,#4f46e5)}.mcq-btn-yellow{background:linear-gradient(135deg,#fbbf24,#d97706);color:#1a1a2e}.mcq-btn-pink{background:linear-gradient(135deg,#f472b6,#db2777)}
.mcq-btn-start:hover{opacity:0.9;transform:translateY(-1px)}

.mcq-topics-head{display:flex;justify-content:space-between;align-items:flex-start;gap:1.5rem;margin-bottom:1.5rem;flex-wrap:wrap}
.mcq-topics-actions{display:flex;gap:0.6rem;flex-wrap:wrap}
.mcq-btn-danger{display:inline-flex;align-items:center;gap:0.35rem;padding:0.45rem 0.9rem;border-radius:0.5rem;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);color:#f87171;font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.2s}
.mcq-btn-danger:hover{background:rgba(239,68,68,0.18)}
.mcq-progress-overview{display:flex;align-items:center;justify-content:center;gap:1.5rem;padding:1rem 2rem;border-radius:0.85rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);margin-bottom:2rem}
.mcq-po-item{text-align:center}.mcq-po-val{display:block;font-size:1.5rem;font-weight:800;color:hsl(var(--foreground))}.mcq-po-label{font-size:0.7rem;color:hsl(var(--muted-foreground));text-transform:uppercase;letter-spacing:0.05em}
.mcq-val-gold{color:#fbbf24 !important}
.mcq-po-divider{width:1px;height:2.5rem;background:rgba(255,255,255,0.08)}

.mcq-timeline{display:flex;flex-direction:column;gap:0}
.mcq-day-card{display:flex;gap:1rem;padding:1rem 0;transition:all 0.2s}
.mcq-day-locked{opacity:0.45;pointer-events:none}
.mcq-day-left{display:flex;flex-direction:column;align-items:center;width:2.5rem;flex-shrink:0}
.mcq-day-num{width:2.2rem;height:2.2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:800;flex-shrink:0}
.mcq-num-blue{background:rgba(99,102,241,0.15);color:#818cf8;border:2px solid rgba(99,102,241,0.3)}
.mcq-num-green{background:rgba(16,185,129,0.15);color:#34d399;border:2px solid rgba(16,185,129,0.3)}
.mcq-num-gold{background:rgba(251,191,36,0.15);color:#fbbf24;border:2px solid rgba(251,191,36,0.3)}
.mcq-num-gray{background:rgba(255,255,255,0.04);color:hsl(var(--muted-foreground));border:2px solid rgba(255,255,255,0.08)}
.mcq-day-connector{flex:1;width:2px;background:rgba(255,255,255,0.06);margin-top:0.35rem;min-height:1rem}
.mcq-day-body{flex:1;padding:0.75rem 1.25rem;border-radius:0.75rem;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);transition:all 0.2s}
.mcq-day-card:not(.mcq-day-locked) .mcq-day-body:hover{border-color:rgba(139,92,246,0.5) !important;background:rgba(139,92,246,0.04);box-shadow:0 6px 20px rgba(139,92,246,0.15),0 0 10px rgba(139,92,246,0.08) !important}
.mcq-day-perfect .mcq-day-body{border-color:rgba(251,191,36,0.15);background:rgba(251,191,36,0.03)}
.mcq-day-done .mcq-day-body{border-color:rgba(16,185,129,0.12)}
.mcq-day-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem}
.mcq-day-title{font-size:0.9rem;font-weight:700}
.mcq-day-badges{display:flex;gap:0.4rem}
.mcq-badge-gold{font-size:0.65rem;padding:0.15rem 0.5rem;border-radius:1rem;background:rgba(251,191,36,0.12);color:#fbbf24;font-weight:700;border:1px solid rgba(251,191,36,0.2)}
.mcq-badge-score{font-size:0.65rem;padding:0.15rem 0.5rem;border-radius:1rem;background:rgba(255,255,255,0.05);color:hsl(var(--muted-foreground));font-weight:600}
.mcq-day-desc{font-size:0.72rem;color:hsl(var(--muted-foreground));line-height:1.5;margin-bottom:0.6rem}
.mcq-day-actions{display:flex;justify-content:space-between;align-items:center}
.mcq-day-meta{font-size:0.68rem;color:hsl(var(--muted-foreground))}
.mcq-btn-locked{font-size:0.7rem;color:hsl(var(--muted-foreground));display:flex;align-items:center;gap:0.3rem;opacity:0.6}
.mcq-btn-go{padding:0.35rem 0.85rem;border-radius:0.45rem;font-size:0.72rem;font-weight:700;background:linear-gradient(135deg,#a78bfa,#7c3aed);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;gap:0.3rem;transition:all 0.2s}
.mcq-btn-go:hover{opacity:0.9;transform:translateY(-1px)}

.mcq-quiz{max-width:720px;margin:0 auto}
.mcq-quiz-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;gap:0.75rem}
.mcq-step-dots{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;flex:1}
.mcq-dot-step{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.08);transition:all 0.3s}
.mcq-dot-active{background:#a78bfa;box-shadow:0 0 8px rgba(167,139,250,0.5);transform:scale(1.3)}
.mcq-dot-done{background:rgba(16,185,129,0.5)}
.mcq-timer{display:flex;align-items:center;gap:0.35rem;padding:0.35rem 0.75rem;border-radius:2rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);font-family:monospace;font-size:0.85rem;font-weight:700;color:hsl(var(--foreground))}
.mcq-timer-danger{color:#ef4444;border-color:rgba(239,68,68,0.3);animation:timerPulse 1s infinite}
@keyframes timerPulse{0%,100%{opacity:1}50%{opacity:0.6}}
.mcq-quiz-info{display:flex;justify-content:space-between;font-size:0.78rem;color:hsl(var(--muted-foreground));margin-bottom:0.5rem}
.mcq-quiz-cat{font-weight:600}.mcq-quiz-progress{font-weight:700}
.mcq-quiz-bar{height:3px;border-radius:3px;background:rgba(255,255,255,0.06);margin-bottom:1.5rem;overflow:hidden}
.mcq-quiz-bar-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#a78bfa,#06b6d4);transition:width 0.4s ease}
.mcq-q-card{padding:2rem;border-radius:1rem;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);backdrop-filter:blur(12px)}
.mcq-q-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
.mcq-q-diff{font-size:0.7rem;font-weight:700;padding:0.2rem 0.65rem;border-radius:1rem;text-transform:uppercase;letter-spacing:0.04em}
.mcq-diff-easy{background:rgba(16,185,129,0.1);color:#34d399;border:1px solid rgba(16,185,129,0.2)}
.mcq-diff-medium{background:rgba(251,191,36,0.1);color:#fbbf24;border:1px solid rgba(251,191,36,0.2)}
.mcq-diff-hard{background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.2)}
.mcq-q-type{font-size:0.75rem;color:hsl(var(--muted-foreground))}
.mcq-q-text{font-size:1.1rem;font-weight:600;line-height:1.6;margin-bottom:1.5rem}
.mcq-code-block{border-radius:0.75rem;overflow:hidden;margin-bottom:1.5rem;border:1px solid rgba(255,255,255,0.06)}
.mcq-code-header{display:flex;align-items:center;gap:0.5rem;padding:0.6rem 1rem;background:#161b22}
.mcq-code-dot{width:10px;height:10px;border-radius:50%}.mcq-code-dot.r{background:#ff5f57}.mcq-code-dot.y{background:#febc2e}.mcq-code-dot.g{background:#28c840}
.mcq-code-file{margin-left:auto;font-size:0.7rem;color:#8b949e;font-family:monospace}
.mcq-code-body{padding:1rem;background:#0d1117;overflow-x:auto;font-family:monospace;font-size:0.82rem;line-height:1.6;color:#e6edf3}
.mcq-options{display:flex;flex-direction:column;gap:0.6rem}
.mcq-opt{width:100%;display:flex;align-items:center;justify-content:space-between;padding:0.9rem 1.1rem;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:0.65rem;color:hsl(var(--foreground));font-size:0.88rem;cursor:pointer;transition:all 0.2s;font-family:var(--font-sans)}
.mcq-opt:hover:not(:disabled){background:rgba(255,255,255,0.05);border-color:rgba(139,92,246,0.5);box-shadow:0 0 15px rgba(139,92,246,0.15);transform:translateX(4px)}
.mcq-opt-picked{border-color:rgba(124,58,237,0.5) !important;background:rgba(124,58,237,0.08) !important;box-shadow:0 0 15px rgba(124,58,237,0.1)}
.mcq-opt-correct{border-color:rgba(16,185,129,0.5) !important;background:rgba(16,185,129,0.08) !important;color:#10b981 !important}
.mcq-opt-wrong{border-color:rgba(239,68,68,0.5) !important;background:rgba(239,68,68,0.08) !important;color:#ef4444 !important}
.mcq-opt-dim{opacity:0.4}
.mcq-opt-inner{display:flex;align-items:center;gap:0.75rem}
.mcq-opt-letter{width:1.6rem;height:1.6rem;border-radius:0.35rem;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.78rem;background:rgba(255,255,255,0.06);color:hsl(var(--muted-foreground));transition:all 0.2s;flex-shrink:0}
.mcq-opt-picked .mcq-opt-letter{background:#7c3aed;color:#fff}
.mcq-opt-correct .mcq-opt-letter{background:#10b981;color:#fff}
.mcq-opt-wrong .mcq-opt-letter{background:#ef4444;color:#fff}
.mcq-opt-text{text-align:left;line-height:1.4}
.mcq-insight{margin-top:1.25rem;padding:1rem 1.25rem;border-radius:0.75rem;background:rgba(124,58,237,0.05);border:1px solid rgba(124,58,237,0.15)}
.mcq-insight-head{display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;font-weight:700;color:#a78bfa;margin-bottom:0.5rem}
.mcq-insight p{font-size:0.82rem;color:hsl(var(--foreground)/0.85);line-height:1.6}
.mcq-q-footer{margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid rgba(255,255,255,0.06);display:flex;justify-content:flex-end}
.mcq-btn-check,.mcq-btn-next{display:inline-flex;align-items:center;gap:0.4rem;padding:0.6rem 1.5rem;border-radius:0.6rem;font-size:0.82rem;font-weight:700;border:none;cursor:pointer;transition:all 0.2s}
.mcq-btn-check{background:linear-gradient(135deg,#a78bfa,#7c3aed);color:#fff}
.mcq-btn-check:disabled{opacity:0.35;cursor:not-allowed}
.mcq-btn-check:not(:disabled):hover,.mcq-btn-next:hover{transform:translateY(-1px);opacity:0.9}
.mcq-btn-next{background:linear-gradient(135deg,#06b6d4,#0891b2);color:#fff}

.mcq-results{max-width:720px;margin:0 auto}
.mcq-results-card{text-align:center;padding:2.5rem 2rem;border-radius:1rem;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);margin-bottom:2rem}
.mcq-score-visual{position:relative;width:130px;height:130px;margin:0 auto 1.5rem}
.mcq-score-ring{width:100%;height:100%;transform:rotate(-90deg)}
.mcq-score-center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:2px}
.mcq-score-num{font-size:2.2rem;font-weight:800;background:linear-gradient(135deg,#a78bfa,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.mcq-score-den{font-size:0.9rem;color:hsl(var(--muted-foreground));font-weight:600}
.mcq-results-title{font-size:1.5rem;font-weight:800;margin-bottom:0.75rem}
.mcq-eval{max-width:380px;margin:0 auto 1.5rem}.mcq-eval strong{font-size:1rem}.mcq-eval p{font-size:0.8rem;color:hsl(var(--muted-foreground));margin-top:0.25rem}
.text-green{color:#10b981}.text-indigo{color:#818cf8}.text-yellow{color:#fbbf24}.text-red{color:#ef4444}
.mcq-stats-row{display:flex;justify-content:center;gap:2rem;padding:1rem 1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);max-width:360px;margin:0 auto 1.5rem}
.mcq-stat-box{text-align:center}.mcq-stat-v{display:block;font-size:1.25rem;font-weight:800}.mcq-stat-l{font-size:0.68rem;color:hsl(var(--muted-foreground));text-transform:uppercase}
.mcq-results-btns{display:flex;gap:0.6rem;justify-content:center;flex-wrap:wrap}
.mcq-review{margin-top:1rem}.mcq-review-title{display:flex;align-items:center;gap:0.5rem;font-size:1.1rem;font-weight:700;margin-bottom:1rem;color:#a78bfa}
.mcq-rev-item{border-radius:0.65rem;overflow:hidden;margin-bottom:0.5rem;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02)}
.mcq-rev-ok{border-left:3px solid #10b981}.mcq-rev-fail{border-left:3px solid #ef4444}
.mcq-rev-head{display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;cursor:pointer;transition:background 0.2s}
.mcq-rev-head:hover{background:rgba(255,255,255,0.03)}
.mcq-rev-left{display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;font-weight:600;flex:1;min-width:0}
.mcq-rev-left span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mcq-rev-body{padding:1rem;border-top:1px solid rgba(255,255,255,0.04);overflow:hidden}
.mcq-rev-q{font-size:0.82rem;font-weight:600;margin-bottom:0.75rem}
.mcq-rev-code{font-family:monospace;font-size:0.75rem;padding:0.75rem;border-radius:0.5rem;background:#0d1117;color:#a5d6ff;overflow-x:auto;margin-bottom:0.75rem}
.mcq-rev-opts{display:grid;grid-template-columns:1fr 1fr;gap:0.4rem;margin-bottom:0.75rem}
.mcq-rev-opt{padding:0.5rem 0.6rem;border-radius:0.4rem;font-size:0.75rem;background:rgba(255,255,255,0.03);color:hsl(var(--muted-foreground));border:1px solid transparent}
.mcq-rev-opt-right{background:rgba(16,185,129,0.1);color:#10b981;border-color:rgba(16,185,129,0.2)}
.mcq-rev-opt-wrong{background:rgba(239,68,68,0.1);color:#ef4444;border-color:rgba(239,68,68,0.2)}
.mcq-rev-explain{font-size:0.78rem;padding:0.75rem;border-radius:0.5rem;background:rgba(124,58,237,0.05);border:1px solid rgba(124,58,237,0.12);color:hsl(var(--foreground)/0.85);line-height:1.55;display:flex;gap:0.4rem;align-items:flex-start}
.mcq-rev-explain span{flex:1}
      `}</style>
    </div>
  );
}
