import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import AnimatedText from './ui/AnimatedText'
import Starlight from './ui/Starlight'
import Grain from './ui/Grain'

const EASE = [0.16, 1, 0.3, 1]
const GLYPHS = ['♥', '✦', '♥', '✧', '♥', '✦']

function makeBurst(id) {
  return Array.from({ length: 14 }, (_, i) => ({
    id: `${id}-${i}`,
    x: `${38 + Math.random() * 24}%`,
    y: `${44 + Math.random() * 10}%`,
    dx: (Math.random() - 0.5) * 320,
    dy: -80 - Math.random() * 220,
    rot: (Math.random() - 0.5) * 180,
    glyph: GLYPHS[i % GLYPHS.length],
  }))
}

export default function FinalScreen() {
  const reduced = useReducedMotion()
  const [pieces, setPieces] = useState([])

  const celebrate = () => {
    if (reduced) return
    setPieces(makeBurst(Date.now()))
  }

  const clearPiece = (id) =>
    setPieces((prev) => prev.filter((piece) => piece.id !== id))

  return (
    <section
      id="finale"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-40 pt-28 text-center sm:pb-32 md:px-12"
    >
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(255,107,138,0.14)_0%,transparent_65%)]" />
      <Starlight count={26} />
      <Grain />

      <div className="relative mx-auto max-w-3xl">
        <motion.p
          className="eyebrow mb-8 flex items-center justify-center gap-3"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="h-px w-8 bg-white/20" />
          the end (for now)
          <span className="h-px w-8 bg-white/20" />
        </motion.p>

        <AnimatedText
          as="h2"
          text={['Happy 1 Year,', 'Besty.']}
          className="display text-[3rem] leading-[1.02] text-cream sm:text-7xl md:text-8xl"
          stagger={0.05}
        />

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.5, duration: 1, ease: EASE }}
          className="mt-8 text-balance text-base font-light leading-relaxed text-cream-dim sm:text-lg"
        >
          Thank you for making this year unforgettable.
        </motion.p>

        <div className="relative mt-14 flex h-16 items-center justify-center">
          <button
            type="button"
            onClick={celebrate}
            aria-label="Send a heart"
            className="-m-2 p-3 text-4xl leading-none text-rose transition-transform duration-300 hover:scale-110 sm:text-5xl"
          >
            <span className={reduced ? '' : 'anim-heartbeat inline-block'}>♥</span>
          </button>

          {pieces.map((piece) => (
            <motion.span
              key={piece.id}
              className="pointer-events-none absolute text-lg"
              style={{ left: piece.x, top: piece.y }}
              initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: [0.4, 1.2, 0.9],
                x: piece.dx,
                y: piece.dy,
                rotate: piece.rot,
              }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              onAnimationComplete={() => clearPiece(piece.id)}
            >
              {piece.glyph}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.8, duration: 1.2, ease: EASE }}
          className="mt-4 text-[0.7rem] tracking-[0.24em] text-cream-faint uppercase"
        >
          (tap it, it won’t bite)
        </motion.p>

        <motion.div
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.6, duration: 1.4, ease: EASE }}
          className="mx-auto mt-16 h-px w-40 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.7, duration: 1.1, ease: EASE }}
          className="mx-auto mt-8 max-w-md text-balance text-sm font-light leading-relaxed text-cream-dim"
        >
          Made with way too much effort and a lot of love for my favourite human.
        </motion.p>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 1, duration: 1.2, ease: EASE }}
          className="mt-6 font-script text-2xl text-blush/90"
        >
          year two, whenever you’re ready.
        </motion.p>
      </div>
    </section>
  )
}
