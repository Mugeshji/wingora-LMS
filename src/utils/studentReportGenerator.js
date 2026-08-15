import { jsPDF } from 'jspdf';
import { javaBasics } from '../data/javaBasics';
import { oopsConcepts } from '../data/oops';
import { dsaProblems } from '../data/dsaProblems';

/**
 * Cross-browser safe rounded rectangle drawing helper for HTML5 Canvas.
 */
function drawRoundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Generates and downloads a real-time, visual PDF Student Performance Report.
 * Contains up-to-date live statistics, Donut/Pie charts, and Bar diagrams.
 * @param {string|null} targetUserID - Optional target student UserID. Defaults to active logged in user.
 */
export function generateStudentReportPDF(targetUserID = null) {
  try {
    // 1. Sanitize input to ensure event objects from onClick are ignored
    const validTargetID = (typeof targetUserID === 'string' && targetUserID.trim()) ? targetUserID.trim() : null;

    // Fetch target student state from localStorage
    let activeUser = null;
    try {
      activeUser = JSON.parse(localStorage.getItem('wingora_active_user') || 'null');
    } catch (e) {
      activeUser = null;
    }

    const effectiveUserID = validTargetID || activeUser?.userID || 'TC0001';
    const userSuffix = effectiveUserID ? `_${effectiveUserID}` : '';

    const getSyncItem = (key, fallbackDefault = '[]') => {
      try {
        const saved = localStorage.getItem(`${key}${userSuffix}`) || localStorage.getItem(key);
        return saved || fallbackDefault;
      } catch (e) {
        return fallbackDefault;
      }
    };

    const getSyncInt = (key, fallbackDefault = 0) => {
      try {
        const saved = localStorage.getItem(`${key}${userSuffix}`) || localStorage.getItem(key);
        return saved ? parseInt(saved, 10) : fallbackDefault;
      } catch (e) {
        return fallbackDefault;
      }
    };

    const getDisplayName = (id) => {
      if (!id) return 'Student';
      if (id.toUpperCase() === 'TC0001') return 'Nithya';
      if (id.toUpperCase() === 'TC0002') return 'Krishna';
      try {
        const students = JSON.parse(localStorage.getItem('wingora_students') || '[]');
        const match = students.find(s => s.userID && s.userID.toUpperCase() === id.toUpperCase());
        if (match && match.password) {
          return match.password.replace(/123/g, '');
        }
      } catch (e) {}
      return id;
    };

    const studentName = getDisplayName(effectiveUserID);
    const studentID = effectiveUserID;

    // Live Metrics Collection
    let completedJava = [];
    let completedOops = [];
    let completedDsa = [];
    try { completedJava = JSON.parse(getSyncItem('completed_java', '[]')); } catch (e) { completedJava = []; }
    try { completedOops = JSON.parse(getSyncItem('completed_oops', '[]')); } catch (e) { completedOops = []; }
    try { completedDsa = JSON.parse(getSyncItem('completed_dsa', '[]')); } catch (e) { completedDsa = []; }
    if (!Array.isArray(completedJava)) completedJava = [];
    if (!Array.isArray(completedOops)) completedOops = [];
    if (!Array.isArray(completedDsa)) completedDsa = [];

    const completedInterviews = getSyncInt('completed_interviews', 0);

    // MCQ Scores
    const javaHighScore = getSyncInt('wingora_quiz_highscore_java', 0);
    const htmlHighScore = getSyncInt('wingora_quiz_highscore_html', 0);
    const cssHighScore = getSyncInt('wingora_quiz_highscore_css', 0);
    const jsHighScore = getSyncInt('wingora_quiz_highscore_js', 0);
    const jdbcHighScore = getSyncInt('wingora_quiz_highscore_jdbc', 0);
    const bestMcqScore = Math.max(javaHighScore, htmlHighScore, cssHighScore, jsHighScore, jdbcHighScore);
    const bestMcqPercent = Math.round((bestMcqScore / 25) * 100);

    // TCS Coding
    let tcsCodingProgressRaw = {};
    try { tcsCodingProgressRaw = JSON.parse(getSyncItem('wingora_tcs_progress_coding', '{}')); } catch (e) { tcsCodingProgressRaw = {}; }
    const tcsCodingCompletedDays = Object.values(tcsCodingProgressRaw || {}).filter(d => d && d.status === 'completed').length;
    const tcsCodingPercent = Math.round((tcsCodingCompletedDays / 75) * 100);

    let tcsCodingMetaRaw = {};
    try { tcsCodingMetaRaw = JSON.parse(getSyncItem('wingora_tcs_user_meta_coding', '{}')); } catch (e) { tcsCodingMetaRaw = {}; }
    const streakCount = tcsCodingMetaRaw.streak_count || 0;

    // TCS Aptitude
    let tcsAptitudeProgressRaw = {};
    try { tcsAptitudeProgressRaw = JSON.parse(getSyncItem('wingora_tcs_aptitude_progress', '{}')); } catch (e) { tcsAptitudeProgressRaw = {}; }
    let tcsAptitudeCompletedSheets = 0;
    Object.keys(tcsAptitudeProgressRaw || {}).forEach(cat => {
      const catProg = tcsAptitudeProgressRaw[cat] || {};
      tcsAptitudeCompletedSheets += Object.values(catProg).filter(d => d && d.status === 'completed').length;
    });
    const tcsAptitudePercent = Math.round((tcsAptitudeCompletedSheets / 225) * 100);

    // Totals & Percentages
    const totalJavaProblems = (javaBasics || []).reduce((acc, cat) => acc + (cat.problems ? cat.problems.length : 0), 0);
    const totalOopsProblems = (oopsConcepts || []).reduce((acc, cat) => acc + (cat.problems ? cat.problems.length : 0), 0);
    const totalDsaProblems = (dsaProblems || []).length;

    const javaPercent = totalJavaProblems > 0 ? Math.round((completedJava.length / totalJavaProblems) * 100) : 0;
    const oopsPercent = totalOopsProblems > 0 ? Math.round((completedOops.length / totalOopsProblems) * 100) : 0;
    const dsaPercent = totalDsaProblems > 0 ? Math.round((completedDsa.length / totalDsaProblems) * 100) : 0;

    const totalItemsSolved = tcsCodingCompletedDays + tcsAptitudeCompletedSheets + completedJava.length + completedOops.length + completedDsa.length + completedInterviews;
    const totalCurriculumItems = 75 + 225 + totalJavaProblems + totalOopsProblems + totalDsaProblems;
    const overallPercent = Math.round((totalItemsSolved / totalCurriculumItems) * 100);

    const developerLevel = Math.max(1, Math.min(100, Math.floor(totalItemsSolved / 2) + 1));
    const rankXP = totalItemsSolved * 10;
    const levelTitle = developerLevel < 10 ? 'Novice Coder' : developerLevel < 25 ? 'Code Ninja' : developerLevel < 50 ? 'DSA Specialist' : developerLevel < 80 ? 'System Architect' : 'Legendary Engineer';

    // 2. Render Bar Chart Canvas
    const barCanvas = document.createElement('canvas');
    barCanvas.width = 900;
    barCanvas.height = 420;
    const ctxBar = barCanvas.getContext('2d');

    // Draw Bar Chart Background
    ctxBar.fillStyle = '#0f172a';
    ctxBar.fillRect(0, 0, 900, 420);

    ctxBar.font = 'bold 20px sans-serif';
    ctxBar.fillStyle = '#f8fafc';
    ctxBar.fillText('MODULE PROGRESS OVERVIEW (%)', 30, 40);

    const modules = [
      { label: 'TCS 75-Day Coding', percent: tcsCodingPercent, count: `${tcsCodingCompletedDays}/75`, color: '#f97316' },
      { label: 'TCS Aptitude & Logic', percent: tcsAptitudePercent, count: `${tcsAptitudeCompletedSheets}/225`, color: '#38bdf8' },
      { label: 'Core Java Basics', percent: javaPercent, count: `${completedJava.length}/${totalJavaProblems}`, color: '#c084fc' },
      { label: 'OOPs Concepts', percent: oopsPercent, count: `${completedOops.length}/${totalOopsProblems}`, color: '#818cf8' },
      { label: 'DSA Practice', percent: dsaPercent, count: `${completedDsa.length}/${totalDsaProblems}`, color: '#34d399' },
      { label: 'MCQ Best Score', percent: bestMcqPercent, count: `${bestMcqScore}/25`, color: '#60a5fa' },
    ];

    const barStartY = 70;
    const barHeight = 32;
    const barGap = 24;
    const maxBarWidth = 500;

    modules.forEach((mod, idx) => {
      const y = barStartY + idx * (barHeight + barGap);

      // Label
      ctxBar.font = '600 15px sans-serif';
      ctxBar.fillStyle = '#cbd5e1';
      ctxBar.fillText(mod.label, 30, y + 21);

      // Track Background
      ctxBar.fillStyle = '#1e293b';
      drawRoundRect(ctxBar, 240, y, maxBarWidth, barHeight, 6);
      ctxBar.fill();

      // Fill Bar
      const filledWidth = Math.max(12, (mod.percent / 100) * maxBarWidth);
      ctxBar.fillStyle = mod.color;
      drawRoundRect(ctxBar, 240, y, filledWidth, barHeight, 6);
      ctxBar.fill();

      // Value text
      ctxBar.font = 'bold 15px sans-serif';
      ctxBar.fillStyle = '#ffffff';
      ctxBar.fillText(`${mod.percent}%`, 240 + maxBarWidth + 18, y + 21);

      ctxBar.font = '13px sans-serif';
      ctxBar.fillStyle = '#94a3b8';
      ctxBar.fillText(`(${mod.count})`, 240 + maxBarWidth + 75, y + 21);
    });

    const barImgData = barCanvas.toDataURL('image/png');

    // 3. Render Donut / Pie Chart Canvas
    const pieCanvas = document.createElement('canvas');
    pieCanvas.width = 540;
    pieCanvas.height = 420;
    const ctxPie = pieCanvas.getContext('2d');

    ctxPie.fillStyle = '#0f172a';
    ctxPie.fillRect(0, 0, 540, 420);

    ctxPie.font = 'bold 20px sans-serif';
    ctxPie.fillStyle = '#f8fafc';
    ctxPie.fillText('SOLVED SHARE BY CATEGORY', 30, 40);

    const pieData = [
      { label: 'TCS Coding', value: Math.max(tcsCodingCompletedDays, 1), color: '#f97316', displayVal: tcsCodingCompletedDays },
      { label: 'TCS Aptitude', value: Math.max(tcsAptitudeCompletedSheets, 1), color: '#38bdf8', displayVal: tcsAptitudeCompletedSheets },
      { label: 'Core Java', value: Math.max(completedJava.length, 1), color: '#c084fc', displayVal: completedJava.length },
      { label: 'OOPs Blueprints', value: Math.max(completedOops.length, 1), color: '#818cf8', displayVal: completedOops.length },
      { label: 'DSA LeetCode', value: Math.max(completedDsa.length, 1), color: '#34d399', displayVal: completedDsa.length },
    ];

    const totalPieVal = pieData.reduce((acc, p) => acc + p.value, 0);
    const cx = 170;
    const cy = 230;
    const outerR = 120;
    const innerR = 65;

    let currentAngle = -Math.PI / 2;
    pieData.forEach(slice => {
      const sliceAngle = (slice.value / totalPieVal) * (Math.PI * 2);

      ctxPie.fillStyle = slice.color;
      ctxPie.beginPath();
      ctxPie.arc(cx, cy, outerR, currentAngle, currentAngle + sliceAngle);
      ctxPie.arc(cx, cy, innerR, currentAngle + sliceAngle, currentAngle, true);
      ctxPie.closePath();
      ctxPie.fill();

      currentAngle += sliceAngle;
    });

    // Center Text inside Donut Chart
    ctxPie.fillStyle = '#f8fafc';
    ctxPie.font = 'bold 26px sans-serif';
    ctxPie.textAlign = 'center';
    ctxPie.fillText(`${totalItemsSolved}`, cx, cy + 2);

    ctxPie.font = '12px sans-serif';
    ctxPie.fillStyle = '#94a3b8';
    ctxPie.fillText('TOTAL SOLVED', cx, cy + 20);
    ctxPie.textAlign = 'left';

    // Legend
    const legendX = 330;
    let legendY = 120;
    pieData.forEach(item => {
      ctxPie.fillStyle = item.color;
      ctxPie.fillRect(legendX, legendY, 14, 14);

      ctxPie.font = '600 14px sans-serif';
      ctxPie.fillStyle = '#e2e8f0';
      ctxPie.fillText(item.label, legendX + 22, legendY + 12);

      ctxPie.font = '12px sans-serif';
      ctxPie.fillStyle = '#94a3b8';
      ctxPie.fillText(`${item.displayVal} items`, legendX + 22, legendY + 28);

      legendY += 48;
    });

    const pieImgData = pieCanvas.toDataURL('image/png');

    // 4. Construct jsPDF Report Document
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pw = doc.internal.pageSize.getWidth(); // ~210mm
    const ph = doc.internal.pageSize.getHeight(); // ~297mm

    // Header Background Banner
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pw, 38, 'F');

    // Header Title & Logo
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(168, 85, 247); // Violet
    doc.text('WINGORA LMS', 14, 16);

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('Student Performance & Progress Report', 14, 25);

    const reportDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated: ${reportDate}`, pw - 14, 16, { align: 'right' });
    doc.text(`Report ID: WNG-${Date.now().toString().slice(-6)}`, pw - 14, 23, { align: 'right' });

    // Divider Accent Line
    doc.setDrawColor(168, 85, 247);
    doc.setLineWidth(0.8);
    doc.line(0, 38, pw, 38);

    // Student Profile Card Box
    let y = 46;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, y, pw - 28, 26, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`Student: ${studentName}`, 20, y + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`User ID: ${studentID}`, 20, y + 17);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(124, 58, 237);
    doc.text(`Level ${developerLevel} • ${levelTitle}`, pw - 20, y + 9, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Rank XP: ${rankXP} | Coding Streak: ${streakCount} Days`, pw - 20, y + 17, { align: 'right' });

    // 4 Metric Summary Tiles
    y += 32;
    const tileW = (pw - 28 - 9) / 4;
    const tileH = 18;

    const tileData = [
      { label: 'Total Solved', val: `${totalItemsSolved} items`, color: [249, 115, 22] },
      { label: 'Overall Progress', val: `${overallPercent}%`, color: [56, 189, 248] },
      { label: 'Best MCQ Score', val: `${bestMcqPercent}%`, color: [168, 85, 247] },
      { label: 'Coding Streak', val: `${streakCount} Days`, color: [52, 211, 153] },
    ];

    tileData.forEach((td, i) => {
      const tx = 14 + i * (tileW + 3);
      doc.setFillColor(241, 245, 249);
      doc.setDrawColor(...td.color);
      doc.setLineWidth(0.4);
      doc.roundedRect(tx, y, tileW, tileH, 2, 2, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(td.label.toUpperCase(), tx + 4, y + 6);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...td.color);
      doc.text(td.val, tx + 4, y + 13);
    });

    // Visual Diagrams Section
    y += 24;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('VISUAL PERFORMANCE ANALYTICS', 14, y);

    y += 4;
    // Embed Bar Chart PNG
    doc.addImage(barImgData, 'PNG', 14, y, 110, 52);

    // Embed Donut Chart PNG
    doc.addImage(pieImgData, 'PNG', 128, y, 68, 52);

    // Detailed Progress Breakdown Table
    y += 58;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('CURRICULUM BREAKDOWN TABLE', 14, y);

    y += 5;
    // Table Header
    doc.setFillColor(30, 41, 59);
    doc.rect(14, y, pw - 28, 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text('Curriculum Track', 18, y + 5);
    doc.text('Completed / Total', 85, y + 5);
    doc.text('Progress (%)', 130, y + 5);
    doc.text('Status', pw - 20, y + 5, { align: 'right' });

    y += 7;
    const tableRows = [
      { track: 'TCS 75-Day Coding', count: `${tcsCodingCompletedDays} / 75 Days`, pct: tcsCodingPercent },
      { track: 'TCS Aptitude & Reasoning', count: `${tcsAptitudeCompletedSheets} / 225 Sheets`, pct: tcsAptitudePercent },
      { track: 'Core Java Basics', count: `${completedJava.length} / ${totalJavaProblems} Concepts`, pct: javaPercent },
      { track: 'OOPs Design Concepts', count: `${completedOops.length} / ${totalOopsProblems} Patterns`, pct: oopsPercent },
      { track: 'DSA LeetCode Track', count: `${completedDsa.length} / ${totalDsaProblems} Solved`, pct: dsaPercent },
      { track: 'MCQ Evaluation Quiz', count: `Best: ${bestMcqScore} / 25 Marks`, pct: bestMcqPercent },
      { track: 'AI Mock Interview', count: `${completedInterviews} Sessions Done`, pct: completedInterviews > 0 ? 100 : 0 },
    ];

    tableRows.forEach((row, idx) => {
      const rowBg = idx % 2 === 0 ? [248, 250, 252] : [255, 255, 255];
      doc.setFillColor(...rowBg);
      doc.rect(14, y, pw - 28, 7, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text(row.track, 18, y + 5);
      doc.text(row.count, 85, y + 5);

      // Mini Progress Bar inside table
      doc.setFillColor(226, 232, 240);
      doc.rect(130, y + 2, 28, 3, 'F');

      const fillW = (row.pct / 100) * 28;
      doc.setFillColor(124, 58, 237);
      if (fillW > 0) doc.rect(130, y + 2, fillW, 3, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text(`${row.pct}%`, 161, y + 5);

      const statusText = row.pct >= 100 ? 'COMPLETED' : row.pct > 0 ? 'IN PROGRESS' : 'NOT STARTED';
      const statusColor = row.pct >= 100 ? [16, 185, 129] : row.pct > 0 ? [59, 130, 246] : [148, 163, 184];

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(...statusColor);
      doc.text(statusText, pw - 20, y + 5, { align: 'right' });

      y += 7;
    });

    // Official Seal & Footer Watermark
    y = ph - 18;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(14, y, pw - 14, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Official Verified Progress Report • Wingora Learning Management System', 14, y + 6);
    doc.text('Page 1 of 1', pw - 14, y + 6, { align: 'right' });

    // Download PDF
    const cleanFilename = `Wingora_Student_Report_${studentName.replace(/\s+/g, '_')}.pdf`;
    doc.save(cleanFilename);
  } catch (err) {
    console.error('Failed to generate student report PDF:', err);
    alert('Could not generate PDF report. Please check browser permissions.');
  }
}
