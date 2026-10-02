import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import Section from './ui/Section'
import { loveCards } from '../data/site'
import { useCoarsePointer } from '../hooks/useMediaQuery'

const EASE = [0.16, 1, 0.3, 1]

function TiltCard({ card, index }) {
  const reduced = useReducedMotion()
  const coarse = useCoarsePointer()
  const enabled = !reduced && !coarse
  const ref = useRef(null)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 160,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), {
    stiffness: 160,
    damping: 18,
  })

  const handleMove = (e) => {
    if (!enabled) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.article
      ref={ref}
      onPointerMove={enabled ? handleMove : undefined}
      onPointerLeave={reset}
      style={
        enabled
          ? { rotateX, rotateY, transformPerspective: 1000 }
          : undefined
      }
      initial={reduced ? false : { opacity: 0, y: 36, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.08, ease: EASE }}
      whileHover={reduced ? undefined : { y: -6 }}
      className="group relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-rose/25 sm:min-h-[17rem]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-rose/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
      />
      <span className="pointer-events-none absolute inset-x-7 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-rose/50 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

      <div className="relative">
        <p className="text-[0.6rem] tracking-[0.3em] text-cream-faint">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="display mt-5 text-balance text-2xl leading-snug text-cream sm:text-[1.7rem]">
          {card.title}
        </h3>
      </div>

      <p className="relative mt-6 text-sm font-light leading-relaxed text-cream-dim">
        {card.body}
      </p>
    </motion.article>
  )
}

export default function LoveCards() {
  return (
    <Section
      id="love"
      eyebrow="things i love about us"
      title="The small things that made it."
      subtitle="None of them are big. All of them are everything."
      className="bg-[linear-gradient(to_bottom,transparent,rgba(157,123,255,0.045),transparent)]"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loveCards.map((card, i) => (
          <TiltCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </Section>
  )
}
