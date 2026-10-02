import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import OpeningScreen from './components/OpeningScreen'
import Hero from './components/Hero'
import TimeCounter from './components/TimeCounter'
import MemoriesGallery from './components/MemoriesGallery'
import TimelineChapter from './components/TimelineChapter'
import LoveCards from './components/LoveCards'
import MemoryWall from './components/MemoryWall'
import Letter from './components/Letter'
import FinalPhoto from './components/FinalPhoto'
import FinalScreen from './components/FinalScreen'
import MusicDock from './components/MusicDock'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'

const EASE = [0.16, 1, 0.3, 1]

export default function App() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('is-locked', !entered)
    return () => document.body.classList.remove('is-locked')
  }, [entered])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [entered])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!entered && <OpeningScreen key="opening" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <ScrollProgress />
      <CursorGlow />

      {entered && (
        <motion.main
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE }}
          className="relative"
        >
          <Hero />
          <TimeCounter />
          <MemoriesGallery />
          <TimelineChapter />
          <LoveCards />
          <MemoryWall />
          <Letter />
          <FinalPhoto />
          <FinalScreen />
          <MusicDock />
        </motion.main>
      )}
    </MotionConfig>
  )
}
