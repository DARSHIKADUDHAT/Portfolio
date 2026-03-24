import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CARD_COUNT_VISIBLE = 4  // total cards in the ring
const RADIUS = 300             // radius of the 3D circle in px

export default function ProjectCarousel({ projects, onSelect }) {
  const [current, setCurrent] = useState(0)
  const total = projects.length

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  return (
    <div style={{ position: 'relative', width: '100%', height: '480px', perspective: '1200px' }}>
      {/* 3D rotating ring */}
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          transformStyle: 'preserve-3d',
        }}
      >
        {projects.map((project, i) => {
          // Angle of this card relative to the current front card
          // Normalized so front = 0, others spread around the circle
          const angle = ((i - current + total) % total) * (360 / total)
          const angleRad = (angle * Math.PI) / 180

          // Position on the circle
          const translateZ = RADIUS
          const rotateY = angle

          // Scale and opacity based on how "front" the card is
          const normalizedAngle = angle > 180 ? 360 - angle : angle
          const scale = 1 - (normalizedAngle / 180) * 0.28
          const opacity = 1 - (normalizedAngle / 180) * 0.35
          const isFront = angle === 0

          return (
            <motion.div
              key={project.name}
              onClick={isFront ? () => onSelect(project) : () => setCurrent(i)}
              animate={{
                rotateY: -rotateY,
                z: Math.cos(angleRad) * RADIUS,
                scale,
                opacity,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '220px',
                height: '290px',
                marginLeft: '-110px',
                marginTop: '-145px',
                borderRadius: '24px',
                background: isFront
                  ? 'rgba(20, 30, 55, 0.85)'
                  : 'rgba(10, 15, 35, 0.6)',
                border: isFront
                  ? '1px solid rgba(99, 102, 241, 0.5)'
                  : '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                cursor: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '32px 24px',
                boxShadow: isFront
                  ? '0 20px 60px rgba(99,102,241,0.3), 0 0 0 1px rgba(99,102,241,0.2)'
                  : '0 10px 30px rgba(0,0,0,0.4)',
                zIndex: isFront ? 100 : Math.round(scale * 10),
                // 3D transform is handled by framer-motion via translateZ
                transformStyle: 'preserve-3d',
                transformOrigin: `center center -${RADIUS}px`,
                transform: `translateZ(${Math.cos(angleRad) * RADIUS}px)`,
              }}
            >
              {/* Animated preview BG (only on front card) */}
              {isFront && (
                <div
                  className={`showcase-bg ${project.previewStyle || ''} active`}
                  style={{ borderRadius: '24px', opacity: 0.5 }}
                />
              )}

              {/* Project name */}
              <h3
                style={{
                  fontSize: isFront ? '22px' : '17px',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: '12px',
                  lineHeight: 1.3,
                  zIndex: 2,
                  position: 'relative',
                }}
              >
                {project.name}
              </h3>

              {/* Button on front card only — anchored inside the card */}
              {isFront && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: '24px',
                    background: 'rgba(99,102,241,0.2)',
                    border: '1px solid rgba(99,102,241,0.5)',
                    color: '#a5b4fc',
                    borderRadius: '100px',
                    padding: '8px 20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    zIndex: 2,
                    position: 'relative',
                  }}
                >
                  Click to View Details →
                </motion.div>
              )}

              {/* Dim overlay for non-front cards */}
              {!isFront && (
                <p style={{ color: '#64748b', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Click to bring forward
                </p>
              )}
            </motion.div>
          )
        })}
      </motion.div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          color: '#fff',
          fontSize: '22px',
          cursor: 'none',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={next}
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          color: '#fff',
          fontSize: '22px',
          cursor: 'none',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }}
        aria-label="Next"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 200 }}>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '100px',
              background: i === current ? '#6366f1' : 'rgba(255,255,255,0.25)',
              border: 'none',
              cursor: 'none',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
