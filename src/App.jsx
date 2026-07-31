import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import HeroSection from './components/HeroSection'
import FriendshipTimeline from './components/FriendshipTimeline'
import ReasonsCards from './components/ReasonsCards'
import FriendshipQuotes from './components/FriendshipQuotes'
import MemoryWall from './components/MemoryWall'
import PromisesList from './components/PromisesList'
import MuskanPromises from './components/MuskanPromises'
import SpecialLetter from './components/SpecialLetter'
import MusicPlayer from './components/MusicPlayer'
import { triggerConfetti, triggerHearts, triggerSkyFirecracker } from './utils/effects'

export default function App() {
  const [loading, setLoading] = useState(true)

  const handleButtonClick = (e) => {
    triggerConfetti(e.clientX, e.clientY)
    triggerHearts(e.clientX, e.clientY)
  }

  const handleScreenTap = (e) => {
    triggerSkyFirecracker(e.clientX, e.clientY)
  }

  return (
    <div
      className="min-h-screen bg-[#0f0f1a]"
      onClick={handleScreenTap}
      onTouchStart={(e) => {
        const touch = e.touches[0]
        triggerSkyFirecracker(touch.clientX, touch.clientY)
      }}
    >
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroSection />
          <FriendshipTimeline />
          <ReasonsCards />
          <FriendshipQuotes />
          <MemoryWall />
          <PromisesList />
          <MuskanPromises />
          <SpecialLetter />
          <MusicPlayer />

          <button
            onClick={handleButtonClick}
            className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-2xl shadow-pink-500/40 hover:shadow-pink-500/60 transition-all duration-300"
            title="Spread Love"
          >
            🎉
          </button>
        </motion.div>
      )}
    </div>
  )
}
