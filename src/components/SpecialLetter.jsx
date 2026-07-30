import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaEnvelope, FaHeart } from 'react-icons/fa'

export default function SpecialLetter() {
  const [isOpen, setIsOpen] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    if (isOpen && footerRef.current) {
      setTimeout(() => {
        footerRef.current.scrollIntoView({ behavior: 'smooth' })
      }, 600)
    }
  }, [isOpen])

  return (
<section className="py-12 px-4 md:py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-900/10 to-transparent" />

      <div className="max-w-3xl mx-auto text-center relative">
        <motion.h2
          className="font-dancing text-3xl md:text-4xl lg:text-5xl mb-3 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          A Letter Just For You
        </motion.h2>
        <p className="text-gray-400 mb-8 md:mb-10 text-sm md:text-base">Click the envelope to read my heart</p>

        <motion.div
          className="relative w-48 h-40 mx-auto cursor-pointer md:w-56 md:h-44"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="envelope"
                initial={{ rotateX: 0 }}
                exit={{ rotateX: -180 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-600 rounded-2xl shadow-2xl shadow-pink-500/30 flex items-center justify-center">
                  <FaEnvelope className="text-4xl md:text-5xl text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-12 bg-gradient-to-b from-pink-300 to-pink-500 rounded-t-2xl origin-bottom"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isOpen ? -180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformOrigin: 'bottom center' }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card p-5 md:p-7 text-left"
              >
                <h3 className="font-dancing text-xl md:text-2xl text-pink-300 mb-3">Dear Muskan â¤ï¸</h3>
                <div className="text-gray-300 space-y-2 md:space-y-3 leading-relaxed text-xs md:text-sm">
                  <p>
                    I just wanted to take a moment to tell you how incredibly grateful I am to have you in my life. Even though miles separate us, you feel closer than anyone ever has.
                  </p>
                  <p>
                    Thank you for being the friend who listens, who laughs at my terrible jokes, who sends memes at 2 AM, and who never lets me feel alone in this big world.
                  </p>
                  <p>
                    Every text, every call, every memory weâve shared â€” they are all treasures I hold close to my heart. You make my days brighter, my burdens lighter, and my life so much more beautiful.
                  </p>
                  <p>
                    Hereâs to more late-night talks, more inside jokes, more adventures, and a future where distance is just a memory.
                  </p>
                  <p className="font-dancing text-lg md:text-xl text-pink-300 text-right">
                    Your Best Friend <FaHeart className="inline text-rose-400" />
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="text-gray-500 text-xs mt-6 md:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {isOpen ? 'Click to close the letter' : 'Click the envelope to open'}
        </motion.p>
      </div>

      <div ref={footerRef} />
    </section>
  )
}
