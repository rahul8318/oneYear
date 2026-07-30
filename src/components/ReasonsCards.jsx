import { motion } from 'framer-motion'
import reasons from '../data/reasons'

const iconMap = {
  FaSmile: 'FaSmile',
  FaHandsHelping: 'FaHandsHelping',
  FaHeart: 'FaHeart',
  FaStar: 'FaStar',
  FaHandHoldingHeart: 'FaHandHoldingHeart',
  FaComments: 'FaComments',
  FaGift: 'FaGift',
  FaLaughBeam: 'FaLaughBeam',
  FaBrain: 'FaBrain',
  FaHome: 'FaHome',
  FaTrophy: 'FaTrophy',
  FaCloudSun: 'FaCloudSun',
  FaHug: 'FaHug',
  FaCrown: 'FaCrown',
  FaBalanceScale: 'FaBalanceScale',
  FaUserSecret: 'FaUserSecret',
  FaMapMarkerAlt: 'FaMapMarkerAlt',
  FaBullhorn: 'FaBullhorn',
  FaLightbulb: 'FaLightbulb',
  FaPalette: 'FaPalette',
  FaSun: 'FaSun',
  FaBookOpen: 'FaBookOpen',
  FaShieldAlt: 'FaShieldAlt',
  FaMagic: 'FaMagic',
  FaGem: 'FaGem',
  FaInfinity: 'FaInfinity',
  FaSmileWink: 'FaSmileWink',
  FaBell: 'FaBell',
}

export default function ReasonsCards() {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-900/10 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        <motion.h2
          className="font-dancing text-5xl md:text-6xl text-center mb-4 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Reasons You're Amazing
        </motion.h2>
        <p className="text-center text-gray-400 mb-16 text-lg">28 reasons why I'm grateful for you</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const IconComponent = iconMap[reason.icon]
            return (
              <motion.div
                key={reason.id}
                className={`glass-card p-6 text-center cursor-pointer bg-gradient-to-br ${reason.color} bg-opacity-10 border-white/10`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: index * 0.1 }}
                >
                  {IconComponent && <span className="text-2xl">✨</span>}
                </motion.div>
                <p className="text-white/90 font-medium leading-relaxed">{reason.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
