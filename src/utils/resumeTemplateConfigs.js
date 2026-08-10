// ============================================================
// Professional Resume Template Configurations
// 10 ATS-compliant professional templates
// ============================================================

export const TEMPLATE_LIST = [
  { id: 'harvard', name: 'Harvard Classic', desc: 'Centered header with serif font and horizontal dividers. Timeless and trusted.', badge: 'Classic', color: '#1a1a2e' },
  { id: 'minimalist', name: 'Modern Minimalist', desc: 'Clean sans-serif with generous whitespace and subtle dividers.', badge: 'Modern', color: '#2d3436' },
  { id: 'tech', name: 'Tech Professional', desc: 'Skills-first layout with 3-column competency grid. Ideal for developers.', badge: 'Recommended', color: '#0a3d62' },
  { id: 'executive', name: 'Executive Suite', desc: 'Formal serif typography with elegant double-line borders.', badge: 'Premium', color: '#2c2c54' },
  { id: 'creative', name: 'Creative Edge', desc: 'Bold left name with right-aligned contact and accent sidebar bars.', badge: 'Stylish', color: '#3c3c3c' },
  { id: 'functional', name: 'Skills-First', desc: 'Qualifications and skills above experience. Perfect for freshers.', badge: 'Fresher', color: '#1e272e' },
  { id: 'doubleline', name: 'Elegant Borders', desc: 'Refined double-line section dividers for an upscale professional look.', badge: 'Elegant', color: '#192a56' },
  { id: 'academic', name: 'Academic Detail', desc: 'Generous spacing with serif font. Great for research and education focus.', badge: 'Academic', color: '#2f3542' },
  { id: 'twocolumn', name: 'Two-Column Split', desc: 'Sidebar for contact & skills, main area for experience & projects.', badge: 'Compact', color: '#353b48' },
  { id: 'hybrid', name: 'Corporate Hybrid', desc: 'Business-standard format with bold headers and right-aligned dates.', badge: 'Corporate', color: '#2d3436' },
];

export const TEMPLATE_CONFIGS = {
  harvard:    { font: 'times',     margins: [22,22,22,18], nameSize: 17, nameAlign: 'center', contactSep: '  •  ', divider: 'single',  sectionStyle: 'center-rule', bodySize: 9.5, lineH: 4.5, skillsDisplay: 'comma' },
  minimalist: { font: 'helvetica', margins: [25,20,20,18], nameSize: 22, nameAlign: 'left',   contactSep: '   |   ', divider: 'thin',    sectionStyle: 'left-rule',   bodySize: 9.2, lineH: 4.3, skillsDisplay: 'comma' },
  tech:       { font: 'helvetica', margins: [20,18,18,18], nameSize: 18, nameAlign: 'left',   contactSep: '  |  ',   divider: 'thick',   sectionStyle: 'left-rule',   bodySize: 9.3, lineH: 4.4, skillsDisplay: 'grid'  },
  executive:  { font: 'times',     margins: [25,25,25,20], nameSize: 18, nameAlign: 'center', contactSep: '  ·  ',   divider: 'double',  sectionStyle: 'center-rule', bodySize: 10,  lineH: 4.8, skillsDisplay: 'comma' },
  creative:   { font: 'helvetica', margins: [20,20,20,18], nameSize: 20, nameAlign: 'split',  contactSep: '  |  ',   divider: 'none',    sectionStyle: 'accent-bar',  bodySize: 9.3, lineH: 4.3, skillsDisplay: 'comma' },
  functional: { font: 'helvetica', margins: [22,20,20,18], nameSize: 17, nameAlign: 'center', contactSep: '  |  ',   divider: 'single',  sectionStyle: 'left-rule',   bodySize: 9.5, lineH: 4.5, skillsDisplay: 'grid'  },
  doubleline: { font: 'times',     margins: [22,22,22,18], nameSize: 18, nameAlign: 'center', contactSep: '  •  ',   divider: 'double-elegant', sectionStyle: 'double-rule', bodySize: 9.5, lineH: 4.5, skillsDisplay: 'comma' },
  academic:   { font: 'times',     margins: [22,22,22,20], nameSize: 16, nameAlign: 'left',   contactSep: '  |  ',   divider: 'thick',   sectionStyle: 'left-underline', bodySize: 10, lineH: 5, skillsDisplay: 'bullets' },
  twocolumn:  { font: 'helvetica', margins: [18,15,15,15], nameSize: 14, nameAlign: 'sidebar', contactSep: '\n',     divider: 'none',    sectionStyle: 'left-rule',   bodySize: 8.5, lineH: 4, skillsDisplay: 'bullets', sidebarW: 65 },
  hybrid:     { font: 'helvetica', margins: [20,20,20,18], nameSize: 18, nameAlign: 'split',  contactSep: '  |  ',   divider: 'single',  sectionStyle: 'bold-bottom', bodySize: 9.5, lineH: 4.5, skillsDisplay: 'comma' },
};

// Section ordering per template
export const SECTION_ORDER = {
  harvard:    ['summary','experience','skills','education','projects','certifications'],
  minimalist: ['summary','experience','skills','education','projects','certifications'],
  tech:       ['summary','skills','experience','projects','education','certifications'],
  executive:  ['summary','experience','education','skills','certifications','projects'],
  creative:   ['summary','experience','skills','projects','education','certifications'],
  functional: ['summary','skills','projects','education','experience','certifications'],
  doubleline: ['summary','experience','skills','education','projects','certifications'],
  academic:   ['education','summary','experience','projects','skills','certifications'],
  twocolumn:  ['summary','experience','projects','education'],
  hybrid:     ['summary','experience','skills','projects','education','certifications'],
};

// Detect experience years from parsed resume data
export function detectExperienceYears(experienceLines) {
  const text = experienceLines.join(' ');
  // Look for "X years" pattern
  const yrsMatch = text.match(/(\d+)\s*\+?\s*years?\s*(of)?\s*(experience)?/i);
  if (yrsMatch) return parseInt(yrsMatch[1]);
  // Look for date ranges
  const datePattern = /\b(20\d{2}|19\d{2})\b/g;
  const years = [];
  let m;
  while ((m = datePattern.exec(text)) !== null) years.push(parseInt(m[1]));
  if (years.length >= 2) return Math.max(...years) - Math.min(...years);
  return 0;
}
