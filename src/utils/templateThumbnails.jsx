import React from 'react';

// Miniature SVG representations of each resume template layout
// These show the general structure/layout pattern at a glance

const C = { bg: '#ffffff', line: '#d1d5db', text: '#374151', textLight: '#9ca3af', accent: '#111827', sidebar: '#f3f4f6' };

const Bar = ({ x, y, w, h = 2, fill = C.text }) => <rect x={x} y={y} width={w} height={h} rx={1} fill={fill} opacity={0.7} />;
const Line = ({ x1, y1, x2, y2 }) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.line} strokeWidth={0.5} />;

export function getTemplateSVG(id) {
  const w = 210, h = 297;
  const shared = { viewBox: `0 0 ${w} ${h}`, xmlns: 'http://www.w3.org/2000/svg' };

  switch (id) {
    case 'harvard': return (
      <svg {...shared}>
        <rect width={w} height={h} fill={C.bg}/>
        <Bar x={65} y={22} w={80} h={4} fill={C.accent}/> {/* Name centered */}
        <Bar x={50} y={30} w={110} h={2} fill={C.textLight}/> {/* Contact */}
        <Line x1={20} y1={38} x2={190} y2={38}/>
        <Bar x={75} y={46} w={60} h={2.5} fill={C.accent}/> {/* Section */}
        <Line x1={20} y1={52} x2={190} y2={52}/>
        <Bar x={25} y={58} w={160} h={2}/><Bar x={25} y={64} w={140} h={2}/><Bar x={25} y={70} w={155} h={2}/>
        <Bar x={75} y={82} w={60} h={2.5} fill={C.accent}/>
        <Line x1={20} y1={88} x2={190} y2={88}/>
        <Bar x={25} y={94} w={100} h={2}/><Bar x={25} y={100} w={150} h={2}/><Bar x={25} y={106} w={130} h={2}/><Bar x={25} y={112} w={145} h={2}/>
        <Bar x={75} y={124} w={60} h={2.5} fill={C.accent}/>
        <Line x1={20} y1={130} x2={190} y2={130}/>
        <Bar x={25} y={136} w={55} h={2}/><Bar x={90} y={136} w={55} h={2}/><Bar x={155} y={136} w={30} h={2}/>
        <Bar x={75} y={150} w={60} h={2.5} fill={C.accent}/>
        <Line x1={20} y1={156} x2={190} y2={156}/>
        <Bar x={25} y={162} w={120} h={2}/><Bar x={25} y={168} w={100} h={2}/>
      </svg>
    );

    case 'minimalist': return (
      <svg {...shared}>
        <rect width={w} height={h} fill={C.bg}/>
        <Bar x={22} y={28} w={90} h={5} fill={C.accent}/> {/* Name left large */}
        <Bar x={22} y={38} w={130} h={1.5} fill={C.textLight}/>
        <Line x1={22} y1={46} x2={188} y2={46}/>
        <Bar x={22} y={54} w={50} h={2.5} fill={C.accent}/>
        <Line x1={22} y1={60} x2={188} y2={60}/>
        <Bar x={22} y={66} w={155} h={2}/><Bar x={22} y={73} w={140} h={2}/><Bar x={22} y={80} w={160} h={2}/>
        <Bar x={22} y={94} w={50} h={2.5} fill={C.accent}/>
        <Line x1={22} y1={100} x2={188} y2={100}/>
        <Bar x={22} y={106} w={130} h={2}/><Bar x={22} y={112} w={150} h={2}/><Bar x={22} y={118} w={120} h={2}/><Bar x={22} y={124} w={140} h={2}/>
        <Bar x={22} y={138} w={50} h={2.5} fill={C.accent}/>
        <Line x1={22} y1={144} x2={188} y2={144}/>
        <Bar x={22} y={150} w={160} h={2}/>
      </svg>
    );

    case 'tech': return (
      <svg {...shared}>
        <rect width={w} height={h} fill={C.bg}/>
        <Bar x={20} y={22} w={80} h={4} fill={C.accent}/>
        <Bar x={20} y={30} w={140} h={1.5} fill={C.textLight}/>
        <rect x={20} y={36} width={170} height={0.8} fill={C.accent}/>
        <Bar x={20} y={44} w={55} h={2.5} fill={C.accent}/>
        <Line x1={20} y1={50} x2={190} y2={50}/>
        {/* Skills grid 3 cols */}
        <Bar x={25} y={56} w={40} h={2}/><Bar x={80} y={56} w={40} h={2}/><Bar x={135} y={56} w={40} h={2}/>
        <Bar x={25} y={63} w={35} h={2}/><Bar x={80} y={63} w={45} h={2}/><Bar x={135} y={63} w={38} h={2}/>
        <Bar x={25} y={70} w={42} h={2}/><Bar x={80} y={70} w={38} h={2}/>
        <Bar x={20} y={82} w={60} h={2.5} fill={C.accent}/>
        <Line x1={20} y1={88} x2={190} y2={88}/>
        <Bar x={25} y={94} w={120} h={2}/><Bar x={25} y={100} w={150} h={2}/><Bar x={25} y={106} w={130} h={2}/>
        <Bar x={25} y={112} w={100} h={2}/><Bar x={25} y={118} w={145} h={2}/><Bar x={25} y={124} w={125} h={2}/>
      </svg>
    );

    case 'executive': return (
      <svg {...shared}>
        <rect width={w} height={h} fill={C.bg}/>
        <line x1={28} y1={18} x2={182} y2={18} stroke={C.accent} strokeWidth={0.8}/>
        <line x1={28} y1={20} x2={182} y2={20} stroke={C.accent} strokeWidth={0.4}/>
        <Bar x={60} y={26} w={90} h={4} fill={C.accent}/>
        <Bar x={55} y={34} w={100} h={2} fill={C.textLight}/>
        <line x1={28} y1={42} x2={182} y2={42} stroke={C.accent} strokeWidth={0.4}/>
        <line x1={28} y1={44} x2={182} y2={44} stroke={C.accent} strokeWidth={0.8}/>
        <Bar x={70} y={52} w={70} h={2.5} fill={C.accent}/>
        <Line x1={28} y1={58} x2={182} y2={58}/>
        <Bar x={30} y={64} w={148} h={2}/><Bar x={30} y={71} w={130} h={2}/><Bar x={30} y={78} w={145} h={2}/>
        <Bar x={70} y={90} w={70} h={2.5} fill={C.accent}/>
        <Line x1={28} y1={96} x2={182} y2={96}/>
        <Bar x={30} y={102} w={120} h={2}/><Bar x={30} y={108} w={140} h={2}/><Bar x={30} y={114} w={110} h={2}/>
      </svg>
    );

    case 'creative': return (
      <svg {...shared}>
        <rect width={w} height={h} fill={C.bg}/>
        <Bar x={22} y={22} w={85} h={5} fill={C.accent}/> {/* Name left */}
        <Bar x={140} y={22} w={48} h={1.5} fill={C.textLight}/> {/* Contact right */}
        <Bar x={148} y={27} w={40} h={1.5} fill={C.textLight}/>
        <Bar x={152} y={32} w={36} h={1.5} fill={C.textLight}/>
        {/* Accent bar sections */}
        <rect x={22} y={46} width={2.5} height={8} fill={C.accent} rx={1}/>
        <Bar x={28} y={48} w={55} h={2.5} fill={C.accent}/>
        <Bar x={25} y={58} w={155} h={2}/><Bar x={25} y={64} w={140} h={2}/><Bar x={25} y={70} w={150} h={2}/>
        <rect x={22} y={82} width={2.5} height={8} fill={C.accent} rx={1}/>
        <Bar x={28} y={84} w={55} h={2.5} fill={C.accent}/>
        <Bar x={25} y={94} w={130} h={2}/><Bar x={25} y={100} w={145} h={2}/><Bar x={25} y={106} w={120} h={2}/>
        <rect x={22} y={118} width={2.5} height={8} fill={C.accent} rx={1}/>
        <Bar x={28} y={120} w={40} h={2.5} fill={C.accent}/>
        <Bar x={25} y={130} w={160} h={2}/>
      </svg>
    );

    case 'functional': return (
      <svg {...shared}>
        <rect width={w} height={h} fill={C.bg}/>
        <Bar x={65} y={22} w={80} h={4} fill={C.accent}/>
        <Bar x={50} y={30} w={110} h={2} fill={C.textLight}/>
        <Line x1={22} y1={38} x2={188} y2={38}/>
        {/* Skills first - grid */}
        <Bar x={22} y={44} w={50} h={2.5} fill={C.accent}/>
        <Line x1={22} y1={50} x2={188} y2={50}/>
        <Bar x={25} y={56} w={55} h={2}/><Bar x={100} y={56} w={55} h={2}/>
        <Bar x={25} y={63} w={50} h={2}/><Bar x={100} y={63} w={48} h={2}/>
        <Bar x={25} y={70} w={58} h={2}/><Bar x={100} y={70} w={52} h={2}/>
        <Bar x={22} y={82} w={40} h={2.5} fill={C.accent}/>
        <Line x1={22} y1={88} x2={188} y2={88}/>
        <Bar x={25} y={94} w={130} h={2}/><Bar x={25} y={100} w={150} h={2}/>
        <Bar x={22} y={112} w={50} h={2.5} fill={C.accent}/>
        <Line x1={22} y1={118} x2={188} y2={118}/>
        <Bar x={25} y={124} w={120} h={2}/><Bar x={25} y={130} w={100} h={2}/>
      </svg>
    );

    case 'doubleline': return (
      <svg {...shared}>
        <rect width={w} height={h} fill={C.bg}/>
        <line x1={24} y1={18} x2={186} y2={18} stroke={C.accent} strokeWidth={0.6}/>
        <line x1={24} y1={20} x2={186} y2={20} stroke={C.accent} strokeWidth={0.3}/>
        <Bar x={65} y={26} w={80} h={4} fill={C.accent}/>
        <Bar x={55} y={34} w={100} h={2} fill={C.textLight}/>
        <line x1={24} y1={42} x2={186} y2={42} stroke={C.accent} strokeWidth={0.3}/>
        <line x1={24} y1={44} x2={186} y2={44} stroke={C.accent} strokeWidth={0.6}/>
        {/* Double-line section headers */}
        <line x1={24} y1={52} x2={186} y2={52} stroke={C.accent} strokeWidth={0.4}/>
        <Bar x={24} y={54} w={55} h={2.5} fill={C.accent}/>
        <line x1={24} y1={60} x2={186} y2={60} stroke={C.accent} strokeWidth={0.4}/>
        <Bar x={28} y={66} w={150} h={2}/><Bar x={28} y={72} w={135} h={2}/><Bar x={28} y={78} w={148} h={2}/>
        <line x1={24} y1={88} x2={186} y2={88} stroke={C.accent} strokeWidth={0.4}/>
        <Bar x={24} y={90} w={55} h={2.5} fill={C.accent}/>
        <line x1={24} y1={96} x2={186} y2={96} stroke={C.accent} strokeWidth={0.4}/>
        <Bar x={28} y={102} w={120} h={2}/><Bar x={28} y={108} w={140} h={2}/>
      </svg>
    );

    case 'academic': return (
      <svg {...shared}>
        <rect width={w} height={h} fill={C.bg}/>
        <Bar x={24} y={24} w={75} h={3.5} fill={C.accent}/>
        <Bar x={24} y={32} w={120} h={1.5} fill={C.textLight}/>
        <rect x={24} y={40} width={164} height={1} fill={C.accent}/>
        {/* Education first */}
        <Bar x={24} y={48} w={50} h={2.5} fill={C.accent}/>
        <rect x={24} y={54} width={164} height={0.8} fill={C.accent} opacity={0.5}/>
        <Bar x={28} y={60} w={130} h={2}/><Bar x={28} y={67} w={110} h={2}/><Bar x={28} y={74} w={140} h={2}/>
        <Bar x={24} y={86} w={55} h={2.5} fill={C.accent}/>
        <rect x={24} y={92} width={164} height={0.8} fill={C.accent} opacity={0.5}/>
        <Bar x={28} y={98} w={150} h={2}/><Bar x={28} y={105} w={130} h={2}/><Bar x={28} y={112} w={145} h={2}/>
        <Bar x={28} y={119} w={120} h={2}/><Bar x={28} y={126} w={140} h={2}/>
      </svg>
    );

    case 'twocolumn': return (
      <svg {...shared}>
        <rect width={w} height={h} fill={C.bg}/>
        {/* Sidebar */}
        <rect x={0} y={0} width={70} height={h} fill={C.sidebar}/>
        <line x1={70} y1={0} x2={70} y2={h} stroke={C.line} strokeWidth={0.5}/>
        <Bar x={12} y={22} w={46} h={3.5} fill={C.accent}/>
        <Bar x={12} y={30} w={40} h={1.5} fill={C.textLight}/>
        <Bar x={12} y={35} w={35} h={1.5} fill={C.textLight}/>
        <Bar x={12} y={40} w={42} h={1.5} fill={C.textLight}/>
        <Bar x={12} y={52} w={30} h={2} fill={C.accent}/>
        <Line x1={12} y1={57} x2={62} y2={57}/>
        <Bar x={14} y={62} w={35} h={1.5}/><Bar x={14} y={67} w={30} h={1.5}/><Bar x={14} y={72} w={38} h={1.5}/><Bar x={14} y={77} w={28} h={1.5}/>
        {/* Main */}
        <Bar x={80} y={22} w={55} h={2.5} fill={C.accent}/>
        <Line x1={80} y1={28} x2={192} y2={28}/>
        <Bar x={82} y={34} w={100} h={2}/><Bar x={82} y={40} w={90} h={2}/>
        <Bar x={80} y={52} w={50} h={2.5} fill={C.accent}/>
        <Line x1={80} y1={58} x2={192} y2={58}/>
        <Bar x={82} y={64} w={95} h={2}/><Bar x={82} y={70} w={105} h={2}/><Bar x={82} y={76} w={85} h={2}/>
        <Bar x={82} y={82} w={100} h={2}/><Bar x={82} y={88} w={90} h={2}/>
        <Bar x={80} y={100} w={40} h={2.5} fill={C.accent}/>
        <Line x1={80} y1={106} x2={192} y2={106}/>
        <Bar x={82} y={112} w={95} h={2}/><Bar x={82} y={118} w={80} h={2}/>
      </svg>
    );

    case 'hybrid': return (
      <svg {...shared}>
        <rect width={w} height={h} fill={C.bg}/>
        <Bar x={22} y={22} w={80} h={4} fill={C.accent}/> {/* Name left */}
        <Bar x={140} y={22} w={48} h={1.5} fill={C.textLight}/> {/* Contact right */}
        <Bar x={145} y={27} w={43} h={1.5} fill={C.textLight}/>
        <Line x1={22} y1={36} x2={188} y2={36}/>
        {/* Bold bottom section headers */}
        <Bar x={22} y={44} w={60} h={2.5} fill={C.accent}/>
        <rect x={22} y={49} width={60} height={0.8} fill={C.accent}/>
        <Bar x={25} y={55} w={155} h={2}/><Bar x={25} y={61} w={140} h={2}/><Bar x={25} y={67} w={150} h={2}/>
        <Bar x={22} y={79} w={55} h={2.5} fill={C.accent}/>
        <rect x={22} y={84} width={55} height={0.8} fill={C.accent}/>
        <Bar x={25} y={90} w={130} h={2}/><Bar x={25} y={96} w={145} h={2}/><Bar x={25} y={102} w={120} h={2}/>
        <Bar x={22} y={114} w={45} h={2.5} fill={C.accent}/>
        <rect x={22} y={119} width={45} height={0.8} fill={C.accent}/>
        <Bar x={25} y={125} w={160} h={2}/>
      </svg>
    );

    default: return (
      <svg {...shared}>
        <rect width={w} height={h} fill={C.bg}/>
        <Bar x={60} y={25} w={90} h={4} fill={C.accent}/>
        <Bar x={40} y={35} w={130} h={2} fill={C.textLight}/>
        <Line x1={20} y1={45} x2={190} y2={45}/>
        <Bar x={25} y={55} w={140} h={2}/><Bar x={25} y={62} w={120} h={2}/>
      </svg>
    );
  }
}
