import React, { useRef } from 'react'
import { motion } from 'framer-motion'

export default function SpotlightCard({ children, className = '', ...props }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty('--mouse-x', `${x}px`)
    ref.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.div
      ref={ref}
      className={`spotlight-wrapper ${className}`}
      onMouseMove={handleMove}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      <div className="spotlight-content">
        {children}
      </div>
    </motion.div>
  )
}
