import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaComments, FaStar, FaMoon, FaLaughBeam, FaHandsHelping, FaMagic } from 'react-icons/fa'
import timelineData from '../data/timeline'

const iconMap = {
  "💬": FaComments,
  "🌟": FaStar,
  "🌙": FaMoon,
  "😂": FaLaughBeam,
  "🤝": FaHandsHelping,
  "✨": FaMagic,
}

export default function FriendshipTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="timeline" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        <motion.h2
          className="font-dancing text-5xl md:text-6xl text-center mb-4 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Friendship Timeline
        </motion.h2>
        <p className="text-center text-gray-400 mb-16 text-lg">A journey of a thousand miles begins with a single step</p>

        <div ref={ref} className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 hidden md:block" />

          {timelineData.map((item, index) => {
            const Icon = iconMap[item.emoji] || FaClock
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={item.id}
                className={`relative flex items-center mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="md:w-1/2 p-4">
                  <motion.div
                    className="glass-card p-6 md:p-8 hover:border-pink-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                        <Icon className="text-white text-lg" />
                      </div>
                      <span className="text-sm text-pink-300 font-medium">{item.year}</span>
                    </div>
                    <h3 className="font-dancing text-3xl mb-2 text-pink-200">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>

                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 items-center justify-center shadow-lg shadow-pink-500/50 z-10">
                  <span className="text-xl">{item.emoji}</span>
                </div>

                <div className="md:w-1/2" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
