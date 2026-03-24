import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ isOpen, onClose, content }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && content && (
        <motion.div 
          className="modal-overlay" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content spotlight-card" // Reusing spotlight card styles for the premium glassmorphism feel
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
            
            {/* Dynamic Content Rendering */}
            <h2 className="modal-title">{content.title || content.role || content.name}</h2>
            
            {(content.school || content.company || content.venue) && (
              <h4 className="modal-subtitle">
                {content.school || content.company || content.venue} | {content.year || content.duration || content.date}
              </h4>
            )}
            
            {content.details && <p className="modal-desc">{content.details}</p>}
            {content.desc && <p className="modal-desc">{content.desc}</p>}
            
            {content.bullets && content.bullets.length > 0 && (
              <ul className="modal-list styled-list text-sm" style={{ marginTop: '20px' }}>
                {content.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
            
            {content.tech && content.tech.length > 0 && (
              <div className="skill-tags" style={{ marginTop: '24px' }}>
                {content.tech.map((t, i) => <span key={i} className="skill-tag">{t}</span>)}
              </div>
            )}
            
            {(content.link || content.github || content.projectLink) && (
              <div style={{ marginTop: '30px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {content.github && (
                  <a href={content.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', textDecoration: 'none' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    Code
                  </a>
                )}
                {content.projectLink && (
                  <a href={content.projectLink} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', textDecoration: 'none' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    Project
                  </a>
                )}
                {content.link && !content.github && !content.projectLink && (
                  <a href={content.link} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', padding: '10px 20px', textDecoration: 'none' }}>
                    {content.btnText || 'View Details'} ↗
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
