import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   WINGORA LMS — "SYSTEM BOOT" INITIAL LOADER
   
   Concept: A terminal boots up the learning system line-by-line,
   then the text dissolves into particles that converge to form
   the logo, which glitch-reveals with chromatic aberration.
   ═══════════════════════════════════════════════════════════════ */

// ── Terminal boot lines (typed out sequentially) ──
const BOOT_LINES = [
  { text: '> wingora_lms --init', delay: 0, color: '#c084fc' },
  { text: '  loading core modules...', delay: 400, color: '#94a3b8' },
  { text: '  ✓ dsa_engine', delay: 700, color: '#34d399' },
  { text: '  ✓ interview_ai', delay: 950, color: '#34d399' },
  { text: '  ✓ aptitude_tracker', delay: 1150, color: '#34d399' },
  { text: '  ✓ mcq_compiler', delay: 1350, color: '#34d399' },
  { text: '  building knowledge graph ██████████ done', delay: 1550, color: '#fbbf24' },
  { text: '  system ready.', delay: 1900, color: '#22d3ee' },
];

// ── Pixel scatter effect using canvas ──
function PixelCanvas({ active, onDone }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animFrame = useRef(null);
  const startedAt = useRef(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;
    startedAt.current = performance.now();

    // Create particles in the shape of scattered text remnants
    const centerX = W / 2;
    const centerY = H / 2;
    const count = 120;
    const colors = ['#7c3aed', '#a78bfa', '#c084fc', '#06b6d4', '#34d399', '#8b5cf6'];

    particles.current = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const spread = 150 + Math.random() * 250;
      return {
        x: centerX + Math.cos(angle) * spread * (0.5 + Math.random()),
        y: centerY + Math.sin(angle) * spread * (0.3 + Math.random() * 0.7),
        targetX: centerX + (Math.random() - 0.5) * 40,
        targetY: centerY - 20 + (Math.random() - 0.5) * 40,
        size: 1.5 + Math.random() * 3,
        color: colors[i % colors.length],
        speed: 0.02 + Math.random() * 0.03,
        opacity: 0.8
      };
    });

    const animate = (now) => {
      const elapsed = now - startedAt.current;
      ctx.clearRect(0, 0, W, H);

      let allArrived = true;
      particles.current.forEach((p) => {
        const progress = Math.min(1, elapsed * p.speed / 20);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        const cx = p.x + (p.targetX - p.x) * ease;
        const cy = p.y + (p.targetY - p.y) * ease;

        if (progress < 0.98) allArrived = false;

        ctx.globalAlpha = p.opacity * (progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(cx, cy, p.size * (1 - ease * 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Draw faint connecting lines between nearby particles
        if (progress > 0.3) {
          particles.current.forEach((p2) => {
            const dx = cx - (p2.x + (p2.targetX - p2.x) * ease);
            const dy = cy - (p2.y + (p2.targetY - p2.y) * ease);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 60 && dist > 5) {
              ctx.globalAlpha = 0.06 * (1 - dist / 60);
              ctx.strokeStyle = p.color;
              ctx.lineWidth = 0.5;
              ctx.shadowBlur = 0;
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.lineTo(cx - dx, cy - dy);
              ctx.stroke();
            }
          });
        }
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (elapsed > 1200) {
        onDone?.();
      }

      if (elapsed < 1500) {
        animFrame.current = requestAnimationFrame(animate);
      }
    };

    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [active, onDone]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none'
      }}
    />
  );
}

// ── Typed line component ──
function TypedLine({ text, color, startDelay, onDone }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const charIdx = useRef(0);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setShowCursor(true);
      const typeInterval = setInterval(() => {
        charIdx.current++;
        if (charIdx.current <= text.length) {
          setDisplayed(text.slice(0, charIdx.current));
        } else {
          clearInterval(typeInterval);
          setShowCursor(false);
          onDone?.();
        }
      }, 18 + Math.random() * 12); // slight randomness feels human
      return () => clearInterval(typeInterval);
    }, startDelay);
    return () => clearTimeout(delayTimer);
  }, [text, startDelay, onDone]);

  return (
    <div style={{
      fontFamily: "'Fira Code', monospace",
      fontSize: '0.82rem',
      color: color,
      lineHeight: 1.8,
      whiteSpace: 'pre',
      minHeight: '1.5em'
    }}>
      {displayed}
      {showCursor && (
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '14px',
          background: color,
          marginLeft: '1px',
          animation: 'cursorBlink 0.6s step-end infinite',
          verticalAlign: 'middle'
        }} />
      )}
    </div>
  );
}

// ── Main Loader Component ──
export default function InitialLoader({ onComplete }) {
  const [phase, setPhase] = useState('boot');       // boot → scatter → logo → exit
  const [bootDone, setBootDone] = useState(false);
  const [scatterDone, setScatterDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const timerRefs = useRef([]);

  // Sequentially reveal boot lines
  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => Math.max(prev, i + 1));
      }, line.delay);
      timerRefs.current.push(t);
    });

    // Boot typing finishes around 2200ms, transition to scatter at 2600ms
    const bootTimer = setTimeout(() => setBootDone(true), 2600);
    timerRefs.current.push(bootTimer);

    return () => timerRefs.current.forEach(clearTimeout);
  }, []);

  // After boot text typed → scatter phase
  useEffect(() => {
    if (bootDone) setPhase('scatter');
  }, [bootDone]);

  // After scatter → logo phase
  const handleScatterDone = useCallback(() => {
    if (!scatterDone) {
      setScatterDone(true);
      setPhase('logo');
    }
  }, [scatterDone]);

  // After logo reveals → exit
  useEffect(() => {
    if (phase === 'logo') {
      const exitTimer = setTimeout(() => {
        setPhase('exit');
        setTimeout(() => onComplete(), 700);
      }, 1800);
      return () => clearTimeout(exitTimer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader-root"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#07080f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* ── Subtle scan line overlay ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
            pointerEvents: 'none'
          }} />

          {/* ── Vignette ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
            pointerEvents: 'none'
          }} />

          {/* ── Corner accents ── */}
          {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((corner) => {
            const isTop = corner.includes('top');
            const isLeft = corner.includes('Left');
            return (
              <div
                key={corner}
                style={{
                  position: 'absolute',
                  [isTop ? 'top' : 'bottom']: '20px',
                  [isLeft ? 'left' : 'right']: '20px',
                  width: '40px',
                  height: '40px',
                  borderTop: isTop ? '2px solid rgba(139,92,246,0.2)' : 'none',
                  borderBottom: !isTop ? '2px solid rgba(139,92,246,0.2)' : 'none',
                  borderLeft: isLeft ? '2px solid rgba(139,92,246,0.2)' : 'none',
                  borderRight: !isLeft ? '2px solid rgba(139,92,246,0.2)' : 'none',
                  zIndex: 3
                }}
              />
            );
          })}

          {/* ── PHASE: Boot Terminal ── */}
          <AnimatePresence>
            {(phase === 'boot') && (
              <motion.div
                key="terminal"
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'relative',
                  zIndex: 10,
                  width: '480px',
                  maxWidth: '90vw',
                  padding: '2rem',
                  background: 'rgba(10, 12, 20, 0.9)',
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                  borderRadius: '12px',
                  boxShadow: '0 0 60px rgba(139, 92, 246, 0.08), 0 30px 60px rgba(0,0,0,0.5)'
                }}
              >
                {/* Terminal header bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '0.65rem',
                    fontFamily: "'Fira Code', monospace",
                    color: 'rgba(148, 163, 184, 0.4)',
                    letterSpacing: '0.05em'
                  }}>
                    wingora@system:~
                  </span>
                </div>

                {/* Typed boot lines */}
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <TypedLine
                    key={i}
                    text={line.text}
                    color={line.color}
                    startDelay={0}
                  />
                ))}

                {/* Blinking block cursor at end */}
                {visibleLines >= BOOT_LINES.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ marginTop: '0.5rem' }}
                  >
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '15px',
                      background: '#c084fc',
                      animation: 'cursorBlink 0.7s step-end infinite'
                    }} />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── PHASE: Particle Scatter ── */}
          <PixelCanvas active={phase === 'scatter'} onDone={handleScatterDone} />

          {/* ── PHASE: Logo Reveal ── */}
          <AnimatePresence>
            {(phase === 'logo' || phase === 'exit') && (
              <motion.div
                key="logo-reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'relative',
                  zIndex: 15,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem'
                }}
              >
                {/* SVG Logo with draw-in animation */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                  style={{ position: 'relative' }}
                >
                  {/* Glow behind logo */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 40px rgba(124,58,237,0.3), 0 0 80px rgba(124,58,237,0.1)',
                        '0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(124,58,237,0.15)',
                        '0 0 40px rgba(124,58,237,0.3), 0 0 80px rgba(124,58,237,0.1)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      width: 88,
                      height: 88,
                      borderRadius: '22px',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {/* Graduation cap with stroke draw */}
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <motion.path
                        d="M22 10v6M2 10l10-5 10 5-10 5z"
                        stroke="white"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                      />
                      <motion.path
                        d="M6 12v5c3 3 9 3 12 0v-5"
                        stroke="white"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: 'easeInOut' }}
                      />
                    </svg>
                  </motion.div>

                  {/* Glitch lines */}
                  <motion.div
                    animate={{
                      opacity: [0, 1, 0, 0, 1, 0],
                      x: [-2, 3, 0, -1, 2, 0],
                      scaleX: [1, 1.02, 1, 0.99, 1.01, 1]
                    }}
                    transition={{ duration: 0.3, delay: 0.2, times: [0, 0.1, 0.15, 0.6, 0.65, 1] }}
                    style={{
                      position: 'absolute',
                      top: '30%',
                      left: '-5%',
                      right: '-5%',
                      height: '3px',
                      background: 'rgba(139, 92, 246, 0.4)',
                      pointerEvents: 'none'
                    }}
                  />
                </motion.div>

                {/* Brand text with staggered letter reveal */}
                <motion.div style={{ textAlign: 'center' }}>
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    style={{
                      fontSize: '2.6rem',
                      fontWeight: 900,
                      letterSpacing: '-0.03em',
                      fontFamily: "'Outfit', sans-serif",
                      lineHeight: 1,
                      marginBottom: '0.3rem'
                    }}
                  >
                    {'wingora'.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                        style={{
                          display: 'inline-block',
                          background: 'linear-gradient(135deg, #e2e8f0, #a78bfa, #7c3aed)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.4 }}
                      style={{
                        fontWeight: 400,
                        fontSize: '1.7rem',
                        marginLeft: '0.15rem',
                        background: 'linear-gradient(135deg, #c084fc, #8b5cf6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      LMS
                    </motion.span>
                  </motion.h1>

                  {/* Tagline with underline draw */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    style={{ position: 'relative', display: 'inline-block' }}
                  >
                    <p style={{
                      fontSize: '0.72rem',
                      color: 'rgba(148, 163, 184, 0.6)',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      fontFamily: "'Outfit', sans-serif"
                    }}>
                      Elevate Your Learning Journey
                    </p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
                      style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)',
                        marginTop: '0.5rem',
                        transformOrigin: 'center'
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Minimal bottom status ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.6rem',
              fontFamily: "'Fira Code', monospace",
              color: 'rgba(148, 163, 184, 0.4)',
              letterSpacing: '0.1em',
              zIndex: 20
            }}
          >
            v3.0 • {new Date().getFullYear()}
          </motion.div>

          {/* ── Keyframe styles ── */}
          <style>{`
            @keyframes cursorBlink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
