import React, { useState, useRef, useCallback } from 'react';
import { FileText, Upload, CheckCircle, Search, Mail, ArrowRight, ArrowLeft, Briefcase, MapPin, User, ExternalLink, Zap, TrendingUp, Download, RefreshCw, Home, Sparkles, LayoutTemplate } from 'lucide-react';
import { extractTextFromPDF, analyzeResume, extractSkills } from '../utils/resumeParser';
import { searchJobs, calculateSkillMatch, getSkillBreakdown, getCachedJobs, setCachedJobs } from '../utils/jobSearchApi';
import { sendJobAlertEmail, saveEmailPreferences } from '../utils/emailService';
import { TEMPLATE_LIST, detectExperienceYears } from '../utils/resumeTemplateConfigs';
import { generateProfessionalPDF } from '../utils/resumePdfRenderer';
import { getTemplateSVG } from '../utils/templateThumbnails';
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
  let optimized = '';

  // Header area - keep first few lines (likely name/contact)
  const headerLines = lines.slice(0, Math.min(4, lines.length));
  optimized += headerLines.join('\n') + '\n\n';

  // Parse the document into structured sections
  const data = parseStructuredResume(originalText);

  if (data.summary) {
    optimized += 'PROFESSIONAL SUMMARY\n';
    optimized += '═══════════════════════════════════════\n';
    optimized += data.summary.trim() + '\n\n';
  }

  const detectedSkills = data.skills && data.skills.length > 0 ? data.skills : skills;
  if (detectedSkills && detectedSkills.length > 0) {
    optimized += 'TECHNICAL SKILLS\n';
    optimized += '═══════════════════════════════════════\n';
    detectedSkills.forEach(s => {
      const cleanSkill = s.trim();
      if (cleanSkill) {
        optimized += `• ${cleanSkill.charAt(0).toUpperCase() + cleanSkill.slice(1)}\n`;
      }
    });
    optimized += '\n';
  }

  if (data.experience && data.experience.length > 0) {
    optimized += 'EXPERIENCE\n';
    optimized += '═══════════════════════════════════════\n';
    data.experience.forEach(line => {
      const trimmed = line.trim();
      if (trimmed) optimized += (trimmed.startsWith('•') || trimmed.startsWith('-') ? trimmed : '• ' + trimmed) + '\n';
    });
    optimized += '\n';
  }

  if (data.projects && data.projects.length > 0) {
    optimized += 'PROJECTS\n';
    optimized += '═══════════════════════════════════════\n';
    data.projects.forEach(line => {
      const trimmed = line.trim();
      if (trimmed) optimized += (trimmed.startsWith('•') || trimmed.startsWith('-') ? trimmed : '• ' + trimmed) + '\n';
    });
    optimized += '\n';
  }

  if (data.education && data.education.length > 0) {
    optimized += 'EDUCATION\n';
    optimized += '═══════════════════════════════════════\n';
    data.education.forEach(line => {
      const trimmed = line.trim();
      if (trimmed) optimized += (trimmed.startsWith('•') || trimmed.startsWith('-') ? trimmed : '• ' + trimmed) + '\n';
    });
    optimized += '\n';
  }

  if (data.certifications && data.certifications.length > 0) {
    optimized += 'CERTIFICATIONS\n';
    optimized += '═══════════════════════════════════════\n';
    data.certifications.forEach(line => {
      const trimmed = line.trim();
      if (trimmed) optimized += (trimmed.startsWith('•') || trimmed.startsWith('-') ? trimmed : '• ' + trimmed) + '\n';
    });
    optimized += '\n';
  }

  return optimized.trim();
}

// Parses optimized text back into structured segments
function parseStructuredResume(text) {
  const sections = {
    name: '',
    contact: [],
    summary: '',
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: []
  };

  const lines = text.split('\n').map(l => l.trim());
  let currentSection = 'header';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const upper = line.toUpperCase();
    if (upper === 'PROFESSIONAL SUMMARY') { currentSection = 'summary'; continue; }
    if (upper === 'TECHNICAL SKILLS') { currentSection = 'skills'; continue; }
    if (upper === 'EXPERIENCE & DETAILS' || upper === 'EXPERIENCE' || upper === 'WORK EXPERIENCE') { currentSection = 'experience'; continue; }
    if (upper === 'EDUCATION') { currentSection = 'education'; continue; }
    if (upper === 'PROJECTS') { currentSection = 'projects'; continue; }
    if (upper === 'CERTIFICATIONS') { currentSection = 'certifications'; continue; }
    if (line.startsWith('══════')) continue;

    if (currentSection === 'header') {
      if (!sections.name && line.length < 40 && !line.includes('@') && !line.includes(':')) {
        sections.name = line;
      } else {
        sections.contact.push(line);
      }
    } else if (currentSection === 'summary') {
      sections.summary += (sections.summary ? ' ' : '') + line;
    } else if (currentSection === 'skills') {
      const clean = line.replace(/^[•\-\*▪▸►]\s*/, '');
      if (clean) sections.skills.push(clean);
    } else if (currentSection === 'experience') {
      sections.experience.push(line);
    } else if (currentSection === 'education') {
      sections.education.push(line);
    } else if (currentSection === 'projects') {
      sections.projects.push(line);
    } else if (currentSection === 'certifications') {
      sections.certifications.push(line);
    }
  }

  if (!sections.name && lines[0]) {
    sections.name = lines[0];
  }

  return sections;
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
  const [selectedTemplate, setSelectedTemplate] = useState('harvard');

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
    const data = parseStructuredResume(optimizedText);
    const expYears = detectExperienceYears(data.experience);
    generateProfessionalPDF(data, selectedTemplate, expYears);
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

      {/* STEP 3: Optimized Resume + Template Picker */}
      {step === 3 && (
        <div className="resume-section glass-panel animate-fade">
          <button className="back-btn" onClick={() => setStep(2)}><ArrowLeft size={16} /> Back</button>
          <div className="section-badge"><Sparkles size={16} /><span>Resume Optimizer</span></div>
          <h2>Your ATS-Optimized Resume</h2>
          <p className="section-desc">We've restructured your content to maximize ATS score. Choose one of our 10 professional monochrome templates below to download.</p>

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
              {/* Template Picker */}
              <div className="templates-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LayoutTemplate size={20} className="text-purple" />
                    Select ATS-Compliant Template (Pure Black & White)
                  </h3>
                  <button 
                    className="btn-secondary" 
                    onClick={() => {
                      const randomIndex = Math.floor(Math.random() * TEMPLATE_LIST.length);
                      setSelectedTemplate(TEMPLATE_LIST[randomIndex].id);
                    }}
                    style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                  >
                    <RefreshCw size={14} /> Shuffle Layout
                  </button>
                </div>
                <div className="templates-grid">
                  {TEMPLATE_LIST.map(t => (
                    <div 
                      key={t.id} 
                      className={`tpl-card ${selectedTemplate === t.id ? 'selected' : ''}`}
                      onClick={() => setSelectedTemplate(t.id)}
                    >
                      <div className="tpl-thumb">
                        {getTemplateSVG(t.id)}
                      </div>
                      <div className="tpl-info">
                        <span className="tpl-badge">{t.badge}</span>
                        <h4>{t.name}</h4>
                        <p>{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

               <div className="resume-preview glass-card">
                <div className="preview-header">
                  <span>📄 Optimized Resume Preview</span>
                  <span className="preview-tpl-name">Layout: {TEMPLATE_LIST.find(t => t.id === selectedTemplate)?.name || 'Default'}</span>
                </div>
                <pre className="preview-content">{optimizedText}</pre>
              </div>

              <div className="download-section">
                <button className="download-btn" onClick={handleDownload}>
                  <Download size={18} /><span>Download PDF Resume</span>
                </button>
                <p className="download-hint">Generates a standard black-and-white PDF for maximum ATS readability.</p>
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
