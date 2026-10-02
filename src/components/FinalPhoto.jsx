import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import AnimatedText from './ui/AnimatedText'
import Grain from './ui/Grain'
import { photos } from '../data/site'

const EASE = [0.16, 1, 0.3, 1]

export default function FinalPhoto() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.16, 1.02])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.15])

  return (
    <section ref={ref} className="relative h-[210vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <motion.div style={reduced ? undefined : { scale, y }} className="absolute inset-0">
          <img
            src={photos.sep20}
            alt="The two of us"
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/45 to-ink-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,transparent_0%,rgba(5,4,9,0.6)_100%)]" />
        <Grain />

        <motion.div
          style={reduced ? undefined : { opacity: textOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center"
        >
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE }}
            className="display text-balance text-2xl italic text-cream/80 sm:text-4xl"
          >
            And somehow...
          </motion.p>

          <AnimatedText
            as="h2"
            text="this was only year one."
            className="display mt-4 text-balance text-[3rem] leading-[0.98] text-cream sm:text-7xl md:text-8xl"
            delay={0.15}
            stagger={0.07}
          />

          <motion.div
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.6, duration: 1.4, ease: EASE }}
            className="mt-8 h-px w-40 bg-gradient-to-r from-transparent via-cream/30 to-transparent"
          />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.75, duration: 1.1, ease: EASE }}
            className="mt-8 max-w-xl text-balance text-base font-light leading-relaxed text-cream-dim sm:text-xl"
          >
            Here’s to all the memories we haven’t made yet.
            <span className="ml-1 text-blush">🤍</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
