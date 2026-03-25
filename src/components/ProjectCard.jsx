import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Simple Inline SVG Icons
const GitHubIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const GlobeIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;

/**
 * 3D circular orbit animation values — unique per card so they move
 * at different speeds and phases, creating an organic floating group.
 */
function getOrbitParams(seed) {
  const s = seed % 7
  return {
    duration: 7 + s * 1.3,
    delay: s * 0.6,
    // Circular-ish path: rotateX and rotateY oscillate 90 degrees out of phase
    rxKeyframes: [0, 6, 0, -6, 0],
    ryKeyframes: [0, -8, 0, 8, 0],
    yKeyframes:  [0, -8, 0, 8, 0],
    xKeyframes:  [0, 6, 0, -6, 0],
  }
}

export default function ProjectCard({ project, onClick }) {
  const ref = useRef(null)
  const [hoverTilt, setHoverTilt] = useState({ rx: 0, ry: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const rafRef = useRef(null)

  const seed = project.name.charCodeAt(0) + project.name.length
  const orbit = getOrbitParams(seed)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
    const px = x / rect.width
    const py = y / rect.height
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() =>
      setHoverTilt({ rx: (0.5 - py) * 12, ry: (px - 0.5) * 12 })
    )
  }

  const handleLeave = () => {
    setIsHovered(false)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setHoverTilt({ rx: 0, ry: 0 })
  }

  // First 2-3 bullets shown on the card face
  const previewBullets = (project.bullets || []).slice(0, 2)

  return (
    /* Outer wrapper: continuous 3D circular orbit animation */
    <motion.div
      style={{ width: '100%', height: '100%', perspective: '1200px' }}
      animate={{
        rotateX: orbit.rxKeyframes,
        rotateY: orbit.ryKeyframes,
        y: orbit.yKeyframes,
        x: orbit.xKeyframes,
      }}
      transition={{
        repeat: Infinity,
        duration: orbit.duration,
        delay: orbit.delay,
        ease: 'easeInOut',
      }}
    >
      {/* Inner card: interactive hover tilt on top of the orbit */}
      <motion.div
        ref={ref}
        className="spotlight-wrapper"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onHoverStart={() => setIsHovered(true)}
        onClick={onClick}
        style={{
          width: '100%',
          minHeight: '380px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          cursor: 'none',
        }}
        animate={{ rotateX: hoverTilt.rx, rotateY: hoverTilt.ry }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        whileHover={{ scale: 1.04, zIndex: 10 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Animated background preview */}
        <div
          className={`showcase-bg ${project.previewStyle || ''} ${isHovered ? 'active' : ''}`}
          style={{ borderRadius: '28px' }}
        />

        {/* Card content */}
        <div
          className="spotlight-content"
          style={{
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            height: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <h3
            className="project-title"
            style={{ fontSize: '20px', marginBottom: project.status === 'ongoing' ? '6px' : '12px', lineHeight: '1.3' }}
          >
            {project.name}
          </h3>
          {project.status === 'ongoing' && (
            <span style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 600,
              color: '#38bdf8',
              background: 'rgba(56,189,248,0.1)',
              border: '1px solid rgba(56,189,248,0.3)',
              borderRadius: '999px',
              padding: '2px 10px',
              letterSpacing: '0.05em',
              marginBottom: '10px',
            }}>
              Ongoing
            </span>
          )}

          {/* 2 bullet points shown on the card face */}
          {previewBullets.length > 0 && (
            <ul style={{ margin: 0, padding: '0 0 0 16px', listStyleType: 'disc' }}>
              {previewBullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    color: '#94a3b8',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    marginBottom: '6px',
                  }}
                >
                  {b}
                </li>
              ))}
            </ul>
          )}

          {/* Hover-reveal CTA */}
          <AnimatePresence>
            {isHovered ? (
              <motion.div
                key="cta-hover"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  color: '#ffffff',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                }}
              >
                Click for Full Details →
              </motion.div>
            ) : (
              <motion.div
                key="cta-idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  color: 'var(--muted)',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Hover to explore
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
