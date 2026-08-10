const STYLES = `
.ai-resume-page { max-width: 960px; margin: 0 auto; }
.resume-steps-bar { display:flex; justify-content:center; gap:1.25rem; margin-bottom:2rem; flex-wrap:wrap; }
.step-dot { display:flex; flex-direction:column; align-items:center; gap:0.3rem; opacity:0.4; transition:all 0.3s; }
.step-dot.active { opacity:1; }
.step-dot.current .step-num { background:hsl(var(--primary)); color:white; box-shadow:0 4px 15px hsl(var(--primary)/0.4); }
.step-num { width:2rem; height:2rem; border-radius:50%; background:hsl(var(--secondary)); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.85rem; color:hsl(var(--muted-foreground)); transition:all 0.3s; }
.step-label { font-size:0.7rem; color:hsl(var(--muted-foreground)); font-weight:500; }
.resume-section { padding:2.5rem; display:flex; flex-direction:column; gap:1.25rem; position:relative; }
.section-badge { display:inline-flex; align-items:center; gap:0.5rem; padding:0.35rem 0.85rem; background:hsl(var(--primary)/0.12); border:1px solid hsl(var(--primary)/0.3); border-radius:9999px; color:hsl(var(--primary)); font-size:0.8rem; font-weight:700; width:fit-content; }
.resume-section h1 { font-size:2.2rem; font-weight:800; letter-spacing:-0.02em; background:linear-gradient(135deg,hsl(var(--foreground)),hsl(var(--foreground)/0.7)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.resume-section h2 { font-size:1.6rem; font-weight:800; color:hsl(var(--foreground)); }
.section-desc { color:hsl(var(--muted-foreground)); font-size:1rem; line-height:1.6; max-width:650px; }
.back-btn { position:absolute; top:1.5rem; right:1.5rem; background:hsl(var(--secondary)/0.6); border:1px solid hsl(var(--card-border)/0.4); color:hsl(var(--muted-foreground)); padding:0.4rem 0.8rem; border-radius:0.5rem; cursor:pointer; font-family:var(--font-sans); font-size:0.85rem; display:flex; align-items:center; gap:0.3rem; transition:all 0.3s; }
.back-btn:hover { color:hsl(var(--foreground)); background:hsl(var(--secondary)); }

/* Upload Zone */
.upload-zone { border:2px dashed hsl(var(--card-border)/0.6); border-radius:1rem; padding:3rem 2rem; text-align:center; cursor:pointer; transition:all 0.3s; background:hsl(var(--secondary)/0.15); }
.upload-zone:hover { border-color:hsl(var(--primary)/0.5); background:hsl(var(--primary)/0.05); }
.upload-icon { color:hsl(var(--primary)/0.5); margin-bottom:1rem; }
.upload-zone h3 { font-size:1.2rem; color:hsl(var(--foreground)); margin-bottom:0.5rem; }
.upload-zone p { color:hsl(var(--muted-foreground)); font-size:0.9rem; }
.upload-parsing { display:flex; flex-direction:column; align-items:center; gap:1rem; }
.upload-done { display:flex; flex-direction:column; align-items:center; gap:0.75rem; }
.upload-done p { font-weight:600; color:hsl(var(--foreground)); }
.upload-done span { font-size:0.8rem; color:hsl(var(--muted-foreground)); }
.text-green { color:#10b981; }
.text-red { color:#ef4444; }
.text-purple { color:#a78bfa; }

/* Spinner */
.spinner { width:2.5rem; height:2.5rem; border:3px solid hsl(var(--card-border)/0.3); border-top-color:hsl(var(--primary)); border-radius:50%; animation:spin 0.8s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }

/* ATS Score */
.ats-header { display:flex; gap:2rem; align-items:center; flex-wrap:wrap; }
.ats-gauge { position:relative; width:140px; height:140px; flex-shrink:0; }
.gauge-svg { width:100%; height:100%; }
.gauge-text { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
.gauge-num { font-size:2.2rem; font-weight:800; }
.gauge-label { font-size:0.8rem; color:hsl(var(--muted-foreground)); font-weight:600; }
.ats-summary { flex:1; }
.ats-summary h2 { margin-bottom:0.5rem; }
.ats-summary p { color:hsl(var(--muted-foreground)); margin-bottom:1rem; }
.stats-row { display:flex; gap:0.75rem; flex-wrap:wrap; }
.stat-chip { background:hsl(var(--secondary)/0.6); border:1px solid hsl(var(--card-border)/0.4); padding:0.5rem 0.85rem; border-radius:0.6rem; display:flex; flex-direction:column; align-items:center; }
.stat-chip span { font-size:1.2rem; font-weight:700; color:hsl(var(--foreground)); }
.stat-chip small { font-size:0.7rem; color:hsl(var(--muted-foreground)); }

/* Category Scores */
.category-scores { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:0.75rem; }
.cat-score-card { padding:1rem 1.25rem; }
.cat-score-header { display:flex; align-items:center; gap:0.5rem; margin-bottom:0.6rem; }
.cat-icon-text { font-size:1.1rem; }
.cat-name { flex:1; font-weight:600; font-size:0.9rem; color:hsl(var(--foreground)); }
.cat-pts { font-weight:700; font-size:0.9rem; }
.cat-bar-track { height:6px; background:hsl(var(--secondary)/0.4); border-radius:3px; overflow:hidden; }
.cat-bar-fill { height:100%; border-radius:3px; transition:width 1.2s ease; }

/* Suggestions */
.suggestions-block { border-top:1px solid hsl(var(--card-border)/0.3); padding-top:1.5rem; }
.suggestions-block h3 { font-size:1.1rem; font-weight:700; display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem; color:hsl(var(--foreground)); }
.suggestions-list { display:flex; flex-direction:column; gap:0.6rem; }
.suggestion-item { display:flex; align-items:flex-start; gap:0.75rem; padding:0.85rem 1rem; background:hsl(var(--secondary)/0.2); border-radius:0.6rem; border-left:3px solid transparent; }
.suggestion-item.priority-high { border-left-color:#ef4444; }
.suggestion-item.priority-medium { border-left-color:#f59e0b; }
.suggestion-item.priority-low { border-left-color:#3b82f6; }
.priority-dot { width:8px; height:8px; border-radius:50%; margin-top:0.4rem; flex-shrink:0; }
.priority-high .priority-dot { background:#ef4444; }
.priority-medium .priority-dot { background:#f59e0b; }
.priority-low .priority-dot { background:#3b82f6; }
.suggestion-item p { color:hsl(var(--foreground)/0.85); font-size:0.9rem; line-height:1.5; }

/* Skills */
.skills-block h3 { font-size:1rem; font-weight:700; margin-bottom:0.75rem; color:hsl(var(--foreground)); }
.skills-tags { display:flex; flex-wrap:wrap; gap:0.5rem; }
.skill-tag { background:hsl(var(--primary)/0.12); color:hsl(var(--primary)); padding:0.3rem 0.7rem; border-radius:9999px; font-size:0.8rem; font-weight:600; border:1px solid hsl(var(--primary)/0.2); }
.step2-actions { display:flex; justify-content:center; padding-top:1rem; }

/* Step 3: Optimize Resume */
.optimizing-block { text-align:center; padding:3rem 1rem; display:flex; flex-direction:column; align-items:center; gap:1rem; }
.optimizing-block h3 { font-size:1.2rem; color:hsl(var(--foreground)); }
.optimizing-block p { color:hsl(var(--muted-foreground)); font-size:0.9rem; }
.optimize-progress { width:100%; max-width:300px; height:6px; background:hsl(var(--secondary)/0.4); border-radius:3px; overflow:hidden; margin-top:0.5rem; }
.optimize-bar { height:100%; width:0; background:linear-gradient(90deg,hsl(var(--primary)),#a78bfa); border-radius:3px; animation:optimizeLoad 1.5s ease forwards; }
@keyframes optimizeLoad { to { width:100%; } }

/* ========== TEMPLATE PICKER - PREMIUM ========== */
.templates-section { margin-top:1rem; }
.templates-section > h3 { font-size:1.15rem; font-weight:700; color:hsl(var(--foreground)); margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem; }
.templates-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:0.85rem; }

.tpl-card { position:relative; cursor:pointer; border-radius:0.85rem; overflow:hidden; border:2px solid hsl(var(--card-border)/0.3); background:hsl(var(--secondary)/0.15); transition:all 0.35s cubic-bezier(.4,0,.2,1); display:flex; flex-direction:column; }
.tpl-card:hover { border-color:hsl(var(--primary)/0.5); transform:translateY(-4px); box-shadow:0 12px 30px rgba(0,0,0,0.2); }
.tpl-card.selected { border-color:hsl(var(--primary)); box-shadow:0 8px 25px hsl(var(--primary)/0.25); background:hsl(var(--primary)/0.04); }
.tpl-card.selected::after { content:'✓'; position:absolute; top:8px; right:8px; width:22px; height:22px; background:hsl(var(--primary)); color:white; border-radius:50%; font-size:0.7rem; font-weight:800; display:flex; align-items:center; justify-content:center; z-index:2; }

/* Template thumbnail preview */
.tpl-thumb { width:100%; aspect-ratio:210/297; position:relative; overflow:hidden; background:#fff; border-bottom:1px solid hsl(var(--card-border)/0.2); }
.tpl-thumb svg { width:100%; height:100%; display:block; }

.tpl-info { padding:0.75rem 0.85rem; flex:1; display:flex; flex-direction:column; gap:0.3rem; }
.tpl-badge { display:inline-block; font-size:0.6rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; padding:0.15rem 0.45rem; border-radius:4px; background:hsl(var(--secondary)/0.6); color:hsl(var(--muted-foreground)); width:fit-content; }
.tpl-card.selected .tpl-badge { background:hsl(var(--primary)/0.15); color:hsl(var(--primary)); }
.tpl-info h4 { font-size:0.85rem; font-weight:700; color:hsl(var(--foreground)); line-height:1.2; }
.tpl-info p { font-size:0.68rem; color:hsl(var(--muted-foreground)); line-height:1.35; }

/* Resume Preview */
.resume-preview { padding:0; overflow:hidden; margin-top:1.5rem; }
.preview-header { background:hsl(var(--secondary)/0.5); padding:0.75rem 1.25rem; font-size:0.85rem; font-weight:600; color:hsl(var(--foreground)); border-bottom:1px solid hsl(var(--card-border)/0.3); display:flex; align-items:center; justify-content:space-between; }
.preview-content { padding:1.25rem; font-family:var(--font-mono); font-size:0.8rem; line-height:1.6; color:hsl(var(--foreground)/0.85); white-space:pre-wrap; word-break:break-word; max-height:350px; overflow-y:auto; margin:0; background:transparent; }
.preview-tpl-name { font-size:0.75rem; color:hsl(var(--primary)); font-weight:600; background:hsl(var(--primary)/0.1); padding:0.2rem 0.6rem; border-radius:4px; }

.download-section { display:flex; flex-direction:column; align-items:center; gap:0.5rem; padding-top:0.5rem; }
.download-btn { padding:0.9rem 2rem; font-size:1rem; background:linear-gradient(135deg,#27272a,#09090b); box-shadow:0 4px 15px rgba(0,0,0,0.25); color:white; border:none; border-radius:0.5rem; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:0.5rem; transition:all 0.3s; font-family:var(--font-sans); }
.download-btn:hover { background:#09090b; box-shadow:0 6px 20px rgba(0,0,0,0.4); transform:translateY(-1px); }
.download-hint { font-size:0.78rem; color:hsl(var(--muted-foreground)); }
.next-step-prompt { display:flex; justify-content:center; padding-top:0.75rem; }

/* Step 4: Job Decision */
.job-decision-block { display:flex; flex-direction:column; align-items:center; text-align:center; gap:1.5rem; padding:2rem 0; }
.decision-icon { font-size:4rem; animation:bounce 2s ease infinite; }
@keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
.job-decision-block h1 { font-size:2rem; }
.decision-buttons { display:flex; gap:1.5rem; margin-top:1rem; flex-wrap:wrap; justify-content:center; }
.decision-btn { display:flex; flex-direction:column; align-items:center; gap:0.6rem; padding:2rem 2.5rem; border-radius:1rem; cursor:pointer; font-family:var(--font-sans); border:2px solid transparent; transition:all 0.3s; min-width:200px; }
.decision-yes { background:hsl(var(--primary)/0.1); border-color:hsl(var(--primary)/0.3); color:hsl(var(--primary)); }
.decision-yes:hover { background:hsl(var(--primary)); color:white; transform:translateY(-3px); box-shadow:0 8px 25px hsl(var(--primary)/0.4); }
.decision-no { background:hsl(var(--secondary)/0.4); border-color:hsl(var(--card-border)/0.4); color:hsl(var(--muted-foreground)); }
.decision-no:hover { background:hsl(var(--secondary)/0.8); color:hsl(var(--foreground)); transform:translateY(-3px); box-shadow:0 8px 25px rgba(0,0,0,0.15); }
.decision-title { font-size:1.15rem; font-weight:700; }
.decision-sub { font-size:0.78rem; opacity:0.8; }

/* Job Preferences Form */
.pref-form { display:flex; flex-direction:column; gap:1.75rem; }
.form-group { display:flex; flex-direction:column; gap:0.75rem; }
.form-group label { font-weight:600; font-size:0.95rem; color:hsl(var(--foreground)); display:flex; align-items:center; gap:0.4rem; }
.role-grid { display:flex; flex-wrap:wrap; gap:0.5rem; }
.role-chip { background:hsl(var(--secondary)/0.4); border:1px solid hsl(var(--card-border)/0.4); color:hsl(var(--foreground)/0.8); padding:0.5rem 1rem; border-radius:0.6rem; cursor:pointer; font-family:var(--font-sans); font-size:0.85rem; font-weight:500; transition:all 0.2s; }
.role-chip:hover { border-color:hsl(var(--primary)/0.4); }
.role-chip.selected { background:hsl(var(--primary)); color:white; border-color:hsl(var(--primary)); box-shadow:0 4px 12px hsl(var(--primary)/0.3); }
.exp-toggle { display:flex; gap:0.5rem; }
.exp-btn { flex:1; padding:0.75rem; background:hsl(var(--secondary)/0.4); border:1px solid hsl(var(--card-border)/0.4); border-radius:0.6rem; color:hsl(var(--foreground)/0.8); font-family:var(--font-sans); font-weight:600; cursor:pointer; transition:all 0.2s; }
.exp-btn.selected { background:hsl(var(--primary)); color:white; border-color:hsl(var(--primary)); }
.year-slider { display:flex; align-items:center; gap:1rem; margin-top:0.5rem; }
.year-slider input[type=range] { flex:1; accent-color:hsl(var(--primary)); }
.year-display { font-weight:700; color:hsl(var(--primary)); font-size:1.1rem; min-width:80px; }
.loc-grid { display:flex; flex-wrap:wrap; gap:0.5rem; }
.loc-chip { background:hsl(var(--secondary)/0.4); border:1px solid hsl(var(--card-border)/0.4); color:hsl(var(--foreground)/0.8); padding:0.45rem 0.9rem; border-radius:0.6rem; cursor:pointer; font-family:var(--font-sans); font-size:0.85rem; font-weight:500; transition:all 0.2s; }
.loc-chip.selected { background:hsl(var(--primary)); color:white; border-color:hsl(var(--primary)); }
.search-jobs-btn { align-self:center; margin-top:0.5rem; padding:0.85rem 2rem; font-size:1rem; }
.search-jobs-btn:disabled { opacity:0.4; cursor:not-allowed; transform:none; }

/* Job Results */
.loading-jobs { text-align:center; padding:3rem; display:flex; flex-direction:column; align-items:center; gap:1rem; }
.loading-jobs p { color:hsl(var(--muted-foreground)); }
.jobs-grid { display:flex; flex-direction:column; gap:1rem; }
.job-card { padding:1.5rem; }
.job-card-top { display:flex; gap:1rem; align-items:flex-start; }
.job-rank { width:2.2rem; height:2.2rem; background:linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary)/0.6)); color:white; border-radius:0.5rem; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.85rem; flex-shrink:0; }
.job-info { flex:1; }
.job-info h3 { font-size:1.1rem; font-weight:700; color:hsl(var(--foreground)); margin-bottom:0.25rem; }
.job-company { font-weight:600; color:hsl(var(--primary)); font-size:0.95rem; margin-bottom:0.4rem; }
.job-meta { display:flex; flex-wrap:wrap; gap:0.75rem; font-size:0.8rem; color:hsl(var(--muted-foreground)); }
.job-meta span { display:flex; align-items:center; gap:0.25rem; }
.job-salary { color:#10b981; font-weight:600; }
.match-circle { width:3.5rem; height:3.5rem; border:3px solid; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; }
.match-circle span { font-size:0.9rem; font-weight:800; }
.match-circle small { font-size:0.55rem; color:hsl(var(--muted-foreground)); }
.job-skills-section { margin-top:0.75rem; display:flex; flex-direction:column; gap:0.4rem; }
.skill-row { display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; }
.skill-row small { font-size:0.75rem; font-weight:600; min-width:65px; }
.skill-tags-sm { display:flex; flex-wrap:wrap; gap:0.3rem; }
.tag-match { background:rgba(16,185,129,0.12); color:#10b981; padding:0.15rem 0.5rem; border-radius:4px; font-size:0.72rem; font-weight:600; }
.tag-miss { background:rgba(239,68,68,0.1); color:#ef4444; padding:0.15rem 0.5rem; border-radius:4px; font-size:0.72rem; font-weight:600; }
.job-card-bottom { display:flex; align-items:center; gap:1rem; margin-top:1rem; padding-top:0.75rem; border-top:1px solid hsl(var(--card-border)/0.3); flex-wrap:wrap; }
.posted-date { font-size:0.78rem; color:hsl(var(--muted-foreground)); }
.job-source { font-size:0.72rem; color:hsl(var(--primary)); font-weight:600; background:hsl(var(--primary)/0.08); padding:0.15rem 0.5rem; border-radius:4px; }
.apply-btn { margin-left:auto; background:hsl(var(--primary)); color:white; padding:0.45rem 1rem; border-radius:0.5rem; font-size:0.85rem; font-weight:600; text-decoration:none; display:flex; align-items:center; gap:0.3rem; transition:all 0.3s; box-shadow:0 4px 12px hsl(var(--primary)/0.3); }
.apply-btn:hover { transform:translateY(-1px); box-shadow:0 6px 18px hsl(var(--primary)/0.5); }

/* Email Alert */
.email-alert-section { margin-top:1.5rem; padding:1.5rem; display:flex; align-items:center; justify-content:space-between; gap:1.5rem; flex-wrap:wrap; }
.email-alert-content { display:flex; align-items:center; gap:1rem; }
.email-alert-content h3 { font-size:1rem; font-weight:700; color:hsl(var(--foreground)); }
.email-alert-content p { font-size:0.85rem; color:hsl(var(--muted-foreground)); }
.email-confirmed { display:flex; align-items:center; gap:0.5rem; color:#10b981; font-weight:600; }

/* Animation */
.animate-fade { animation: fadeSlideIn 0.4s ease forwards; }
@keyframes fadeSlideIn { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }

@media (max-width:640px) {
  .resume-section { padding:1.5rem; }
  .ats-header { flex-direction:column; align-items:center; text-align:center; }
  .job-card-top { flex-direction:column; }
  .match-circle { align-self:flex-end; }
  .email-alert-section { flex-direction:column; text-align:center; }
  .decision-buttons { flex-direction:column; }
  .decision-btn { min-width:auto; width:100%; }
  .templates-grid { grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); }
}
`;

export default STYLES;
