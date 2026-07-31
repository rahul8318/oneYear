import { useState } from 'react'
import { motion } from 'framer-motion'
import muskanPromises from '../data/muskanPromises'
import { FaRegHeart, FaCheck } from 'react-icons/fa'

export default function MuskanPromises() {
  const [checked, setChecked] = useState({})

  const toggleCheck = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className="py-12 px-4 md:py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-900/10 to-transparent" />

      <div className="max-w-4xl mx-auto relative">
        <motion.h2
          className="font-dancing text-3xl md:text-4xl lg:text-5xl text-center mb-3 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Promises to Me
        </motion.h2>
        <p className="text-center text-gray-400 mb-10 md:mb-12 text-sm md:text-lg">
          Select the promises you want to make to me 💝
        </p>

        <div className="space-y-3 md:space-y-4 max-w-2xl mx-auto">
          {muskanPromises.map((promise, index) => (
            <motion.div
              key={promise.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 flex items-center gap-4 cursor-pointer hover:bg-white/15 transition-all"
              onClick={() => toggleCheck(promise.id)}
            >
              <span className="text-xl md:text-2xl flex-shrink-0">{promise.emoji}</span>
              <p className="text-white/90 text-xs md:text-sm flex-1 text-left leading-relaxed">
                {promise.text}
              </p>
              <motion.div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  checked[promise.id]
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 border-pink-400 text-white'
                    : 'border-gray-500 text-transparent'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: checked[promise.id] ? 1 : 0.8 }}
              >
                <FaCheck className="text-xs" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
