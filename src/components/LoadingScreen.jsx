import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaStar } from 'react-icons/fa'

export default function LoadingScreen({ onComplete }) {
  const [text, setText] = useState('')
  const fullText = "Preparing a special surprise for Muskan..."

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1))
      index++
      if (index >= fullText.length) {
        clearInterval(interval)
        setTimeout(onComplete, 1500)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative mb-8">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FaHeart className="text-7xl text-rose-400 drop-shadow-[0_0_30px_rgba(244,63,94,0.8)]" />
        </motion.div>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 2
            }}
          >
            <FaStar className="text-yellow-300 text-xl" />
          </motion.div>
        ))}
      </div>
      <motion.p
        className="font-poppins text-xl md:text-2xl text-pink-200 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {text}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-0.5 h-6 bg-pink-300 ml-1 align-middle"
        />
      </motion.p>
    </motion.div>
  )
}
