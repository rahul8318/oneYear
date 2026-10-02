import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Section from './ui/Section'
import Photo from './ui/Photo'
import { chapters } from '../data/site'

const EASE = [0.16, 1, 0.3, 1]

export default function TimelineChapter() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 65%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section
      id="timeline"
      eyebrow="how we got here"
      title="A year in little moments."
      subtitle="Four chapters. Hundreds of conversations. One very good decision."
    >
      <div ref={ref} className="relative mx-auto max-w-5xl">
        <div className="absolute left-[7px] top-0 h-full w-px bg-white/[0.08] md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          style={reduced ? { scaleY: 1 } : { scaleY: lineScale }}
          className="absolute left-[7px] top-0 h-full w-px origin-top bg-gradient-to-b from-rose via-plum to-ember shadow-[0_0_20px_rgba(255,107,138,0.45)] md:left-1/2 md:-translate-x-1/2"
        />

        <div className="flex flex-col">
          {chapters.map((chapter, i) => {
            const left = i % 2 === 0
            return (
              <motion.article
                key={chapter.id}
                initial={reduced ? false : { opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1, ease: EASE }}
                className="relative grid grid-cols-1 gap-7 pb-16 pl-10 last:pb-0 md:grid-cols-2 md:gap-16 md:pb-24 md:pl-0"
              >
                <span
                  aria-hidden
                  className="absolute left-[7px] top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-rose/60 bg-ink-900 shadow-[0_0_16px_rgba(255,107,138,0.6)] md:left-1/2 md:top-3"
                />

                <div
                  className={
                    left
                      ? 'md:col-start-1 md:pr-8 md:text-right lg:pr-14'
                      : 'md:col-start-2 md:pl-8 lg:pl-14'
                  }
                >
                  <p className="eyebrow mb-3">Chapter {chapter.id}</p>
                  <h3 className="display text-3xl leading-tight text-cream sm:text-4xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 text-[0.95rem] font-light leading-relaxed text-cream-dim">
                    {chapter.body}
                  </p>
                </div>

                {chapter.image && (
                  <div
                    className={
                      left
                        ? 'md:col-start-2 md:pl-8 lg:pl-14'
                        : 'md:col-start-1 md:row-start-1 md:pr-8 lg:pr-14'
                    }
                  >
                    <Photo
                      src={chapter.image}
                      alt={chapter.alt}
                      ratio="aspect-[4/3]"
                      className="rounded-[1.4rem] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.07]"
                    />
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
