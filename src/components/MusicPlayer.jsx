import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

const play = [
  {
    title: "Agar Tum Saath Ho",
    artist: "Alka Yagnik & Arijit Singh",
    url: "/songs/agar-tum-saath-ho.mp3"
  },
  {
    title: "Tu Jaane Na",
    artist: "Atif Aslam",
    url: "/songs/tu-jaane-na.mp3"
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      if (isPlaying) {
        audioRef.current.play().catch(() => {})
      }
    }
  }, [currentTrack, isPlaying])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {})
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % play.length)
    setIsPlaying(true)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + play.length) % play.length)
    setIsPlaying(true)
  }

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value))
    setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 glass-card p-2 w-56 shadow-2xl cursor-grab active:cursor-grabbing"
      drag
      dragMomentum={false}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <audio ref={audioRef} src={play[currentTrack].url} loop />

      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <span className="text-xs">â�ª</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white font-medium text-[10px] truncate">{play[currentTrack].title}</p>
          <p className="text-gray-400 text-[9px] truncate">{play[currentTrack].artist}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-2">
        <button onClick={prevTrack} className="text-gray-400 hover:text-white transition-colors text-xs">
          <FaStepBackward />
        </button>
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg hover:shadow-pink-500/50 transition-all"
        >
          {isPlaying ? <FaPause /> : <FaPlay className="ml-0.5" />}
        </button>
        <button onClick={nextTrack} className="text-gray-400 hover:text-white transition-colors text-xs">
          <FaStepForward />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors text-[10px]">
          {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
      </div>
    </motion.div>
  )
}