import React, { useState } from 'react';
import { motion } from 'framer-motion';
import loginBg from '../assets/login_bg_premium.png';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight,
  ShieldAlert,
  Sun,
  Moon
} from 'lucide-react';

export default function Login({ onLoginSuccess, studentsList, theme, setTheme }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTheme = () => {
    if (setTheme) {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      setErrorMsg('Please enter both username/UserID and password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // 1. Check Admin Credentials
      if (trimmedUser === 'admin' && trimmedPass === 'Mugesh#') {
        const adminUser = { userID: 'admin', role: 'admin' };
        localStorage.setItem('wingora_active_user', JSON.stringify(adminUser));
        setIsSubmitting(false);
        onLoginSuccess(adminUser);
        return;
      }

      // 2. Check Student Credentials
      const matchedStudent = studentsList.find(
        student => student.userID === trimmedUser && student.password === trimmedPass
      );

      if (matchedStudent) {
        const studentUser = { userID: matchedStudent.userID, role: 'student' };
        localStorage.setItem('wingora_active_user', JSON.stringify(studentUser));
        setIsSubmitting(false);
        onLoginSuccess(studentUser);
      } else {
        setIsSubmitting(false);
        setErrorMsg('Invalid UserID or password. Please try again.');
      }
    }, 1000);
  };

  return (
    <div className="login-screen-wrapper">
      {theme && setTheme && (
        <button onClick={toggleTheme} className="login-theme-toggle glass-panel" title="Toggle Theme">
          {theme === 'dark' ? <Sun size={18} className="text-yellow" /> : <Moon size={18} className="text-blue" />}
        </button>
      )}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="login-card-container glass-panel"
      >
        {/* Logo and Brand */}
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <h1 className="brand-title">wingora<span className="brand-sub">LMS</span></h1>
          <p className="brand-tagline">Learning Management System</p>
        </div>

        {/* Error Alert Panel */}
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="error-alert-box mb-6"
          >
            <AlertCircle size={16} className="text-red flex-shrink-0" />
            <span className="text-xs text-red-foreground">{errorMsg}</span>
          </motion.div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="login-form flex flex-col gap-5">
          <div className="input-group" style={{ marginBottom: '0.75rem' }}>
            <label className="input-label">Username / UserID</label>
            <div className="input-field-wrapper">
              <User size={18} className="field-icon" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin or student ID"
                className="login-input"
                disabled={isSubmitting}
                autoFocus
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-field-wrapper">
              <Lock size={18} className="field-icon" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="login-input pr-10"
                disabled={isSubmitting}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary login-submit-btn mt-4 justify-center"
          >
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </motion.div>

      <style>{`
        .login-screen-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(8, 9, 15, 0.94), rgba(17, 14, 38, 0.9)), url(${loginBg}) center/cover no-repeat;
          padding: 1.5rem;
        }

        .login-card-container {
          position: relative;
          z-index: 2;
        }

        .login-theme-toggle {
          z-index: 10 !important;
        }

        .login-theme-toggle {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: rgba(13, 17, 28, 0.6);
          border: 1px solid hsl(var(--card-border) / 0.5);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: var(--transition);
          z-index: 10;
        }

        .login-theme-toggle:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .login-theme-toggle:active {
          transform: scale(0.95);
        }

        .login-card-container {
          width: 100%;
          max-width: 420px;
          padding: 2.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          border: 1px solid hsl(var(--card-border) / 0.5);
          background: rgba(13, 17, 28, 0.6);
        }

        /* Light Mode Styles for Login Page */
        [data-theme='light'] .login-screen-wrapper {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(244, 245, 249, 0.84)), url(${loginBg}) center/cover no-repeat;
        }

        [data-theme='light'] .login-theme-toggle {
          background: rgba(255, 255, 255, 0.7);
          border-color: hsl(var(--card-border) / 0.8);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        [data-theme='light'] .login-card-container {
          background: rgba(255, 255, 255, 0.7);
          border-color: hsl(var(--card-border) / 0.8);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
        }

        [data-theme='light'] .login-input {
          background: rgba(255, 255, 255, 0.8);
          border-color: hsl(var(--card-border) / 1);
          color: hsl(var(--foreground));
        }

        [data-theme='light'] .login-input:focus {
          background: #ffffff;
          border-color: hsl(var(--primary));
          box-shadow: 0 0 15px hsl(var(--primary) / 0.15);
        }

        [data-theme='light'] .brand-title {
          color: hsl(var(--foreground));
        }

        .text-yellow {
          color: #eab308;
        }

        .text-blue {
          color: #3b82f6;
        }

        .brand-logo-circle {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.5));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px hsl(var(--primary) / 0.4);
        }

        .brand-title {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: hsl(var(--foreground));
          margin-top: 0.5rem;
        }

        .brand-sub {
          color: hsl(var(--primary));
          font-weight: 500;
          font-size: 1.25rem;
          margin-left: 0.15rem;
        }

        .brand-tagline {
          font-size: 0.8rem;
          color: hsl(var(--muted-foreground));
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-top: 0.25rem;
        }

        .error-alert-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 0.75rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: hsl(var(--muted-foreground));
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .input-field-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 1rem;
          color: hsl(var(--muted-foreground));
          pointer-events: none;
        }

        .login-input {
          width: 100%;
          background: rgba(9, 13, 20, 0.6);
          border: 1px solid hsl(var(--card-border) / 0.7);
          border-radius: 0.75rem;
          padding: 0.85rem 1rem 0.85rem 2.75rem;
          color: hsl(var(--foreground));
          font-family: var(--font-sans);
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition);
        }

        .login-input:focus {
          border-color: hsl(var(--primary));
          background: rgba(9, 13, 20, 0.9);
          box-shadow: 0 0 15px hsl(var(--primary) / 0.2);
        }

        .password-toggle-btn {
          position: absolute;
          right: 1rem;
          background: transparent;
          border: none;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
        }

        .password-toggle-btn:hover {
          color: hsl(var(--foreground));
        }

        .login-submit-btn {
          width: 100%;
          padding: 0.95rem;
          font-size: 1rem;
          margin-top: 1.5rem;
        }

        .spinner {
          display: inline-block;
          width: 1.25rem;
          height: 1.25rem;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
