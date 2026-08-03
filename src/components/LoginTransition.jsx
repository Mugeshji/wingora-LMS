import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Sparkles } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   LOGIN → DASHBOARD TRANSITION
   
   A cinematic curtain-wipe transition that plays after a
   successful login. Shows a personalized welcome greeting
   before revealing the main dashboard.
   ═══════════════════════════════════════════════════════════════ */

export default function LoginTransition({ userName, onComplete }) {
  const [phase, setPhase] = useState('wipe');  // wipe → greet → reveal

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase('greet'), 400);
    const t2 = setTimeout(() => setPhase('reveal'), 2000);
    const t3 = setTimeout(() => onComplete(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const displayName = userName || 'Student';

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="login-transition"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* ── Gradient curtain wipe ── */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: phase === 'reveal' ? '100%' : '0%' }}
            transition={{
              x: {
                duration: phase === 'reveal' ? 0.6 : 0.4,
                ease: [0.76, 0, 0.24, 1] // custom cubic for snappy feel
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #0a0b14 0%, #13112b 40%, #1a1040 70%, #0f0e1a 100%)',
              zIndex: 1
            }}
          />

          {/* ── Second curtain layer (slight delay for depth) ── */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: phase === 'reveal' ? '100%' : '0%' }}
            transition={{
              x: {
                duration: phase === 'reveal' ? 0.6 : 0.4,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.05
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%)',
              zIndex: 0
            }}
          />

          {/* ── Central welcome content ── */}
          <AnimatePresence>
            {phase === 'greet' && (
              <motion.div
                key="greeting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  position: 'relative',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.2rem',
                  textAlign: 'center'
                }}
              >
                {/* Logo icon */}
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <GraduationCap size={28} color="white" />
                </motion.div>

                {/* Welcome text */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.5, y: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: 'rgba(196, 181, 253, 0.7)',
                      fontWeight: 600,
                      marginBottom: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Sparkles size={12} />
                    <span>Welcome back</span>
                    <Sparkles size={12} />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    style={{
                      fontSize: '2.8rem',
                      fontWeight: 900,
                      color: 'white',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      fontFamily: "'Outfit', sans-serif",
                      textShadow: '0 4px 30px rgba(124, 58, 237, 0.3)'
                    }}
                  >
                    {displayName}
                  </motion.h1>
                </div>

                {/* Decorative underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                  style={{
                    width: '80px',
                    height: '3px',
                    borderRadius: '99px',
                    background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)',
                    transformOrigin: 'center'
                  }}
                />

                {/* Status line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    fontSize: '0.72rem',
                    color: 'rgba(203, 213, 225, 0.5)',
                    fontFamily: "'Fira Code', monospace",
                    fontWeight: 500
                  }}
                >
                  Preparing your workspace...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Ambient particles ── */}
          {phase === 'greet' && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', overflow: 'hidden' }}>
              {Array.from({ length: 20 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: `${30 + Math.random() * 40}vw`,
                    y: `${30 + Math.random() * 40}vh`,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{
                    y: `${20 + Math.random() * 60}vh`,
                    scale: [0, 1, 0.5],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1.5,
                    delay: 0.2 + i * 0.06,
                    ease: 'easeOut'
                  }}
                  style={{
                    position: 'absolute',
                    width: 3 + Math.random() * 4,
                    height: 3 + Math.random() * 4,
                    borderRadius: '50%',
                    background: ['#a78bfa', '#c084fc', '#8b5cf6', '#06b6d4', '#34d399'][i % 5],
                    boxShadow: `0 0 8px ${['#a78bfa', '#c084fc', '#8b5cf6', '#06b6d4', '#34d399'][i % 5]}40`
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
