import React from 'react'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="loading-root" aria-hidden>
      <motion.div
        className="loader"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 1.6 }}
      >
        <div className="loader-core" />
      </motion.div>
      <div className="loading-text">Darshika Dudhat</div>
    </div>
  )
}
