import React from 'react'
import { motion } from 'framer-motion'

export default function Button({ children, onClick, className='' }) {
  return (
    <motion.button
      className={`btn ${className}`}
      whileTap={{ scale: 0.96 }}
      whileHover={{ translateY: -2 }}
      onClick={onClick}
    >
      <span className="btn-inner">{children}</span>
    </motion.button>
  )
}
