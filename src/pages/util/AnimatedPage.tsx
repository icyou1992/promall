import React from 'react'
import { motion } from 'framer-motion'

const AnimatedPage = ({ children }: any) => {
  const animations = {
    initial: { opacity: 0, y: 100, backgroundColor: '#123123' },
    animate: { opacity: 1, y: 0, backgroundColor: 'transparent' },
    exit: { opacity: 0, y: 100, backgroundColor: 'transparent' },
  }

  return (
    <motion.div 
      layout
      variants={animations} 
      initial={'initial'}
      animate={'animate'}
      // exit={'exit'}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedPage
