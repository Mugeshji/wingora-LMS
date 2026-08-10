import { jsPDF } from 'jspdf';
import { TEMPLATE_CONFIGS, SECTION_ORDER, detectExperienceYears } from './resumeTemplateConfigs';

// === CORE UTILITIES ===
function newPage(doc, cfg) { doc.addPage(); return cfg.margins[0]; }

function checkPage(doc, y, need, cfg) {
  const pageH = doc.internal.pageSize.getHeight();
  if (y + need > pageH - cfg.margins[3]) return newPage(doc, cfg);
  return y;
}

function printWrapped(doc, text, x, y, maxW, cfg, size, style, color) {
  doc.setFont(cfg.font, style || 'normal');
  doc.setFontSize(size || cfg.bodySize);
  doc.setTextColor(...(color || [50,50,50]));
  const lines = doc.splitTextToSize(text, maxW);
  const lh = (size || cfg.bodySize) * 0.42;
  lines.forEach(line => {
    y = checkPage(doc, y, lh + 1.5, cfg);
    doc.text(line, x, y);
    y += lh + 1;
  });
  return y + 1;
}

// === HEADER RENDERERS ===
function renderHeader(doc, data, cfg, tid) {
  const pw = doc.internal.pageSize.getWidth();
  const [mt, ml, mr] = cfg.margins;
  const usable = pw - ml - mr;
  let y = mt;
  const name = data.name || 'Your Name';
  const contactStr = data.contact.filter(c => c).join(cfg.contactSep);

  if (cfg.nameAlign === 'center') {
    doc.setFont(cfg.font, 'bold'); doc.setFontSize(cfg.nameSize); doc.setTextColor(0,0,0);
    doc.text(name, pw/2, y, {align:'center'}); y += cfg.nameSize * 0.5;
    doc.setFont(cfg.font, 'normal'); doc.setFontSize(9); doc.setTextColor(80,80,80);
    const cLines = doc.splitTextToSize(contactStr, usable);
    cLines.forEach(l => { doc.text(l, pw/2, y, {align:'center'}); y += 4.5; });
    y += 2;
  } else if (cfg.nameAlign === 'split') {
    doc.setFont(cfg.font, 'bold'); doc.setFontSize(cfg.nameSize); doc.setTextColor(0,0,0);
    doc.text(name, ml, y); 
    doc.setFont(cfg.font, 'normal'); doc.setFontSize(8.5); doc.setTextColor(80,80,80);
    const cParts = data.contact.filter(c => c);
    let cy = mt;
    cParts.slice(0,3).forEach(c => { doc.text(c, pw - mr, cy, {align:'right'}); cy += 4; });
    y += cfg.nameSize * 0.5;
    y = Math.max(y, cy + 2);
  } else if (cfg.nameAlign === 'sidebar') {
    // Two-column: render in sidebar
    const sw = cfg.sidebarW || 65;
    const ph = doc.internal.pageSize.getHeight();
    doc.setFillColor(245,245,245); doc.rect(0, 0, sw, ph, 'F');
    doc.setDrawColor(220,220,220); doc.line(sw, 0, sw, ph);
    doc.setFont(cfg.font, 'bold'); doc.setFontSize(cfg.nameSize); doc.setTextColor(0,0,0);
    const nameLines = doc.splitTextToSize(name, sw - ml - 5);
    nameLines.forEach(l => { doc.text(l, ml, y); y += 5.5; }); y += 3;
    doc.setFont(cfg.font, 'normal'); doc.setFontSize(8); doc.setTextColor(70,70,70);
    data.contact.forEach(c => {
      if (!c) return;
      const parts = doc.splitTextToSize(c, sw - ml - 5);
      parts.forEach(p => { doc.text(p, ml, y); y += 4; }); y += 1;
    }); y += 3;
  } else {
    // Left aligned
    doc.setFont(cfg.font, 'bold'); doc.setFontSize(cfg.nameSize); doc.setTextColor(0,0,0);
    doc.text(name, ml, y); y += cfg.nameSize * 0.5;
    doc.setFont(cfg.font, 'normal'); doc.setFontSize(8.5); doc.setTextColor(80,80,80);
    doc.text(contactStr, ml, y); y += 6;
  }

  // Header divider
  if (cfg.divider === 'single') {
    doc.setDrawColor(160,160,160); doc.setLineWidth(0.3);
    doc.line(ml, y, pw-mr, y); y += 4;
  } else if (cfg.divider === 'double' || cfg.divider === 'double-elegant') {
    doc.setDrawColor(80,80,80); doc.setLineWidth(0.4);
    doc.line(ml, y, pw-mr, y); doc.line(ml, y+1.5, pw-mr, y+1.5); y += 5;
  } else if (cfg.divider === 'thick') {
    doc.setDrawColor(40,40,40); doc.setLineWidth(0.8);
    doc.line(ml, y, pw-mr, y); y += 5;
  } else if (cfg.divider === 'thin') {
    doc.setDrawColor(200,200,200); doc.setLineWidth(0.15);
    doc.line(ml, y, pw-mr, y); y += 4;
  }
  return y;
}

// === SECTION HEADER RENDERER ===
function renderSectionHead(doc, title, y, cfg, tid) {
  const pw = doc.internal.pageSize.getWidth();
  const [,ml,mr] = cfg.margins;
  y = checkPage(doc, y, 12, cfg);
  y += 3;
  doc.setFont(cfg.font, 'bold'); doc.setFontSize(cfg.sectionStyle === 'left-underline' ? 11.5 : 11);
  doc.setTextColor(0,0,0);
  const t = title.toUpperCase();

  switch(cfg.sectionStyle) {
    case 'center-rule':
      doc.text(t, pw/2, y, {align:'center'});
      doc.setDrawColor(170,170,170); doc.setLineWidth(0.2);
      doc.line(ml, y+2, pw-mr, y+2); y += 6; break;
    case 'left-rule':
      doc.text(t, ml, y);
      doc.setDrawColor(190,190,190); doc.setLineWidth(0.25);
      doc.line(ml, y+2, pw-mr, y+2); y += 6; break;
    case 'accent-bar':
      doc.setFillColor(40,40,40); doc.rect(ml, y-3.5, 2.5, 5, 'F');
      doc.text(t, ml+6, y); y += 6; break;
    case 'double-rule':
      doc.setDrawColor(80,80,80); doc.setLineWidth(0.3);
      doc.line(ml, y-2, pw-mr, y-2);
      doc.text(t, ml, y+1);
      doc.line(ml, y+3, pw-mr, y+3); y += 7; break;
    case 'left-underline':
      doc.text(t, ml, y);
      doc.setDrawColor(100,100,100); doc.setLineWidth(0.5);
      doc.line(ml, y+2, pw-mr, y+2); y += 7; break;
    case 'bold-bottom':
      doc.text(t, ml, y);
      doc.setDrawColor(30,30,30); doc.setLineWidth(0.6);
      doc.line(ml, y+2.5, ml + doc.getTextWidth(t), y+2.5); y += 7; break;
    default:
      doc.text(t, ml, y);
      doc.setDrawColor(190,190,190); doc.setLineWidth(0.2);
      doc.line(ml, y+2, pw-mr, y+2); y += 6;
  }
  return y;
}

// === BULLET RENDERER ===
function renderBullets(doc, items, y, cfg, xStart, maxW) {
  const [,ml] = cfg.margins;
  const x = xStart || ml;
  const w = maxW || (doc.internal.pageSize.getWidth() - ml - cfg.margins[2] - 5);
  items.forEach(item => {
    if (!item) return;
    const clean = item.replace(/^[•\-\*▪▸►]\s*/, '');
    if (!clean) return;
    doc.setFont(cfg.font, 'normal'); doc.setFontSize(cfg.bodySize); doc.setTextColor(55,55,55);
    const wrapped = doc.splitTextToSize(clean, w);
    y = checkPage(doc, y, wrapped.length * cfg.lineH + 1.5, cfg);
    doc.setFillColor(0,0,0); doc.circle(x + 1.5, y - 0.8, 0.6, 'F');
    doc.text(wrapped, x + 5, y);
    y += wrapped.length * cfg.lineH + 1;
  });
  return y + 1.5;
}

// === SKILLS RENDERER ===
function renderSkills(doc, skills, y, cfg) {
  const pw = doc.internal.pageSize.getWidth();
  const [,ml,mr] = cfg.margins;
  const usable = pw - ml - mr;

  if (cfg.skillsDisplay === 'grid') {
    const cols = 3;
    const colW = usable / cols;
    for (let i = 0; i < skills.length; i += cols) {
      y = checkPage(doc, y, 5.5, cfg);
      const chunk = skills.slice(i, i + cols);
      chunk.forEach((s, idx) => {
        doc.setFont(cfg.font, 'normal'); doc.setFontSize(cfg.bodySize); doc.setTextColor(55,55,55);
        doc.setFillColor(0,0,0); doc.circle(ml + idx*colW + 1.5, y - 0.6, 0.5, 'F');
        doc.text(s, ml + idx*colW + 4, y);
      });
      y += 5;
    }
  } else if (cfg.skillsDisplay === 'bullets') {
    skills.forEach(s => {
      y = checkPage(doc, y, 5, cfg);
      doc.setFont(cfg.font, 'normal'); doc.setFontSize(cfg.bodySize); doc.setTextColor(55,55,55);
      doc.setFillColor(0,0,0); doc.circle(ml + 1.5, y - 0.6, 0.5, 'F');
      doc.text(s, ml + 5, y);
      y += cfg.lineH;
    });
  } else {
    // comma separated
    const str = skills.join(',  ');
    y = printWrapped(doc, str, ml, y, usable, cfg, cfg.bodySize, 'normal', [55,55,55]);
  }
  return y + 2;
}

// === EXPERIENCE BLOCK RENDERER ===
function renderExpBlock(doc, lines, y, cfg, xStart, maxW) {
  const [,ml,mr] = cfg.margins;
  const pw = doc.internal.pageSize.getWidth();
  const x = xStart || ml;
  const w = maxW || (pw - ml - mr);
  let bullets = [];

  const flushBullets = () => {
    if (bullets.length > 0) { y = renderBullets(doc, bullets, y, cfg, x, w - 5); bullets = []; }
  };

  lines.forEach(line => {
    if (!line) return;
    const isBullet = /^[•\-\*▪▸►]/.test(line);
    if (isBullet) {
      bullets.push(line);
    } else {
      flushBullets();
      const hasDate = /—|\||\d{4}/.test(line);
      y = checkPage(doc, y, 6, cfg);
      doc.setFont(cfg.font, hasDate ? 'bold' : 'normal');
      doc.setFontSize(hasDate ? cfg.bodySize + 0.8 : cfg.bodySize);
      doc.setTextColor(hasDate ? 30 : 55, hasDate ? 30 : 55, hasDate ? 30 : 55);
      const wrapped = doc.splitTextToSize(line, w);
      wrapped.forEach(wl => { doc.text(wl, x, y); y += cfg.lineH; });
      y += 0.5;
    }
  });
  flushBullets();
  return y;
}

// === TWO-COLUMN TEMPLATE SPECIAL RENDERER ===
function renderTwoColumn(doc, data, cfg, expYears) {
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const [mt, ml, mr, mb] = cfg.margins;
  const sw = cfg.sidebarW || 65;

  // Header already rendered, get starting Y
  let sideY = renderHeader(doc, data, cfg, 'twocolumn');

  // === SIDEBAR: Skills ===
  if (data.skills.length > 0) {
    doc.setFont(cfg.font, 'bold'); doc.setFontSize(10); doc.setTextColor(0,0,0);
    doc.text('SKILLS', ml, sideY); 
    doc.setDrawColor(180,180,180); doc.setLineWidth(0.2);
    doc.line(ml, sideY+2, sw-5, sideY+2); sideY += 6;
    data.skills.forEach(s => {
      doc.setFont(cfg.font, 'normal'); doc.setFontSize(8); doc.setTextColor(60,60,60);
      doc.text('• ' + s, ml, sideY); sideY += 4;
    });
    sideY += 4;
  }

  // Sidebar: Certifications
  if (data.certifications.length > 0) {
    doc.setFont(cfg.font, 'bold'); doc.setFontSize(10); doc.setTextColor(0,0,0);
    doc.text('CERTIFICATIONS', ml, sideY);
    doc.setDrawColor(180,180,180); doc.line(ml, sideY+2, sw-5, sideY+2); sideY += 6;
    data.certifications.forEach(c => {
      if (!c) return;
      const clean = c.replace(/^[•\-\*▪▸►]\s*/, '');
      doc.setFont(cfg.font, 'normal'); doc.setFontSize(8); doc.setTextColor(60,60,60);
      const lines = doc.splitTextToSize(clean, sw - ml - 8);
      lines.forEach(l => { doc.text(l, ml, sideY); sideY += 3.8; });
      sideY += 1;
    });
  }

  // === MAIN COLUMN ===
  const rx = sw + 8;
  const rw = pw - rx - mr;
  let y = mt + 2;

  const printMainSection = (title) => {
    y = checkPage(doc, y, 12, cfg);
    y += 3;
    doc.setFont(cfg.font, 'bold'); doc.setFontSize(10.5); doc.setTextColor(0,0,0);
    doc.text(title.toUpperCase(), rx, y);
    doc.setDrawColor(190,190,190); doc.setLineWidth(0.2);
    doc.line(rx, y+2, pw-mr, y+2); y += 6;
  };

  if (data.summary) {
    printMainSection('Professional Summary');
    y = printWrapped(doc, data.summary, rx, y, rw, cfg, 9, 'normal', [55,55,55]);
  }
  if (data.experience.length > 0) {
    printMainSection('Experience');
    y = renderExpBlock(doc, data.experience, y, cfg, rx, rw);
  }
  if (data.projects.length > 0) {
    printMainSection('Projects');
    y = renderExpBlock(doc, data.projects, y, cfg, rx, rw);
  }
  if (data.education.length > 0) {
    printMainSection('Education');
    y = renderExpBlock(doc, data.education, y, cfg, rx, rw);
  }
  return y;
}

// === MAIN EXPORT ===
export function generateProfessionalPDF(data, templateId, expYears) {
  const cfg = TEMPLATE_CONFIGS[templateId] || TEMPLATE_CONFIGS.harvard;
  const [mt, ml, mr, mb] = cfg.margins;

  // Adjust spacing for < 4 years experience (compact to 1-2 pages)
  const compact = expYears < 4;
  if (compact) {
    cfg.lineH = Math.max(cfg.lineH - 0.5, 3.5);
    cfg.bodySize = Math.max(cfg.bodySize - 0.3, 8.5);
  }

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const usable = pw - ml - mr;

  let y;

  // Two-column is a special layout
  if (templateId === 'twocolumn') {
    renderTwoColumn(doc, data, cfg, expYears);
  } else {
    y = renderHeader(doc, data, cfg, templateId);
    const order = SECTION_ORDER[templateId] || SECTION_ORDER.harvard;

    order.forEach(section => {
      switch(section) {
        case 'summary':
          if (data.summary) {
            y = renderSectionHead(doc, 'Professional Summary', y, cfg, templateId);
            y = printWrapped(doc, data.summary, ml, y, usable, cfg, cfg.bodySize, 'normal', [55,55,55]);
            y += 2;
          }
          break;
        case 'skills':
          if (data.skills.length > 0) {
            y = renderSectionHead(doc, templateId === 'tech' ? 'Core Competencies' : 'Technical Skills', y, cfg, templateId);
            y = renderSkills(doc, data.skills, y, cfg);
          }
          break;
        case 'experience':
          if (data.experience.length > 0) {
            y = renderSectionHead(doc, 'Professional Experience', y, cfg, templateId);
            y = renderExpBlock(doc, data.experience, y, cfg);
          }
          break;
        case 'education':
          if (data.education.length > 0) {
            y = renderSectionHead(doc, 'Education', y, cfg, templateId);
            y = renderExpBlock(doc, data.education, y, cfg);
          }
          break;
        case 'projects':
          if (data.projects.length > 0) {
            y = renderSectionHead(doc, 'Projects', y, cfg, templateId);
            y = renderExpBlock(doc, data.projects, y, cfg);
          }
          break;
        case 'certifications':
          if (data.certifications.length > 0) {
            y = renderSectionHead(doc, 'Certifications', y, cfg, templateId);
            y = renderExpBlock(doc, data.certifications, y, cfg);
          }
          break;
      }
    });
  }

  // Page numbers & footer
  const total = doc.internal.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFont(cfg.font, 'normal'); doc.setFontSize(7.5); doc.setTextColor(150,150,150);
    doc.text('ATS Compliant Resume  |  Generated by Wingora LMS', ml, ph - 8);
    doc.text(`Page ${i} of ${total}`, pw - mr - 18, ph - 8);
  }

  doc.save('Professional_Resume.pdf');
}
