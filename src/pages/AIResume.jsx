import React, { useState, useRef, useCallback } from 'react';
import { FileText, Upload, CheckCircle, Search, Mail, ArrowRight, ArrowLeft, Briefcase, MapPin, User, ExternalLink, Zap, TrendingUp, Download, RefreshCw, Home, Sparkles } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { extractTextFromPDF, analyzeResume, extractSkills } from '../utils/resumeParser';
import { searchJobs, calculateSkillMatch, getSkillBreakdown, getCachedJobs, setCachedJobs } from '../utils/jobSearchApi';
import { sendJobAlertEmail, saveEmailPreferences } from '../utils/emailService';
import STYLES from './AIResumeStyles';

const ROLES = [
  { label: 'Frontend Developer' }, { label: 'Backend Developer' }, { label: 'Fullstack Developer' },
  { label: 'DevOps Engineer' }, { label: 'Data Scientist' }, { label: 'Mobile Developer' },
  { label: 'QA / Testing' }, { label: 'Mechanical Engineer' }, { label: 'Electrical Engineer' },
  { label: 'Civil Engineer' }, { label: 'Marketing' }, { label: 'HR' }, { label: 'Finance' },
];

const LOCATIONS = ['Bangalore', 'Chennai', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi/NCR', 'Noida', 'Kolkata', 'Remote'];

// Generate an optimized ATS-friendly resume text based on analysis
function generateOptimizedResume(originalText, atsResult, skills) {
  const lines = originalText.split('\n').filter(l => l.trim());
  const hasSection = (name) => originalText.toLowerCase().includes(name);
  let optimized = '';

  // Header area - keep first few lines (likely name/contact)
  const headerLines = lines.slice(0, Math.min(4, lines.length));
  optimized += headerLines.join('\n') + '\n';

  // Add LinkedIn if missing
  const contactCat = atsResult.categories.find(c => c.name === 'Contact Information');
  if (contactCat && !contactCat.details.linkedin) {
    optimized += 'LinkedIn: linkedin.com/in/your-profile\n';
  }
  if (contactCat && !contactCat.details.portfolio) {
    optimized += 'GitHub: github.com/your-username\n';
  }
  optimized += '\n';

  // Professional Summary
  if (!hasSection('summary') && !hasSection('objective') && !hasSection('profile')) {
    optimized += '═══════════════════════════════════════\n';
    optimized += 'PROFESSIONAL SUMMARY\n';
    optimized += '═══════════════════════════════════════\n';
    optimized += `Results-driven professional with expertise in ${skills.slice(0, 4).join(', ')}. `;
    optimized += 'Passionate about delivering high-quality solutions and driving measurable impact. ';
    optimized += 'Seeking to leverage technical skills and problem-solving abilities in a challenging role.\n\n';
  }

  // Skills Section (enhanced)
  if (skills.length > 0) {
    optimized += '═══════════════════════════════════════\n';
    optimized += 'TECHNICAL SKILLS\n';
    optimized += '═══════════════════════════════════════\n';
    skills.forEach(s => { optimized += `• ${s.charAt(0).toUpperCase() + s.slice(1)}\n`; });
    optimized += '\n';
  }

  // Keep original content but structured
  const skipHeader = lines.slice(4);
  if (skipHeader.length > 0) {
    optimized += '═══════════════════════════════════════\n';
    optimized += 'EXPERIENCE & DETAILS\n';
    optimized += '═══════════════════════════════════════\n';
    skipHeader.forEach(line => {
      const trimmed = line.trim();
      if (trimmed) optimized += (trimmed.startsWith('•') || trimmed.startsWith('-') ? trimmed : '• ' + trimmed) + '\n';
    });
    optimized += '\n';
  }

  // Add missing sections
  if (!hasSection('education')) {
    optimized += '═══════════════════════════════════════\n';
    optimized += 'EDUCATION\n';
    optimized += '═══════════════════════════════════════\n';
    optimized += '• [Your Degree] — [University Name], [Year]\n\n';
  }

  if (!hasSection('certification')) {
    optimized += '═══════════════════════════════════════\n';
    optimized += 'CERTIFICATIONS\n';
    optimized += '═══════════════════════════════════════\n';
    optimized += '• [Add relevant certifications here]\n\n';
  }

  if (!hasSection('project')) {
    optimized += '═══════════════════════════════════════\n';
    optimized += 'PROJECTS\n';
    optimized += '═══════════════════════════════════════\n';
    optimized += '• [Project Name] — [Brief description with technologies used and measurable impact]\n\n';
  }

  return optimized;
}

export default function AIResume({ setActiveTab }) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [atsResult, setAtsResult] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [userSkills, setUserSkills] = useState([]);
  const [optimizedText, setOptimizedText] = useState('');
  const [optimizing, setOptimizing] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [expType, setExpType] = useState('fresher');
  const [expYears, setExpYears] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [email, setEmail] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileDrop = useCallback((e) => {
    e.preventDefault();
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (f && (f.type === 'application/pdf' || f.name.endsWith('.pdf'))) {
      setFile(f);
      processResume(f);
    }
  }, []);

  const processResume = async (f) => {
    setParsing(true);
    try {
      const text = await extractTextFromPDF(f);
      setResumeText(text);
      const result = analyzeResume(text);
      setAtsResult(result);
      setUserSkills(extractSkills(text));
    } catch (err) {
      console.error(err);
      setAtsResult({ totalScore: 0, categories: [], suggestions: [{ priority: 'high', text: 'Could not parse PDF.' }], skills: [], stats: { wordCount: 0, keywordCount: 0, sectionCount: 0, verbCount: 0 } });
    }
    setParsing(false);
  };

  const handleOptimize = () => {
    setOptimizing(true);
    setTimeout(() => {
      const opt = generateOptimizedResume(resumeText, atsResult, userSkills);
      setOptimizedText(opt);
      setOptimizing(false);
    }, 1500);
  };

  const handleDownload = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 18;
    const usable = pageW - margin * 2;
    let y = margin;

    const addPage = () => { doc.addPage(); y = margin; };
    const checkPage = (need) => { if (y + need > pageH - margin) addPage(); };

    // -- Header accent line --
    doc.setFillColor(124, 58, 237);
    doc.rect(0, 0, pageW, 6, 'F');
    y = 14;

    const lines = optimizedText.split('\n');
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) { y += 3; return; }

      // Section dividers
      if (trimmed.startsWith('══')) return;

      // Section headings (all-caps lines that were headings)
      const isHeading = /^[A-Z][A-Z &\/]+$/.test(trimmed) && trimmed.length < 50;
      if (isHeading) {
        checkPage(14);
        y += 4;
        doc.setFillColor(124, 58, 237);
        doc.rect(margin, y - 1, usable, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(trimmed, margin + 3, y + 4);
        doc.setTextColor(30, 30, 30);
        y += 11;
        return;
      }

      // Name line (first non-empty, non-section line — make it large)
      if (y < 20) {
        checkPage(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(30, 30, 30);
        doc.text(trimmed, margin, y + 5);
        y += 10;
        return;
      }

      // Bullet point lines
      const isBullet = /^[•\-\*▪▸►]/.test(trimmed);
      const content = isBullet ? trimmed.replace(/^[•\-\*▪▸►]\s*/, '') : trimmed;
      doc.setFont('helvetica', isBullet ? 'normal' : 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 50);

      const wrapped = doc.splitTextToSize(content, usable - (isBullet ? 6 : 0));
      checkPage(wrapped.length * 4.5 + 1);

      if (isBullet) {
        doc.setFillColor(124, 58, 237);
        doc.circle(margin + 1.5, y + 1.2, 0.8, 'F');
        doc.text(wrapped, margin + 5, y + 2);
      } else {
        doc.text(wrapped, margin, y + 2);
      }
      y += wrapped.length * 4.5 + 1;
    });

    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(160, 160, 160);
      doc.text('Generated by Wingora LMS — ATS Optimized Resume', margin, pageH - 8);
      doc.text(`Page ${i} of ${totalPages}`, pageW - margin - 20, pageH - 8);
    }

    doc.save('Optimized_ATS_Resume.pdf');
  };

  const handleSearchJobs = async () => {
    const role = selectedRole || customRole;
    if (!role || !selectedLocation || !email) return;
    setLoadingJobs(true);
    setStep(6);
    const cached = getCachedJobs();
    if (cached && cached.length > 0) { setJobs(cached); setLoadingJobs(false); return; }
    const results = await searchJobs({ role, experience: expType === 'fresher' ? 'fresher' : `${expYears}`, location: selectedLocation });
    setJobs(results);
    setCachedJobs(results);
    setLoadingJobs(false);
    saveEmailPreferences({ email, role, location: selectedLocation, expType, expYears });
  };

  const handleSendEmail = async () => {
    setEmailSending(true);
    const role = selectedRole || customRole;
    await sendJobAlertEmail({ toEmail: email, userName: 'Student', jobs, role, location: selectedLocation });
    setEmailSent(true);
    setEmailSending(false);
  };

  const scoreColor = (s) => s >= 75 ? '#10b981' : s >= 50 ? '#f59e0b' : '#ef4444';
  const scoreLabel = (s) => s >= 75 ? 'Excellent' : s >= 50 ? 'Good' : 'Needs Work';

  const STEPS = [{n:1,l:'Upload'},{n:2,l:'ATS Score'},{n:3,l:'Optimize'},{n:4,l:'Job Search?'},{n:5,l:'Job Prefs'},{n:6,l:'Results'}];

  return (
    <div className="ai-resume-page">
      <div className="resume-steps-bar">
        {STEPS.map(s => (
          <div key={s.n} className={`step-dot ${step >= s.n ? 'active' : ''} ${step === s.n ? 'current' : ''}`}>
            <span className="step-num">{s.n}</span>
            <span className="step-label">{s.l}</span>
          </div>
        ))}
      </div>

      {/* STEP 1: Upload */}
      {step === 1 && (
        <div className="resume-section glass-panel animate-fade">
          <div className="section-badge"><FileText size={16}/><span>AI Resume Analyzer</span></div>
          <h1>Upload Your Resume</h1>
          <p className="section-desc">Upload your resume (PDF) and get an instant ATS compatibility score with actionable improvement tips.</p>
          <div className="upload-zone" onDragOver={e => e.preventDefault()} onDrop={handleFileDrop} onClick={() => fileInputRef.current?.click()}>
            <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileDrop} style={{ display: 'none' }} />
            {parsing ? (
              <div className="upload-parsing"><div className="spinner" /><p>Analyzing your resume...</p></div>
            ) : file ? (
              <div className="upload-done"><CheckCircle size={40} className="text-green" /><p>{file.name}</p><span>Click to change file</span></div>
            ) : (
              <div className="upload-prompt"><Upload size={48} className="upload-icon" /><h3>Drag & Drop your Resume PDF</h3><p>or click to browse</p></div>
            )}
          </div>
          {atsResult && (
            <button className="btn-primary" onClick={() => setStep(2)} style={{ marginTop: '1.5rem', alignSelf: 'center' }}>
              <span>View ATS Analysis</span><ArrowRight size={16} />
            </button>
          )}
        </div>
      )}

      {/* STEP 2: ATS Score */}
      {step === 2 && atsResult && (
        <div className="resume-section glass-panel animate-fade">
          <button className="back-btn" onClick={() => setStep(1)}><ArrowLeft size={16} /> Back</button>
          <div className="ats-header">
            <div className="ats-gauge">
              <svg viewBox="0 0 120 120" className="gauge-svg">
                <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--card-border)/0.3)" strokeWidth="10" />
                <circle cx="60" cy="60" r="52" fill="none" stroke={scoreColor(atsResult.totalScore)} strokeWidth="10"
                  strokeDasharray={`${(atsResult.totalScore / 100) * 327} 327`} strokeLinecap="round"
                  transform="rotate(-90 60 60)" style={{ transition: 'stroke-dasharray 1.5s ease' }} />
              </svg>
              <div className="gauge-text">
                <span className="gauge-num" style={{ color: scoreColor(atsResult.totalScore) }}>{atsResult.totalScore}</span>
                <span className="gauge-label">{scoreLabel(atsResult.totalScore)}</span>
              </div>
            </div>
            <div className="ats-summary">
              <h2>ATS Compatibility Score</h2>
              <p>Your resume scored <b style={{ color: scoreColor(atsResult.totalScore) }}>{atsResult.totalScore}/100</b> on ATS compatibility.</p>
              <div className="stats-row">
                <div className="stat-chip"><span>{atsResult.stats.wordCount}</span><small>Words</small></div>
                <div className="stat-chip"><span>{atsResult.stats.keywordCount}</span><small>Keywords</small></div>
                <div className="stat-chip"><span>{atsResult.stats.sectionCount}</span><small>Sections</small></div>
                <div className="stat-chip"><span>{atsResult.stats.verbCount}</span><small>Action Verbs</small></div>
              </div>
            </div>
          </div>

          <div className="category-scores">
            {atsResult.categories.map((cat, i) => (
              <div key={i} className="cat-score-card glass-card">
                <div className="cat-score-header">
                  <span className="cat-icon-text">{cat.icon}</span>
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-pts" style={{ color: cat.color }}>{cat.score}/{cat.maxScore}</span>
                </div>
                <div className="cat-bar-track"><div className="cat-bar-fill" style={{ width: `${(cat.score / cat.maxScore) * 100}%`, background: cat.color }} /></div>
              </div>
            ))}
          </div>

          {atsResult.suggestions.length > 0 && (
            <div className="suggestions-block">
              <h3><Zap size={18} /> Improvement Suggestions</h3>
              <div className="suggestions-list">
                {atsResult.suggestions.map((s, i) => (
                  <div key={i} className={`suggestion-item priority-${s.priority}`}>
                    <span className="priority-dot" /><p>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {userSkills.length > 0 && (
            <div className="skills-block">
              <h3>Detected Skills</h3>
              <div className="skills-tags">{userSkills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}</div>
            </div>
          )}

          <div className="step2-actions">
            <button className="btn-primary" onClick={() => { setStep(3); handleOptimize(); }}>
              <RefreshCw size={16} /><span>Update & Optimize Resume</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Optimized Resume + Download */}
      {step === 3 && (
        <div className="resume-section glass-panel animate-fade">
          <button className="back-btn" onClick={() => setStep(2)}><ArrowLeft size={16} /> Back</button>
          <div className="section-badge"><Sparkles size={16} /><span>Resume Optimizer</span></div>
          <h2>Your ATS-Optimized Resume</h2>
          <p className="section-desc">We've automatically restructured your resume with proper ATS-friendly formatting, added missing sections, and enhanced keywords.</p>

          {optimizing ? (
            <div className="optimizing-block">
              <div className="spinner" />
              <h3>Optimizing your resume...</h3>
              <p>Adding missing sections, restructuring content, enhancing keywords</p>
              <div className="optimize-progress">
                <div className="optimize-bar" />
              </div>
            </div>
          ) : (
            <>
              <div className="optimized-changes glass-card">
                <h3>✨ What we improved:</h3>
                <div className="change-list">
                  {!resumeText.toLowerCase().includes('summary') && <div className="change-item"><CheckCircle size={14} className="text-green" /><span>Added Professional Summary section</span></div>}
                  {!resumeText.toLowerCase().includes('linkedin') && <div className="change-item"><CheckCircle size={14} className="text-green" /><span>Added LinkedIn profile placeholder</span></div>}
                  {!resumeText.toLowerCase().includes('github') && <div className="change-item"><CheckCircle size={14} className="text-green" /><span>Added GitHub/Portfolio placeholder</span></div>}
                  <div className="change-item"><CheckCircle size={14} className="text-green" /><span>Organized skills into a dedicated section</span></div>
                  <div className="change-item"><CheckCircle size={14} className="text-green" /><span>Added bullet points for better ATS parsing</span></div>
                  {!resumeText.toLowerCase().includes('project') && <div className="change-item"><CheckCircle size={14} className="text-green" /><span>Added Projects section template</span></div>}
                  {!resumeText.toLowerCase().includes('certification') && <div className="change-item"><CheckCircle size={14} className="text-green" /><span>Added Certifications section template</span></div>}
                </div>
              </div>

              <div className="resume-preview glass-card">
                <div className="preview-header">
                  <span>📄 Optimized Resume Preview</span>
                </div>
                <pre className="preview-content">{optimizedText}</pre>
              </div>

              <div className="download-section">
                <button className="btn-primary download-btn" onClick={handleDownload}>
                  <Download size={18} /><span>Download Optimized Resume</span>
                </button>
                <p className="download-hint">Downloads as a professionally formatted PDF — ready to submit directly!</p>
              </div>

              <div className="next-step-prompt">
                <button className="btn-primary" onClick={() => setStep(4)}>
                  <span>Continue</span><ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* STEP 4: Looking for Job? */}
      {step === 4 && (
        <div className="resume-section glass-panel animate-fade">
          <button className="back-btn" onClick={() => setStep(3)}><ArrowLeft size={16} /> Back</button>
          <div className="job-decision-block">
            <div className="decision-icon">🎯</div>
            <h1>Are you looking for a job?</h1>
            <p className="section-desc" style={{ textAlign: 'center' }}>
              We can find the top 10 matching job opportunities posted today and send you daily alerts at 8:00 AM.
            </p>
            <div className="decision-buttons">
              <button className="decision-btn decision-yes" onClick={() => setStep(5)}>
                <Search size={22} />
                <span className="decision-title">Yes, Find Jobs!</span>
                <span className="decision-sub">Search matching opportunities</span>
              </button>
              <button className="decision-btn decision-no" onClick={() => setActiveTab('dashboard')}>
                <Home size={22} />
                <span className="decision-title">Not Now</span>
                <span className="decision-sub">Go back to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Job Preferences */}
      {step === 5 && (
        <div className="resume-section glass-panel animate-fade">
          <button className="back-btn" onClick={() => setStep(4)}><ArrowLeft size={16} /> Back</button>
          <div className="section-badge"><Briefcase size={16} /><span>Job Preferences</span></div>
          <h2>Tell us what you're looking for</h2>

          <div className="pref-form">
            <div className="form-group">
              <label><User size={14} /> Which role do you want?</label>
              <div className="role-grid">
                {ROLES.map(r => (
                  <button key={r.label} className={`role-chip ${selectedRole === r.label ? 'selected' : ''}`}
                    onClick={() => { setSelectedRole(r.label); setCustomRole(''); }}>{r.label}</button>
                ))}
              </div>
              <input className="glass-input" placeholder="Or type a custom role..." value={customRole}
                onChange={e => { setCustomRole(e.target.value); setSelectedRole(''); }} />
            </div>

            <div className="form-group">
              <label><Briefcase size={14} /> Experience Level</label>
              <div className="exp-toggle">
                <button className={`exp-btn ${expType === 'fresher' ? 'selected' : ''}`} onClick={() => setExpType('fresher')}>Fresher</button>
                <button className={`exp-btn ${expType === 'experienced' ? 'selected' : ''}`} onClick={() => setExpType('experienced')}>Experienced</button>
              </div>
              {expType === 'experienced' && (
                <div className="year-slider">
                  <input type="range" min="1" max="15" value={expYears} onChange={e => setExpYears(Number(e.target.value))} />
                  <span className="year-display">{expYears} year{expYears > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label><MapPin size={14} /> Preferred Location</label>
              <div className="loc-grid">
                {LOCATIONS.map(l => (
                  <button key={l} className={`loc-chip ${selectedLocation === l ? 'selected' : ''}`}
                    onClick={() => setSelectedLocation(l)}>{l}</button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label><Mail size={14} /> Your Email (for daily alerts)</label>
              <input className="glass-input" type="email" placeholder="your@email.com" value={email}
                onChange={e => setEmail(e.target.value)} />
            </div>

            <button className="btn-primary search-jobs-btn" onClick={handleSearchJobs}
              disabled={!(selectedRole || customRole) || !selectedLocation || !email}>
              <Search size={16} /><span>Find Top 10 Jobs</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Job Results */}
      {step === 6 && (
        <div className="resume-section glass-panel animate-fade">
          <button className="back-btn" onClick={() => setStep(5)}><ArrowLeft size={16} /> Back</button>
          <div className="section-badge"><TrendingUp size={16} /><span>Today's Top Matches</span></div>
          <h2>Top 10 Job Opportunities</h2>
          <p className="section-desc">Fresh jobs posted today matching your profile. Results refresh daily — no repeats!</p>

          {loadingJobs ? (
            <div className="loading-jobs"><div className="spinner" /><p>Searching across job boards...</p></div>
          ) : (
            <>
              <div className="jobs-grid">
                {jobs.map((job, i) => {
                  const match = calculateSkillMatch(userSkills, job.requiredSkills);
                  const { matched, missing } = getSkillBreakdown(userSkills, job.requiredSkills);
                  return (
                    <div key={job.id} className="job-card glass-card">
                      <div className="job-card-top">
                        <div className="job-rank">#{i + 1}</div>
                        <div className="job-info">
                          <h3>{job.title}</h3>
                          <p className="job-company">{job.company}</p>
                          <div className="job-meta">
                            <span><MapPin size={12} /> {job.location}</span>
                            <span>{job.employmentType}</span>
                            {job.salary && <span className="job-salary">{job.salary}</span>}
                          </div>
                        </div>
                        <div className="match-circle" style={{ borderColor: match >= 70 ? '#10b981' : match >= 40 ? '#f59e0b' : '#ef4444' }}>
                          <span style={{ color: match >= 70 ? '#10b981' : match >= 40 ? '#f59e0b' : '#ef4444' }}>{match}%</span>
                          <small>Match</small>
                        </div>
                      </div>
                      <div className="job-skills-section">
                        {matched.length > 0 && (
                          <div className="skill-row"><small className="text-green">✓ Matched:</small>
                            <div className="skill-tags-sm">{matched.map((s, j) => <span key={j} className="tag-match">{s}</span>)}</div>
                          </div>
                        )}
                        {missing.length > 0 && (
                          <div className="skill-row"><small className="text-red">✗ Missing:</small>
                            <div className="skill-tags-sm">{missing.map((s, j) => <span key={j} className="tag-miss">{s}</span>)}</div>
                          </div>
                        )}
                      </div>
                      <div className="job-card-bottom">
                        <span className="posted-date">Posted: {job.postedDate}</span>
                        <span className="job-source">via {job.source}</span>
                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="apply-btn">
                          <ExternalLink size={14} /> Apply Now
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="email-alert-section glass-card">
                <div className="email-alert-content">
                  <Mail size={24} className="text-purple" />
                  <div>
                    <h3>Get Daily Job Alerts at 8:00 AM</h3>
                    <p>Receive top 10 fresh jobs every morning to <b>{email}</b></p>
                  </div>
                </div>
                {emailSent ? (
                  <div className="email-confirmed"><CheckCircle size={18} className="text-green" /><span>Alert subscription active!</span></div>
                ) : (
                  <button className="btn-primary" onClick={handleSendEmail} disabled={emailSending}>
                    {emailSending ? 'Sending...' : 'Subscribe to Daily Alerts'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <style>{STYLES}</style>
    </div>
  );
}
