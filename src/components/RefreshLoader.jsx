import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   PANDA REFRESH LOADER — Pure animation, no fluff.
   The panda sleeps, wakes, stretches, and dips out.
   ═══════════════════════════════════════════════════════════════ */

function PandaCharacter({ phase }) {
  const sleeping = phase === 'sleep';
  const waking = phase === 'wake';
  const stretching = phase === 'stretch';
  const leaving = phase === 'leave';
  const awake = !sleeping;

  return (
    <motion.div
      animate={leaving ? { y: 60, opacity: 0, scale: 0.7 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeIn' }}
      style={{ position: 'relative', width: 140, height: 160 }}
    >
      {/* ── Body ── */}
      <motion.div
        animate={sleeping
          ? { y: [0, -2, 0] }
          : stretching
            ? { y: -14, scaleY: 1.06 }
            : { y: 0 }
        }
        transition={sleeping
          ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          : { type: 'spring', damping: 10, stiffness: 120 }
        }
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 90,
          height: 75,
          borderRadius: '45px 45px 35px 35px',
          background: 'linear-gradient(180deg, #fafafa 0%, #e4e4e7 100%)',
          boxShadow: '0 6px 25px rgba(0,0,0,0.25)',
          transformOrigin: 'bottom center'
        }}
      >
        {/* Belly patch */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 46,
          height: 38,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(0,0,0,0.03)'
        }} />

        {/* ── Arms ── */}
        {/* Left arm */}
        <motion.div
          animate={stretching
            ? { rotate: -50, y: -20, x: -10 }
            : { rotate: 15, y: 0, x: 0 }
          }
          transition={{ type: 'spring', damping: 8, stiffness: 100 }}
          style={{
            position: 'absolute',
            top: 10,
            left: -12,
            width: 24,
            height: 38,
            borderRadius: '12px',
            background: '#1e1b2e',
            transformOrigin: 'top center',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.2)',
            zIndex: -1
          }}
        />
        {/* Right arm */}
        <motion.div
          animate={stretching
            ? { rotate: 50, y: -20, x: 10 }
            : { rotate: -15, y: 0, x: 0 }
          }
          transition={{ type: 'spring', damping: 8, stiffness: 100, delay: 0.05 }}
          style={{
            position: 'absolute',
            top: 10,
            right: -12,
            width: 24,
            height: 38,
            borderRadius: '12px',
            background: '#1e1b2e',
            transformOrigin: 'top center',
            boxShadow: '-2px 2px 8px rgba(0,0,0,0.2)',
            zIndex: -1
          }}
        />

        {/* ── Feet ── */}
        <div style={{
          position: 'absolute', bottom: -4, left: 10,
          width: 22, height: 14, borderRadius: '50%',
          background: '#1e1b2e'
        }} />
        <div style={{
          position: 'absolute', bottom: -4, right: 10,
          width: 22, height: 14, borderRadius: '50%',
          background: '#1e1b2e'
        }} />
      </motion.div>

      {/* ── Head ── */}
      <motion.div
        animate={sleeping
          ? { rotate: [0, 3, 0, -2, 0] }
          : waking
            ? { rotate: [5, -3, 0] }
            : stretching
              ? { y: -14, rotate: -3 }
              : { y: 0, rotate: 0 }
        }
        transition={sleeping
          ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          : { type: 'spring', damping: 12 }
        }
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 100,
          height: 94,
          zIndex: 2
        }}
      >
        {/* Left ear */}
        <motion.div
          animate={waking ? { rotate: [0, -12, 5, 0] } : {}}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute', top: 0, left: 4,
            width: 30, height: 30, borderRadius: '50%',
            background: '#1e1b2e',
            boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{
            position: 'absolute', top: 6, left: 6,
            width: 16, height: 16, borderRadius: '50%',
            background: '#352f5b'
          }} />
        </motion.div>

        {/* Right ear */}
        <motion.div
          animate={waking ? { rotate: [0, 12, -5, 0] } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            position: 'absolute', top: 0, right: 4,
            width: 30, height: 30, borderRadius: '50%',
            background: '#1e1b2e',
            boxShadow: 'inset -2px 2px 5px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{
            position: 'absolute', top: 6, right: 6,
            width: 16, height: 16, borderRadius: '50%',
            background: '#352f5b'
          }} />
        </motion.div>

        {/* Face */}
        <div style={{
          position: 'absolute', top: 12, left: 4, right: 4, bottom: 0,
          borderRadius: '50%',
          background: 'linear-gradient(180deg, #fefefe 0%, #ececec 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2), inset 0 -3px 8px rgba(0,0,0,0.04)'
        }}>
          {/* Left eye patch */}
          <div style={{
            position: 'absolute', top: 18, left: 10,
            width: 28, height: 24, borderRadius: '50%',
            background: '#1e1b2e', transform: 'rotate(-6deg)'
          }}>
            {/* Left eye */}
            <motion.div
              animate={sleeping
                ? { scaleY: 0.1 }
                : stretching
                  ? { scaleY: 0.15 }
                  : { scaleY: 1 }
              }
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute', top: 5, left: 7,
                width: 14, height: 14, borderRadius: '50%',
                background: 'white',
                transformOrigin: 'center'
              }}
            >
              {awake && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 8, delay: 0.1 }}
                  style={{
                    position: 'absolute', top: 3, left: 3,
                    width: 7, height: 7, borderRadius: '50%',
                    background: '#111'
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 1, left: 1.5,
                    width: 2.5, height: 2.5, borderRadius: '50%',
                    background: 'white'
                  }} />
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right eye patch */}
          <div style={{
            position: 'absolute', top: 18, right: 10,
            width: 28, height: 24, borderRadius: '50%',
            background: '#1e1b2e', transform: 'rotate(6deg)'
          }}>
            {/* Right eye */}
            <motion.div
              animate={sleeping
                ? { scaleY: 0.1 }
                : stretching
                  ? { scaleY: 0.15 }
                  : { scaleY: 1 }
              }
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute', top: 5, right: 7,
                width: 14, height: 14, borderRadius: '50%',
                background: 'white',
                transformOrigin: 'center'
              }}
            >
              {awake && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 8, delay: 0.15 }}
                  style={{
                    position: 'absolute', top: 3, right: 3,
                    width: 7, height: 7, borderRadius: '50%',
                    background: '#111'
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 1, right: 1.5,
                    width: 2.5, height: 2.5, borderRadius: '50%',
                    background: 'white'
                  }} />
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Nose */}
          <motion.div
            animate={waking ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute', top: 40, left: '50%',
              transform: 'translateX(-50%)',
              width: 12, height: 9, borderRadius: '50% 50% 40% 40%',
              background: '#1e1b2e'
            }}
          />

          {/* Mouth — changes with mood */}
          {sleeping ? (
            /* Sleeping: small flat line */
            <div style={{
              position: 'absolute', top: 50, left: '50%',
              transform: 'translateX(-50%)',
              width: 14, height: 2, borderRadius: '2px',
              background: '#1e1b2e', opacity: 0.4
            }} />
          ) : stretching ? (
            /* Stretch yawn: open mouth */
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute', top: 48, left: '50%',
                transform: 'translateX(-50%)',
                width: 18, height: 12, borderRadius: '4px 4px 10px 10px',
                background: '#1e1b2e',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <div style={{
                width: 10, height: 6, borderRadius: '3px 3px 6px 6px',
                background: '#c94f6d', opacity: 0.7
              }} />
            </motion.div>
          ) : (
            /* Awake: happy curve */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute', top: 50, left: '50%',
                transform: 'translateX(-50%)',
                width: 18, height: 8,
                borderBottom: '2.5px solid #1e1b2e',
                borderLeft: '2px solid #1e1b2e',
                borderRight: '2px solid #1e1b2e',
                borderTop: 'none',
                borderRadius: '0 0 10px 10px'
              }}
            />
          )}

          {/* Blush — only after stretch */}
          {awake && !stretching && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ delay: 0.2 }}
                style={{
                  position: 'absolute', top: 44, left: 5,
                  width: 14, height: 8, borderRadius: '50%',
                  background: '#f87171'
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ delay: 0.25 }}
                style={{
                  position: 'absolute', top: 44, right: 5,
                  width: 14, height: 8, borderRadius: '50%',
                  background: '#f87171'
                }}
              />
            </>
          )}
        </div>
      </motion.div>

      {/* ── Sleeping ZZZs ── */}
      {sleeping && (
        <div style={{ position: 'absolute', top: 5, right: -8, zIndex: 20 }}>
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={{
                opacity: [0, 0.6, 0],
                y: [-5, -28 - i * 16],
                x: [0, 6 + i * 4],
                scale: [0.5, 0.8 + i * 0.2]
              }}
              transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                fontSize: `${0.6 + i * 0.25}rem`,
                fontWeight: 800,
                color: 'rgba(148, 163, 184, 0.45)',
                fontStyle: 'italic'
              }}
            >
              z
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function RefreshLoader({ onComplete }) {
  const [phase, setPhase] = useState('sleep');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('wake'), 700),
      setTimeout(() => setPhase('stretch'), 1200),
      setTimeout(() => setPhase('settle'), 1800),
      setTimeout(() => setPhase('leave'), 2300),
      setTimeout(() => onComplete(), 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="panda-refresh"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#08090f',
            overflow: 'hidden'
          }}
        >
          {/* Soft vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.04) 0%, transparent 65%)',
            pointerEvents: 'none'
          }} />

          {/* Ground shadow under panda */}
          <motion.div
            animate={phase === 'leave'
              ? { opacity: 0, scaleX: 0.5 }
              : { opacity: 0.15, scaleX: 1 }
            }
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 'calc(50% + 85px)',
              width: 100,
              height: 10,
              borderRadius: '50%',
              background: 'rgba(139, 92, 246, 0.5)',
              filter: 'blur(8px)',
              transformOrigin: 'center'
            }}
          />

          <PandaCharacter phase={phase} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
