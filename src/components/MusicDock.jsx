import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaPause, FaPlay, FaStepBackward, FaStepForward, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { soundtrack } from '../data/site'

const EASE = [0.16, 1, 0.3, 1]

function Equalizer({ playing }) {
  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-rose"
          animate={playing ? { height: ['4px', '12px', '5px', '11px', '4px'] } : { height: '4px' }}
          transition={
            playing
              ? { duration: 1.1 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
          style={{ height: '4px' }}
        />
      ))}
    </span>
  )
}

export default function MusicDock() {
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [track, setTrack] = useState(0)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  const current = soundtrack[track]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.5
    if (playing) {
      audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }
  }, [playing, track])

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  const step = (dir) => setTrack((t) => (t + dir + soundtrack.length) % soundtrack.length)

  return (
    <div className="pointer-events-none fixed inset-x-4 z-[65] flex pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:left-6 sm:bottom-0 sm:pb-6">
      <audio
        ref={audioRef}
        src={current.src}
        loop
        preload="none"
        onEnded={() => step(1)}
      />

      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.button
            key="collapsed"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: EASE }}
            className="pointer-events-auto flex min-h-[44px] items-center gap-3 rounded-full border border-white/10 bg-ink-900/70 px-4 py-2.5 backdrop-blur-md transition-colors duration-500 hover:border-rose/30"
          >
            <Equalizer playing={playing} />
            <span className="text-[0.68rem] tracking-[0.2em] text-cream-dim uppercase">
              our little soundtrack
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 24, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 18, scale: 0.97, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="pointer-events-auto w-full max-w-[19rem] rounded-2xl border border-white/10 bg-ink-900/85 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-rose/40 to-plum/40 text-cream">
                <Equalizer playing={playing} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-normal text-cream">{current.title}</p>
                <p className="truncate text-[0.7rem] text-cream-faint">{current.artist}</p>
              </div>
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? 'Unmute' : 'Mute'}
                className="-mr-1 flex h-9 w-9 flex-none items-center justify-center text-cream-faint transition-colors hover:text-cream"
              >
                {muted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous track"
                className="flex h-10 w-10 items-center justify-center text-cream-faint transition-colors hover:text-cream"
              >
                <FaStepBackward size={13} />
              </button>

              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause' : 'Play'}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose to-plum text-ink-950 transition-transform duration-300 hover:scale-105"
              >
                {playing ? <FaPause size={15} /> : <FaPlay size={15} className="ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next track"
                className="flex h-10 w-10 items-center justify-center text-cream-faint transition-colors hover:text-cream"
              >
                <FaStepForward size={13} />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
              <p className="text-[0.6rem] tracking-[0.2em] text-cream-faint uppercase">
                {playing ? 'now playing' : 'paused · tap play'}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[0.6rem] tracking-[0.2em] text-cream-faint uppercase transition-colors hover:text-cream-dim"
              >
                hide
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
