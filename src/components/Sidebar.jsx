import React, { useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  Code, 
  Sparkles, 
  Sun, 
  Moon,
  GraduationCap,
  Award,
  Flame,
  Users,
  LogOut,
  FileText
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, theme, setTheme, bookmarksCount, activeUser, onLogout }) {
  
  useEffect(() => {
    // Sync theme with document element
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  // Only show Manage Students tab if activeUser is admin
  if (activeUser?.role === 'admin') {
    navItems.push({ id: 'students', label: 'Manage Students', icon: Users });
  }

  navItems.push(
    { id: 'tcs_challenge', label: 'TCS 75-Day Coding', icon: Flame },
    { id: 'tcs_aptitude', label: 'TCS Aptitude & Logic', icon: GraduationCap },
    { id: 'java', label: 'Core Java', icon: BookOpen },
    { id: 'oops', label: 'OOPs Concepts', icon: Layers },
    { id: 'dsa', label: 'DSA Practice', icon: Code },
    { id: 'interview', label: 'AI Interview', icon: Sparkles },
    { id: 'ai_resume', label: 'AI Resume', icon: FileText },
    { id: 'quiz', label: 'MCQ Quiz', icon: Award }
  );

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <div className="logo-icon-wrapper" title="Wingora LMS Study Favicon">
          <img src="/favicon.svg" alt="Wingora 3D Study Favicon" className="logo-3d-favicon" />
        </div>
        <span className="logo-text">wingora<span className="logo-subtext">LMS</span></span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-button ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" size={20} />
              <span className="nav-label">{item.label}</span>
              {item.id === 'dsa' && bookmarksCount > 0 && (
                <span className="bookmark-pill">{bookmarksCount}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button onClick={toggleTheme} className="theme-toggle-btn glass-panel">
          {theme === 'dark' ? (
            <>
              <Sun size={18} className="theme-icon text-yellow" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={18} className="theme-icon text-blue" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
        <div className="user-profile flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-2 flex-1">
            {(() => {
              const getDisplayName = (id) => {
                if (!id) return 'Student';
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
              const dispName = activeUser?.role === 'admin' ? 'Admin' : getDisplayName(activeUser?.userID);
              return (
                <>
                  <div className="avatar">
                    {dispName.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <span className="user-name">{dispName}</span>
                    <span className="user-role">{activeUser?.role === 'admin' ? 'Administrator' : 'Student'}</span>
                  </div>
                </>
              );
            })()}
          </div>
          <button 
            onClick={onLogout} 
            className="logout-btn" 
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .sidebar-container {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 280px;
          background: var(--card-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid hsl(var(--card-border) / 0.4);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1.25rem;
          z-index: 100;
          transition: var(--transition);
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          padding: 0 0.5rem;
        }

        .logo-icon-wrapper {
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.6));
          width: 2.65rem;
          height: 2.65rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          box-shadow: 0 4px 12px hsl(var(--primary) / 0.3);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          cursor: pointer;
        }

        .sidebar-logo:hover .logo-icon-wrapper {
          transform: scale(1.15) rotate(6deg);
          box-shadow: 0 0 20px hsl(var(--primary) / 0.6);
        }

        .sidebar-logo:active .logo-icon-wrapper {
          transform: scale(0.92) rotate(-4deg);
        }

        .logo-3d-favicon {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.4s ease;
        }

        .sidebar-logo:hover .logo-3d-favicon {
          transform: scale(1.08);
        }

        .logo-text {
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: hsl(var(--foreground));
        }

        .logo-subtext {
          color: hsl(var(--primary));
          font-weight: 500;
          font-size: 0.95rem;
          margin-left: 0.15rem;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
          padding-right: 0.15rem;
          margin-bottom: 1rem;
        }

        .sidebar-nav::-webkit-scrollbar {
          display: none;
        }

        .nav-button {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 1rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 0.75rem;
          color: hsl(var(--muted-foreground));
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          text-align: left;
          width: 100%;
          position: relative;
          transition: var(--transition);
        }

        .nav-button:hover {
          color: hsl(var(--foreground));
          background: hsl(var(--secondary) / 0.4);
          border-color: hsl(var(--card-border) / 0.5);
        }

        .nav-button.active {
          color: white;
          background: hsl(var(--primary));
          box-shadow: 0 4px 15px hsl(var(--primary) / 0.3), var(--primary-glow);
          border-color: hsl(var(--primary) / 0.4);
        }

        .nav-icon {
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .nav-button:hover .nav-icon {
          transform: scale(1.08);
        }

        .bookmark-pill {
          background: white;
          color: hsl(var(--primary));
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.1rem 0.5rem;
          border-radius: 9999px;
          margin-left: auto;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .nav-button.active .bookmark-pill {
          background: white;
          color: hsl(var(--primary));
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-top: 1.5rem;
          border-top: 1px solid hsl(var(--card-border) / 0.4);
        }

        .theme-toggle-btn {
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--card-glass);
          border: 1px solid hsl(var(--card-border) / 0.4);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          cursor: pointer;
          color: hsl(var(--foreground));
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 0.9rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          transition: var(--transition);
        }

        .theme-toggle-btn:hover {
          background: hsl(var(--secondary) / 0.6);
          border-color: hsl(var(--primary) / 0.2);
          transform: translateY(-1px);
        }

        .theme-icon.text-yellow {
          color: #eab308;
        }

        .theme-icon.text-blue {
          color: #3b82f6;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.25rem;
        }

        .avatar {
          width: 2.25rem;
          height: 2.25rem;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.95rem;
          box-shadow: 0 4px 10px rgba(124, 58, 237, 0.2);
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: hsl(var(--foreground));
        }

        .user-role {
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
        }

        .logout-btn {
          background: transparent;
          border: none;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 0.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .logout-btn:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.15);
        }

        @media (max-width: 1024px) {
          .sidebar-container {
            width: 80px;
            padding: 2rem 0.75rem;
          }
          
          .logo-text, .nav-label, .user-info, .theme-toggle-btn span {
            display: none;
          }

          .logo-icon-wrapper {
            margin: 0 auto;
          }

          .logo-logo {
            margin-bottom: 2rem;
          }

          .nav-button {
            justify-content: center;
            padding: 0.85rem;
          }

          .nav-icon {
            margin: 0;
          }

          .bookmark-pill {
            position: absolute;
            top: 0.2rem;
            right: 0.2rem;
            margin: 0;
            font-size: 0.65rem;
            padding: 0.05rem 0.35rem;
          }

          .theme-toggle-btn {
            justify-content: center;
            padding: 0.75rem;
          }

          .user-profile {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .sidebar-container {
            flex-direction: row;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 64px;
            padding: 0.5rem 1rem;
            justify-content: space-around;
            align-items: center;
            border-right: none;
            border-top: 1px solid hsl(var(--card-border) / 0.4);
            border-radius: var(--radius) var(--radius) 0 0;
          }

          .sidebar-logo, .sidebar-footer, .bookmark-pill {
            display: none;
          }

          .sidebar-nav {
            flex-direction: row;
            width: 100%;
            justify-content: space-around;
            gap: 0;
          }

          .nav-button {
            padding: 0.5rem;
            width: auto;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
