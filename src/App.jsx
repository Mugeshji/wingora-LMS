import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import InitialLoader from './components/InitialLoader';
import RefreshLoader from './components/RefreshLoader';
import LoginTransition from './components/LoginTransition';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import JavaFundamentals from './pages/JavaFundamentals';
import OOPsConcepts from './pages/OOPsConcepts';
import DSALeetcode from './pages/DSALeetcode';
import AIInterview from './pages/AIInterview';
import MCQQuiz from './pages/MCQQuiz';
import AIResume from './pages/AIResume';
import TcsChallenge from './pages/TcsChallenge';
import TcsAptitude from './pages/TcsAptitude';
import Login from './pages/Login';
import ManageStudents from './pages/ManageStudents';

export default function App() {
  const [activeUser, setActiveUser] = useState(() => {
    const saved = localStorage.getItem('wingora_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [studentsList, setStudentsList] = useState(() => {
    const saved = localStorage.getItem('wingora_students');
    return saved ? JSON.parse(saved) : [{ userID: 'TC0001', password: 'Nithya123' }];
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState(() => localStorage.getItem('wingora_theme') || 'dark');
  // Show boot loader if user is NOT logged in (first visit)
  const [showBootLoader, setShowBootLoader] = useState(() => {
    const saved = localStorage.getItem('wingora_active_user');
    return !saved;
  });
  // Show panda refresh loader if user IS already logged in (page refresh)
  const [showRefreshLoader, setShowRefreshLoader] = useState(() => {
    const saved = localStorage.getItem('wingora_active_user');
    return !!saved;
  });
  const [loginTransition, setLoginTransition] = useState(null);

  const handleBootComplete = useCallback(() => {
    setShowBootLoader(false);
  }, []);

  const handleRefreshComplete = useCallback(() => {
    setShowRefreshLoader(false);
  }, []);

  // Resolve display name from user object
  const getDisplayName = useCallback((user) => {
    if (!user) return 'Student';
    if (user.role === 'admin') return 'Admin';
    if (user.userID?.toUpperCase() === 'TC0001') return 'Nithya';
    try {
      const students = JSON.parse(localStorage.getItem('wingora_students') || '[]');
      const match = students.find(s => s.userID === user.userID);
      if (match?.password) return match.password.replace(/123/g, '');
    } catch (e) {}
    return user.userID || 'Student';
  }, []);

  // Handle login with transition animation
  const handleLogin = useCallback((user) => {
    const displayName = getDisplayName(user);
    setLoginTransition({ user, displayName });
  }, [getDisplayName]);
  
  const userSuffix = activeUser?.userID ? `_${activeUser.userID}` : '';

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('wingora_active_user');
      const parsed = saved ? JSON.parse(saved) : null;
      const suffix = parsed?.userID ? `_${parsed.userID}` : '';
      const savedBms = localStorage.getItem(`wingora_bookmarks${suffix}`) ||
                       localStorage.getItem('wingora_bookmarks');
      return savedBms ? JSON.parse(savedBms) : [];
    } catch (e) {
      return [];
    }
  });
  
  // Navigation payload for jumping from global search to specific questions
  const [navigationPayload, setNavigationPayload] = useState(null);

  // Sync theme changes with localStorage
  useEffect(() => {
    localStorage.setItem('wingora_theme', theme);
  }, [theme]);

  // Sync bookmarks state when bookmarks change
  useEffect(() => {
    localStorage.setItem(`wingora_bookmarks${userSuffix}`, JSON.stringify(bookmarks));
    localStorage.setItem('wingora_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks, userSuffix]);

  // Sync bookmarks from storage when activeUser changes
  useEffect(() => {
    const savedBms = localStorage.getItem(`wingora_bookmarks${userSuffix}`) ||
                     localStorage.getItem('wingora_bookmarks');
    setBookmarks(savedBms ? JSON.parse(savedBms) : []);
  }, [activeUser, userSuffix]);

  // Sync students list with localStorage
  const handleAddStudent = (student) => {
    const updated = [...studentsList, student];
    setStudentsList(updated);
    localStorage.setItem('wingora_students', JSON.stringify(updated));
  };

  const handleDeleteStudent = (userID) => {
    const updated = studentsList.filter(s => s.userID !== userID);
    setStudentsList(updated);
    localStorage.setItem('wingora_students', JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem('wingora_active_user');
    setActiveUser(null);
    setActiveTab('dashboard');
  };

  // Page switcher rendering logic
  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            setActiveTab={setActiveTab} 
            setNavigationPayload={setNavigationPayload}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        );
      case 'tcs_challenge':
        return <TcsChallenge activeUser={activeUser} />;
      case 'tcs_aptitude':
        return <TcsAptitude />;
      case 'students':
        return (
          <ManageStudents 
            studentsList={studentsList}
            onAddStudent={handleAddStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        );
      case 'java':
        return (
          <JavaFundamentals 
            navigationPayload={navigationPayload}
            setNavigationPayload={setNavigationPayload}
          />
        );
      case 'oops':
        return (
          <OOPsConcepts 
            navigationPayload={navigationPayload}
            setNavigationPayload={setNavigationPayload}
          />
        );
      case 'dsa':
        return (
          <DSALeetcode 
            navigationPayload={navigationPayload}
            setNavigationPayload={setNavigationPayload}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        );
      case 'ai_resume':
        return <AIResume setActiveTab={setActiveTab} />;
      case 'interview':
        return <AIInterview />;
      case 'quiz':
        return <MCQQuiz setActiveTab={setActiveTab} />;
      default:
        return (
          <Dashboard 
            setActiveTab={setActiveTab} 
            setNavigationPayload={setNavigationPayload}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        );
    }
  };

  // Show panda refresh loader when page is refreshed while logged in
  if (showRefreshLoader && activeUser) {
    return <RefreshLoader onComplete={handleRefreshComplete} />;
  }

  // Show terminal boot loader on first visit (not logged in)
  if (showBootLoader && !activeUser) {
    return <InitialLoader onComplete={handleBootComplete} />;
  }

  // Render Login screen if not authenticated
  if (!activeUser && !loginTransition) {
    return <Login onLoginSuccess={handleLogin} studentsList={studentsList} />;
  }

  // Show login-to-dashboard transition
  if (loginTransition && !activeUser) {
    return (
      <LoginTransition
        userName={loginTransition.displayName}
        onComplete={() => {
          setActiveUser(loginTransition.user);
          setLoginTransition(null);
        }}
      />
    );
  }

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
        setTheme={setTheme} 
        bookmarksCount={bookmarks.length}
        activeUser={activeUser}
        onLogout={handleLogout}
      />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ width: '100%', height: '100%' }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
