import { motion, useReducedMotion } from 'framer-motion'
import Starlight from './ui/Starlight'

const EASE = [0.16, 1, 0.3, 1]

export default function OpeningScreen({ onEnter }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="fixed inset-0 z-[75] flex items-center justify-center overflow-hidden px-6"
      initial={false}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
      transition={{ duration: 1.15, ease: EASE }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#1b1226_0%,#0c0916_45%,#050409_100%)]" />

      <Starlight count={54} />

      <div
        aria-hidden
        className="anim-glow absolute left-1/2 top-[38%] h-[46vh] w-[46vh] rounded-full bg-rose/10 blur-[100px]"
      />

      <motion.div
        className="relative w-full max-w-xl text-center"
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      >
        <motion.p
          className="eyebrow mb-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
        >
          <span className="h-px w-10 bg-white/20" />
          made by hand, for you
          <span className="h-px w-10 bg-white/20" />
        </motion.p>

        <motion.h1
          className="display text-[3.4rem] leading-[1] text-cream sm:text-7xl md:text-8xl"
          initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.45, duration: 1.2, ease: EASE }}
        >
          Hey you<span className="text-rose">...</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-base font-light text-cream-dim sm:text-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1, ease: EASE }}
        >
          Before you scroll... a small thing I made for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 1, ease: EASE }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <motion.button
            type="button"
            onClick={onEnter}
            whileHover={reduced ? undefined : { scale: 1.035 }}
            whileTap={reduced ? undefined : { scale: 0.975 }}
            className="group relative overflow-hidden rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-sm font-normal tracking-wide text-cream backdrop-blur-md transition-colors duration-500 hover:border-rose/40 sm:px-10 sm:py-5 sm:text-base"
          >
            <span
              className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'linear-gradient(120deg, rgba(255,107,138,0.28), rgba(157,123,255,0.28))',
              }}
            />
            <span className="relative flex items-center gap-2">
              Enter our little world
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </span>
          </motion.button>

          <motion.p
            className="text-[0.7rem] tracking-[0.22em] text-cream-faint uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.45, duration: 1 }}
          >
            ~ 2 minutes · headphones optional
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
