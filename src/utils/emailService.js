// ============================================================
// Email Service — EmailJS Integration for daily job alerts
// ============================================================
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from './config.js';

let initialized = false;

function initEmailJS() {
  if (!initialized && EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    initialized = true;
  }
}

export async function sendJobAlertEmail({ toEmail, userName, jobs, role, location }) {
  initEmailJS();

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS not configured. Set keys in src/utils/config.js');
    return { success: false, error: 'EmailJS not configured' };
  }

  const jobListHTML = jobs.slice(0, 10).map((job, i) =>
    `<tr><td style="padding:8px;border-bottom:1px solid #eee">${i+1}</td>` +
    `<td style="padding:8px;border-bottom:1px solid #eee"><b>${job.company}</b></td>` +
    `<td style="padding:8px;border-bottom:1px solid #eee">${job.title}</td>` +
    `<td style="padding:8px;border-bottom:1px solid #eee">${job.location}</td>` +
    `<td style="padding:8px;border-bottom:1px solid #eee">${job.requiredSkills?.join(', ') || 'N/A'}</td>` +
    `<td style="padding:8px;border-bottom:1px solid #eee"><a href="${job.applyLink}">Apply</a></td></tr>`
  ).join('');

  const templateParams = {
    to_email: toEmail,
    to_name: userName || 'Student',
    job_role: role,
    job_location: location,
    date: new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    job_table: `<table style="width:100%;border-collapse:collapse;font-size:14px">` +
      `<tr style="background:#7c3aed;color:white"><th style="padding:10px">#</th><th style="padding:10px">Company</th>` +
      `<th style="padding:10px">Role</th><th style="padding:10px">Location</th>` +
      `<th style="padding:10px">Skills</th><th style="padding:10px">Apply</th></tr>` +
      jobListHTML + `</table>`,
    message: `Here are today's top ${jobs.length} fresh job opportunities for ${role} in ${location}.`
  };

  try {
    const result = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    return { success: true, result };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.text || error.message };
  }
}

export function saveEmailPreferences(prefs, userSuffix = '') {
  localStorage.setItem(`wingora_email_prefs${userSuffix}`, JSON.stringify({
    ...prefs, savedAt: Date.now()
  }));
}

export function getEmailPreferences(userSuffix = '') {
  try {
    const saved = localStorage.getItem(`wingora_email_prefs${userSuffix}`);
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}
