// ============================================================
// Job Search API — JSearch (RapidAPI) Integration
// ============================================================
import { JSEARCH_API_KEY, JSEARCH_API_HOST } from './config.js';

export async function searchJobs({ role, experience, location, page = 1 }) {
  let query = role;
  if (experience === 'fresher') query += ' fresher entry level junior';
  else if (experience && experience !== 'fresher') query += ` ${experience} years experience`;

  const params = new URLSearchParams({
    query, page: page.toString(), num_pages: '1', date_posted: 'today',
    ...(location && location !== 'remote' ? { country: 'IN' } : {}),
    ...(location === 'remote' ? { remote_jobs_only: 'true' } : {})
  });

  if (!JSEARCH_API_KEY) return getDemoJobs(role, location);

  try {
    const res = await fetch(`https://${JSEARCH_API_HOST}/search?${params}`, {
      headers: { 'x-rapidapi-key': JSEARCH_API_KEY, 'x-rapidapi-host': JSEARCH_API_HOST }
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    const data = await res.json();
    return (data.data || []).slice(0, 10).map(normalizeJob);
  } catch (e) {
    console.error('Job search error:', e);
    return getDemoJobs(role, location);
  }
}

function normalizeJob(job) {
  return {
    id: job.job_id || Math.random().toString(36).substr(2),
    title: job.job_title || 'Unknown Title',
    company: job.employer_name || 'Unknown Company',
    companyLogo: job.employer_logo || null,
    location: job.job_city ? `${job.job_city}${job.job_state ? ', ' + job.job_state : ''}, ${job.job_country || ''}` : (job.job_is_remote ? 'Remote' : 'Not specified'),
    isRemote: job.job_is_remote || false,
    description: job.job_description || '',
    requiredSkills: extractJobSkills(job.job_description || '', job.job_highlights?.Qualifications || []),
    applyLink: job.job_apply_link || job.job_google_link || '#',
    postedDate: job.job_posted_at_datetime_utc ? new Date(job.job_posted_at_datetime_utc).toLocaleDateString() : 'Recent',
    salary: job.job_min_salary && job.job_max_salary ? `₹${fmtSal(job.job_min_salary)} - ${fmtSal(job.job_max_salary)} /year` : null,
    employmentType: job.job_employment_type || 'Full-time',
    source: job.job_publisher || 'Job Board'
  };
}

function fmtSal(n) { return n >= 100000 ? (n/100000).toFixed(1)+'L' : n >= 1000 ? (n/1000).toFixed(0)+'K' : n.toString(); }

function extractJobSkills(desc, quals = []) {
  const text = (desc + ' ' + quals.join(' ')).toLowerCase();
  const skills = ['java','python','javascript','react','angular','vue','node.js','nodejs','sql','mysql','postgresql','mongodb','html','css','typescript','spring','spring boot','docker','kubernetes','aws','azure','gcp','git','agile','scrum','rest api','graphql','microservices','ci/cd','jenkins','devops','linux','machine learning','data science','django','flask','express','redis','c++','c#','.net','go','kotlin','flutter','react native','android','ios'];
  return skills.filter(s => text.includes(s));
}

export function calculateSkillMatch(userSkills, jobSkills) {
  if (!jobSkills || jobSkills.length === 0) return 0;
  const userSet = new Set(userSkills.map(s => s.toLowerCase()));
  return Math.round((jobSkills.filter(s => userSet.has(s.toLowerCase())).length / jobSkills.length) * 100);
}

export function getSkillBreakdown(userSkills, jobSkills) {
  const userSet = new Set(userSkills.map(s => s.toLowerCase()));
  return { matched: jobSkills.filter(s => userSet.has(s.toLowerCase())), missing: jobSkills.filter(s => !userSet.has(s.toLowerCase())) };
}

export function getCachedJobs(suffix = '') {
  const key = `wingora_job_cache_${new Date().toISOString().split('T')[0]}${suffix}`;
  try { const c = localStorage.getItem(key); return c ? JSON.parse(c) : null; } catch { return null; }
}

export function setCachedJobs(jobs, suffix = '') {
  const key = `wingora_job_cache_${new Date().toISOString().split('T')[0]}${suffix}`;
  localStorage.setItem(key, JSON.stringify(jobs));
}

function getDemoJobs(role, location) {
  const companies = [
    { name: 'Infosys', city: 'Bangalore' }, { name: 'TCS', city: 'Chennai' },
    { name: 'Wipro', city: 'Hyderabad' }, { name: 'HCL Technologies', city: 'Noida' },
    { name: 'Tech Mahindra', city: 'Pune' }, { name: 'Cognizant', city: 'Chennai' },
    { name: 'Accenture', city: 'Bangalore' }, { name: 'Capgemini', city: 'Mumbai' },
    { name: 'Mindtree', city: 'Bangalore' }, { name: 'L&T Infotech', city: 'Mumbai' }
  ];
  const skillMap = {
    'frontend': ['react','javascript','html','css','typescript','git'],
    'backend': ['java','spring','python','sql','rest api','docker','git'],
    'fullstack': ['react','node.js','javascript','sql','mongodb','docker'],
    'devops': ['docker','kubernetes','aws','jenkins','ci/cd','linux'],
    'data science': ['python','machine learning','sql','tensorflow','tableau'],
  };
  const rl = role.toLowerCase();
  const skills = skillMap[rl] || ['java','python','sql','javascript','html','css','git'];
  return companies.map((c, i) => ({
    id: `demo_${i}_${Date.now()}`, title: `${role} Developer`, company: c.name, companyLogo: null,
    location: location && location !== 'remote' ? location : c.city + ', India', isRemote: location === 'remote',
    description: `Looking for a skilled ${role} developer at ${c.name}.`,
    requiredSkills: skills.slice(0, 4 + Math.floor(Math.random() * 3)),
    applyLink: `https://www.naukri.com/${role.toLowerCase().replace(/\s/g,'-')}-jobs`,
    postedDate: 'Today', salary: `₹${(3+i*0.5).toFixed(1)}L - ₹${(6+i).toFixed(1)}L /year`,
    employmentType: 'Full-time', source: i % 2 === 0 ? 'Naukri' : 'Indeed'
  }));
}
