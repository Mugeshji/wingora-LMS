// ============================================================
// Resume Parser & ATS Scoring Engine
// Client-side PDF text extraction + rule-based ATS analysis
// ============================================================
import * as pdfjsLib from 'pdfjs-dist';

// Use the bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

// ---- PDF Text Extraction ----
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const items = textContent.items;
    
    // Group items by Y coordinate (rounded to handle minor alignment offsets)
    const linesMap = {};
    for (const item of items) {
      if (!item.str || !item.transform) continue;
      const y = Math.round(item.transform[5]);
      const x = item.transform[4];
      
      let foundY = Object.keys(linesMap).find(existingY => Math.abs(Number(existingY) - y) <= 3);
      if (!foundY) {
        foundY = String(y);
        linesMap[foundY] = [];
      }
      linesMap[foundY].push({ x, str: item.str });
    }
    
    // Sort Y coordinates in descending order (top of page has highest Y coordinate)
    const sortedYs = Object.keys(linesMap).map(Number).sort((a, b) => b - a);
    
    let pageText = '';
    for (const y of sortedYs) {
      const lineItems = linesMap[y].sort((a, b) => a.x - b.x);
      const lineStr = lineItems.map(item => item.str).join(' ').replace(/\s+/g, ' ').trim();
      if (lineStr) {
        pageText += lineStr + '\n';
      }
    }
    fullText += pageText + '\n';
  }
  return fullText.trim();
}

// ---- ATS Scoring Categories ----
const ATS_KEYWORDS = [
  // Technical
  'java', 'python', 'javascript', 'react', 'node', 'sql', 'html', 'css',
  'spring', 'docker', 'kubernetes', 'aws', 'azure', 'git', 'agile',
  'typescript', 'mongodb', 'postgresql', 'mysql', 'redis', 'graphql',
  'rest', 'api', 'microservices', 'ci/cd', 'devops', 'linux', 'angular',
  'vue', 'express', 'django', 'flask', 'machine learning', 'data science',
  'tensorflow', 'pytorch', 'tableau', 'power bi', 'excel',
  // Soft skills
  'leadership', 'teamwork', 'communication', 'problem solving',
  'project management', 'collaboration', 'analytical', 'strategic',
  // General
  'bachelor', 'master', 'degree', 'certification', 'certified',
  'internship', 'experience', 'developed', 'implemented', 'managed',
  'designed', 'optimized', 'achieved', 'increased', 'reduced',
  'delivered', 'led', 'coordinated', 'analyzed', 'built'
];

const SECTION_HEADERS = [
  'education', 'experience', 'work experience', 'professional experience',
  'skills', 'technical skills', 'projects', 'certifications',
  'summary', 'objective', 'profile', 'achievements', 'awards',
  'publications', 'volunteer', 'languages', 'interests', 'hobbies',
  'references', 'contact', 'personal information'
];

const ACTION_VERBS = [
  'achieved', 'administered', 'analyzed', 'built', 'collaborated',
  'conducted', 'coordinated', 'created', 'decreased', 'delivered',
  'designed', 'developed', 'directed', 'enhanced', 'established',
  'evaluated', 'executed', 'expanded', 'generated', 'headed',
  'identified', 'implemented', 'improved', 'increased', 'initiated',
  'introduced', 'launched', 'led', 'maintained', 'managed',
  'mentored', 'negotiated', 'optimized', 'orchestrated', 'oversaw',
  'performed', 'pioneered', 'planned', 'produced', 'programmed',
  'reduced', 'redesigned', 'resolved', 'revamped', 'spearheaded',
  'streamlined', 'strengthened', 'supervised', 'transformed', 'utilized'
];

// ---- Core Scoring Function ----
export function analyzeResume(text) {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  const lines = text.split('\n').filter(l => l.trim());

  const results = {
    totalScore: 0,
    categories: [],
    skills: [],
    suggestions: [],
    stats: {}
  };

  // 1. Contact Info (15 pts)
  const contactChecks = {
    email: /[\w.-]+@[\w.-]+\.\w{2,}/.test(text),
    phone: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text),
    linkedin: /linkedin\.com/i.test(text) || /linkedin/i.test(text),
    portfolio: /(github\.com|portfolio|website|http)/i.test(text)
  };
  const contactScore = (contactChecks.email ? 5 : 0)
    + (contactChecks.phone ? 4 : 0)
    + (contactChecks.linkedin ? 3 : 0)
    + (contactChecks.portfolio ? 3 : 0);

  results.categories.push({
    name: 'Contact Information',
    score: contactScore,
    maxScore: 15,
    icon: '📧',
    details: contactChecks,
    color: '#3b82f6'
  });

  if (!contactChecks.email) results.suggestions.push({ priority: 'high', text: 'Add your email address — it\'s essential for recruiters to contact you.' });
  if (!contactChecks.phone) results.suggestions.push({ priority: 'high', text: 'Include your phone number for direct reach.' });
  if (!contactChecks.linkedin) results.suggestions.push({ priority: 'medium', text: 'Add your LinkedIn profile URL — 87% of recruiters use LinkedIn.' });
  if (!contactChecks.portfolio) results.suggestions.push({ priority: 'low', text: 'Consider adding a GitHub or portfolio link to showcase your work.' });

  // 2. Section Structure (20 pts)
  const foundSections = SECTION_HEADERS.filter(header =>
    lower.includes(header)
  );
  const essentialSections = ['education', 'experience', 'skills'];
  const essentialFound = essentialSections.filter(s =>
    foundSections.some(f => f.includes(s))
  );
  const sectionScore = Math.min(20, Math.round((foundSections.length / 6) * 20));

  results.categories.push({
    name: 'Section Structure',
    score: sectionScore,
    maxScore: 20,
    icon: '📋',
    details: { found: foundSections, missing: essentialSections.filter(s => !essentialFound.includes(s)) },
    color: '#8b5cf6'
  });

  essentialSections.forEach(s => {
    if (!essentialFound.includes(s)) {
      results.suggestions.push({
        priority: 'high',
        text: `Missing "${s.charAt(0).toUpperCase() + s.slice(1)}" section — ATS systems look for standard section headings.`
      });
    }
  });

  if (foundSections.length < 4) {
    results.suggestions.push({
      priority: 'medium',
      text: 'Add more clearly labeled sections (Summary, Projects, Certifications) to improve ATS parsing.'
    });
  }

  // 3. Keywords & Skills (25 pts)
  const foundKeywords = ATS_KEYWORDS.filter(kw => lower.includes(kw));
  const keywordScore = Math.min(25, Math.round((foundKeywords.length / 15) * 25));

  results.categories.push({
    name: 'Keywords & Skills',
    score: keywordScore,
    maxScore: 25,
    icon: '🔑',
    details: { found: foundKeywords, total: ATS_KEYWORDS.length },
    color: '#10b981'
  });

  results.skills = foundKeywords.filter(kw =>
    !['experience', 'developed', 'implemented', 'managed', 'designed',
      'optimized', 'achieved', 'increased', 'reduced', 'delivered',
      'led', 'coordinated', 'analyzed', 'built', 'bachelor', 'master',
      'degree', 'certification', 'certified', 'internship'].includes(kw)
  );

  if (foundKeywords.length < 8) {
    results.suggestions.push({
      priority: 'high',
      text: 'Add more relevant technical keywords and skills. Match them to the job descriptions you\'re targeting.'
    });
  }

  // 4. Action Verbs (15 pts)
  const foundVerbs = ACTION_VERBS.filter(v => lower.includes(v));
  const verbScore = Math.min(15, Math.round((foundVerbs.length / 8) * 15));

  results.categories.push({
    name: 'Action Verbs',
    score: verbScore,
    maxScore: 15,
    icon: '⚡',
    details: { found: foundVerbs },
    color: '#f59e0b'
  });

  if (foundVerbs.length < 5) {
    results.suggestions.push({
      priority: 'medium',
      text: 'Use more strong action verbs (e.g., "Implemented", "Optimized", "Spearheaded") to describe your achievements.'
    });
  }

  // 5. Quantifiable Results (15 pts)
  const quantPatterns = [
    /\d+\s*%/g,
    /\$[\d,]+/g,
    /\d+\s*(users|clients|customers|projects|teams|members)/gi,
    /\d+\s*(months|years|weeks)/gi,
    /increased\s+.*\d/gi,
    /reduced\s+.*\d/gi,
    /saved\s+.*\d/gi,
    /improved\s+.*\d/gi
  ];
  let quantCount = 0;
  quantPatterns.forEach(p => {
    const matches = text.match(p);
    if (matches) quantCount += matches.length;
  });
  const quantScore = Math.min(15, Math.round((quantCount / 4) * 15));

  results.categories.push({
    name: 'Quantifiable Results',
    score: quantScore,
    maxScore: 15,
    icon: '📊',
    details: { count: quantCount },
    color: '#ec4899'
  });

  if (quantCount < 3) {
    results.suggestions.push({
      priority: 'high',
      text: 'Add measurable achievements (e.g., "Increased revenue by 25%", "Reduced load time by 40%"). Numbers make your resume 40% more effective.'
    });
  }

  // 6. Length & Formatting (10 pts)
  const wordCount = words.length;
  let formatScore = 0;
  if (wordCount >= 200 && wordCount <= 800) formatScore += 5;
  else if (wordCount >= 100 && wordCount <= 1200) formatScore += 3;
  else formatScore += 1;

  // Check for reasonable line count
  if (lines.length >= 15 && lines.length <= 80) formatScore += 3;
  else formatScore += 1;

  // Bonus for bullet-point style (lines starting with - or •)
  const bulletLines = lines.filter(l => /^\s*[•\-\*▪▸►]/.test(l)).length;
  if (bulletLines >= 3) formatScore += 2;

  results.categories.push({
    name: 'Length & Formatting',
    score: Math.min(10, formatScore),
    maxScore: 10,
    icon: '📄',
    details: { wordCount, lineCount: lines.length, bulletPoints: bulletLines },
    color: '#06b6d4'
  });

  if (wordCount < 200) {
    results.suggestions.push({ priority: 'high', text: 'Your resume seems too short. Aim for 400-700 words for a comprehensive single-page resume.' });
  } else if (wordCount > 1000) {
    results.suggestions.push({ priority: 'medium', text: 'Your resume may be too long. Keep it concise — 1-2 pages max for most roles.' });
  }

  if (bulletLines < 3) {
    results.suggestions.push({ priority: 'low', text: 'Use bullet points to organize your experience — it helps both ATS and human readers scan quickly.' });
  }

  // Calculate total
  results.totalScore = results.categories.reduce((sum, c) => sum + c.score, 0);
  results.stats = {
    wordCount,
    lineCount: lines.length,
    keywordCount: foundKeywords.length,
    sectionCount: foundSections.length,
    verbCount: foundVerbs.length,
    quantCount
  };

  // Sort suggestions by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  results.suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return results;
}

// ---- Extract skills list from text for job matching ----
export function extractSkills(text) {
  const lower = text.toLowerCase();
  return ATS_KEYWORDS.filter(kw => lower.includes(kw)).filter(kw =>
    !['experience', 'developed', 'implemented', 'managed', 'designed',
      'optimized', 'achieved', 'increased', 'reduced', 'delivered',
      'led', 'coordinated', 'analyzed', 'built', 'bachelor', 'master',
      'degree', 'certification', 'certified', 'internship'].includes(kw)
  );
}
