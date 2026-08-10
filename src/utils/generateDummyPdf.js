import { jsPDF } from 'jspdf';
import * as fs from 'fs';

const doc = new jsPDF();
doc.text('John Doe', 10, 10);
doc.text('john.doe@email.com', 10, 20);
doc.text('linkedin.com/in/johndoe', 10, 30);
doc.text('EDUCATION', 10, 40);
doc.text('Bachelor of Science in Computer Science', 10, 50);
doc.text('EXPERIENCE', 10, 60);
doc.text('Developed java and react web applications.', 10, 70);
doc.text('SKILLS', 10, 80);
doc.text('java, react, javascript, html, css, sql', 10, 90);

const pdfData = doc.output('arraybuffer');
fs.writeFileSync('e:\\FRONDEND\\wingora-LMS\\dummy_resume.pdf', Buffer.from(pdfData));
console.log('Dummy PDF created successfully.');
