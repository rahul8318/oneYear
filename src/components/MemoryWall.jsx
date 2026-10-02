import { useCallback, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Section from './ui/Section'
import Lightbox from './ui/Lightbox'
import { wallCards } from '../data/site'

const EASE = [0.16, 1, 0.3, 1]

const tilts = [0, -6, 7, 3, -4, 6, 2]

export default function MemoryWall() {
  const reduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(null)

  const photos = useMemo(
    () =>
      wallCards
        .map((card, i) => ({ ...card, index: i }))
        .filter((card) => card.kind === 'photo'),
    [],
  )

  const openAt = useCallback(
    (wallIndex) => {
      const photoIndex = photos.findIndex((p) => p.index === wallIndex)
      if (photoIndex >= 0) setActiveIndex(photoIndex)
    },
    [photos],
  )

  return (
    <>
      <Section
        id="wall"
        eyebrow="memory wall"
        title="A few pieces of my favourite year."
        subtitle="Scattered on purpose. Tap any photo to see it properly."
        className="overflow-hidden"
      >
        <div className="relative mx-auto grid max-w-3xl grid-cols-1 items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:h-[1080px] lg:max-w-6xl lg:grid-cols-none lg:gap-0">
          {wallCards.map((card, i) => {
            const tilt = tilts[i % tilts.length]
            return (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, y: 46, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: EASE }}
                className={`relative mx-auto w-full max-w-[290px] sm:max-w-[330px] lg:absolute lg:mx-0 lg:max-w-none ${card.className}`}
              >
                <motion.div
                  animate={
                    reduced
                      ? undefined
                      : { y: [0, -9, 0], rotate: [tilt, tilt + 0.8, tilt] }
                  }
                  transition={{
                    duration: 8 + (i % 4),
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.35,
                  }}
                  whileHover={reduced ? undefined : { scale: 1.03, y: -6 }}
                >
                  {card.kind === 'photo' ? (
                    <button
                      type="button"
                      onClick={() => openAt(i)}
                      className="group block w-full overflow-hidden rounded-[1.3rem] bg-ink-700 text-left shadow-[0_28px_70px_-34px_rgba(0,0,0,0.95)] ring-1 ring-white/10 transition-shadow duration-500 hover:shadow-[0_34px_90px_-30px_rgba(255,107,138,0.5)]"
                    >
                      <img
                        src={card.src}
                        alt={card.alt}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className={`w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07] ${card.ratio}`}
                      />
                      <span className="block px-4 py-3 font-script text-lg text-cream/90">
                        {card.caption}
                      </span>
                    </button>
                  ) : (
                    <div className="rounded-[1.3rem] bg-cream px-6 py-7 text-ink-900 shadow-[0_28px_70px_-34px_rgba(0,0,0,0.95)] ring-1 ring-white/20">
                      <p className="font-script text-xl leading-snug sm:text-2xl">
                        {card.text}
                      </p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </Section>

      <Lightbox
        items={photos.map(({ src, alt, caption }) => ({ src, alt, caption }))}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onIndexChange={setActiveIndex}
      />
    </>
  )
}
