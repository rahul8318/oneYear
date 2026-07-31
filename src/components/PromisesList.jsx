import { motion } from 'framer-motion'
import promises from '../data/promises'
import { FaRegHeart } from 'react-icons/fa'

const noteColors = [
  'bg-yellow-200/90 text-yellow-900',
  'bg-pink-200/90 text-pink-900',
  'bg-green-200/90 text-green-900',
  'bg-blue-200/90 text-blue-900',
  'bg-purple-200/90 text-purple-900',
  'bg-orange-200/90 text-orange-900',
  'bg-teal-200/90 text-teal-900',
]

export default function PromisesList() {
  return (
    <section className="py-12 px-4 md:py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-900/10 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        <motion.h2
          className="font-dancing text-3xl md:text-4xl lg:text-5xl text-center mb-3 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Promises I Made to You
        </motion.h2>
        <p className="text-center text-gray-400 mb-10 md:mb-12 text-sm md:text-lg">Things I will always be here for</p>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {promises.map((promise, index) => {
            const rotation = (Math.random() - 0.5) * 8
            const color = noteColors[index % noteColors.length]

            return (
              <motion.div
                key={promise.id}
                className={`break-inside-avoid p-5 rounded-xl shadow-lg ${color} transform`}
                style={{ transform: `rotate(${rotation}deg)` }}
                initial={{ opacity: 0, scale: 0.5, rotate: rotation - 10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{promise.emoji}</span>
                  <p className="font-medium leading-snug text-xs md:text-sm">{promise.text}</p>
                </div>
                <FaRegHeart className="absolute top-2 right-3 opacity-10 text-2xl" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
