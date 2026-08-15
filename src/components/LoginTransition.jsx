import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Sparkles } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   PREMIUM LOGIN → DASHBOARD TRANSITION
   
   A highly immersive, cinematic curtain-wipe transition.
   Displays a glassmorphic welcome card with floating ambient
   particles and a loading indicator before loading the workspace.
   ═══════════════════════════════════════════════════════════════ */

export default function LoginTransition({ userName, onComplete }) {
  const [phase, setPhase] = useState('wipe'); // wipe → greet → reveal

  useEffect(() => {
    // Custom timeline for smooth animation sequence
    const t1 = setTimeout(() => setPhase('greet'), 450);
    const t2 = setTimeout(() => setPhase('reveal'), 2200);
    const t3 = setTimeout(() => onComplete(), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const displayName = userName || 'Student';

  // Curated color list for ambient particles
  const particleColors = ['#a78bfa', '#c084fc', '#818cf8', '#06b6d4', '#22d3ee', '#fbbf24'];

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
            overflow: 'hidden',
            background: '#08090f'
          }}
        >
          {/* ── Outer Layer: Main Curtain Wipe (Dark Indigo & Slate Cosmic Gradient) ── */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: phase === 'reveal' ? '100%' : '0%' }}
            transition={{
              x: {
                duration: phase === 'reveal' ? 0.65 : 0.45,
                ease: [0.76, 0, 0.24, 1]
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #090a10 0%, #110e26 40%, #1b103c 70%, #08070e 100%)',
              zIndex: 2
            }}
          />

          {/* ── Inner Layer: Secondary Color Wipe (Neon Purple Deep Glow) ── */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: phase === 'reveal' ? '100%' : '0%' }}
            transition={{
              x: {
                duration: phase === 'reveal' ? 0.65 : 0.45,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.06
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4c1d95 100%)',
              zIndex: 1
            }}
          />

          {/* ── Central Glassmorphism Card ── */}
          <AnimatePresence>
            {phase === 'greet' && (
              <motion.div
                key="greeting-card"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.03, filter: 'blur(12px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '3rem 3.5rem',
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  textAlign: 'center',
                  maxWidth: '460px',
                  width: '90%'
                }}
              >
                {/* Radial Glow behind Card */}
                <div style={{
                  position: 'absolute',
                  top: '-20%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '150px',
                  height: '150px',
                  background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
                  zIndex: -1,
                  pointerEvents: 'none'
                }} />

                {/* Ring & Floating Cap Logo */}
                <motion.div
                  initial={{ rotate: -25, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 180, delay: 0.1 }}
                  style={{
                    position: 'relative',
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)'
                  }}
                >
                  {/* Rotating Gradient Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      inset: -2,
                      borderRadius: '50%',
                      border: '1.5px dashed rgba(167, 139, 250, 0.3)',
                      pointerEvents: 'none'
                    }}
                  />
                  <GraduationCap size={32} color="#c4b5fd" />
                </motion.div>

                {/* Subtitle tag with Sparkles */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: '#c4b5fd',
                    fontWeight: 700,
                    marginBottom: '0.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textShadow: '0 0 10px rgba(167, 139, 250, 0.3)'
                  }}
                >
                  <Sparkles size={12} className="text-purple-300" />
                  <span>Welcome back</span>
                  <Sparkles size={12} className="text-purple-300" />
                </motion.div>

                {/* Large Gradient Display Name */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                  style={{
                    fontSize: '2.8rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    fontFamily: "'Outfit', sans-serif",
                    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 40%, #c4b5fd 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '1.8rem',
                    textShadow: '0 4px 20px rgba(124, 58, 237, 0.15)'
                  }}
                >
                  {displayName}
                </motion.h1>

                {/* Glowing Linear Loading Bar */}
                <div style={{
                  width: '180px',
                  height: '4px',
                  borderRadius: '99px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: '1rem',
                  boxShadow: '0 0 10px rgba(124, 58, 237, 0.05)'
                }}
                >
                  <motion.div
                    initial={{ left: '-100%', width: '50%' }}
                    animate={{ left: '100%', width: '30%' }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    style={{
                      position: 'absolute',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)',
                    }}
                  />
                </div>

                {/* Status line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    fontSize: '0.72rem',
                    color: 'rgba(203, 213, 225, 0.7)',
                    fontFamily: "'Fira Code', monospace",
                    fontWeight: 500,
                    letterSpacing: '0.02em'
                  }}
                >
                  Preparing your workspace...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Premium Ambient Particle System ── */}
          {phase === 'greet' && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', overflow: 'hidden' }}>
              {Array.from({ length: 25 }, (_, i) => {
                const size = 3 + (i % 4) * 2.5; // size variation: 3px to 10.5px
                const startX = 15 + (i * 3.5) % 70; // spread horizontally between 15% and 85%
                const startY = 60 + (i * 2.5) % 35; // float starting lower half (60% to 95%)
                const speed = 2.5 + (i % 3) * 0.8; // speed variation
                const delay = 0.1 + i * 0.08;
                const pColor = particleColors[i % particleColors.length];

                return (
                  <motion.div
                    key={i}
                    initial={{
                      x: `${startX}vw`,
                      y: `${startY}vh`,
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{
                      y: `${startY - 35 - Math.random() * 20}vh`,
                      x: `${startX + (Math.random() - 0.5) * 8}vw`,
                      scale: [0, 1.2, 0.6, 0],
                      opacity: [0, 0.45, 0.3, 0]
                    }}
                    transition={{
                      duration: speed,
                      delay: delay,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    style={{
                      position: 'absolute',
                      width: size,
                      height: size,
                      borderRadius: '50%',
                      background: pColor,
                      boxShadow: `0 0 10px ${pColor}80`,
                      filter: 'blur(0.5px)'
                    }}
                  />
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
