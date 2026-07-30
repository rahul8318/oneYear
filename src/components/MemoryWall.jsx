import { motion } from 'framer-motion'
import memories from '../data/memories'
import { FaStickyNote } from 'react-icons/fa'

const noteColors = [
  'bg-yellow-200/90 text-yellow-900',
  'bg-pink-200/90 text-pink-900',
  'bg-green-200/90 text-green-900',
  'bg-blue-200/90 text-blue-900',
  'bg-purple-200/90 text-purple-900',
  'bg-orange-200/90 text-orange-900',
  'bg-teal-200/90 text-teal-900',
  'bg-red-200/90 text-red-900',
  'bg-indigo-200/90 text-indigo-900',
  'bg-cyan-200/90 text-cyan-900',
  'bg-lime-200/90 text-lime-900',
  'bg-rose-200/90 text-rose-900',
]

export default function MemoryWall() {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        <motion.h2
          className="font-dancing text-5xl md:text-6xl text-center mb-4 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Memory Wall
        </motion.h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Our friendship, one note at a time</p>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {memories.map((memory, index) => {
            const rotation = (Math.random() - 0.5) * 8
            const color = noteColors[index % noteColors.length]

            return (
              <motion.div
                key={memory.id}
                className={`break-inside-avoid p-5 rounded-xl shadow-lg ${color} transform`}
                style={{ transform: `rotate(${rotation}deg)` }}
                initial={{ opacity: 0, scale: 0.5, rotate: rotation - 10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{memory.emoji}</span>
                  <p className="font-medium leading-snug">{memory.text}</p>
                </div>
                <FaStickyNote className="absolute top-2 right-3 opacity-10 text-4xl" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
