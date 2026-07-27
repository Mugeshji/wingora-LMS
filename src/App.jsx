import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import JavaFundamentals from './pages/JavaFundamentals';
import OOPsConcepts from './pages/OOPsConcepts';
import DSALeetcode from './pages/DSALeetcode';
import AIInterview from './pages/AIInterview';
import MCQQuiz from './pages/MCQQuiz';
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
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem('wingora_bookmarks') || '[]'));
  
  // Navigation payload for jumping from global search to specific questions
  const [navigationPayload, setNavigationPayload] = useState(null);

  // Sync theme changes with localStorage
  useEffect(() => {
    localStorage.setItem('wingora_theme', theme);
  }, [theme]);

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

  // Render Login screen if not authenticated
  if (!activeUser) {
    return <Login onLoginSuccess={setActiveUser} studentsList={studentsList} />;
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
