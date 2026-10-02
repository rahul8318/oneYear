import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import AnimatedText from './ui/AnimatedText'
import Starlight from './ui/Starlight'
import Grain from './ui/Grain'
import { hero } from '../data/site'

const EASE = [0.16, 1, 0.3, 1]

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-32%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-28 pt-32 sm:px-8 md:px-12 md:pb-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_78%_28%,rgba(157,123,255,0.16)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_12%_78%,rgba(255,107,138,0.13)_0%,transparent_65%)]" />
      <Starlight count={30} />
      <Grain />

      <motion.div
        style={reduced ? undefined : { y: textY, opacity: fade }}
        className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-8"
      >
        <div className="md:col-span-7">
          <motion.p
            className="eyebrow mb-7 flex items-center gap-3"            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
          >
            <span className="h-px w-8 bg-white/20" />
            {hero.eyebrow}
          </motion.p>

          <AnimatedText
            as="h1"
            text={hero.title}
            className="display text-[3.2rem] leading-[0.94] text-cream sm:text-[5rem] md:text-[5rem] lg:text-[6.4rem] xl:text-[7.2rem]"
            delay={0.25}
            stagger={0.07}
          />

          <motion.div
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 1.4, ease: EASE }}
            className="mt-8 h-px w-full max-w-sm origin-left bg-gradient-to-r from-rose/50 via-plum/40 to-transparent"
          />

          <motion.p
            className="mt-8 max-w-md text-balance text-base font-light leading-relaxed text-cream-dim sm:text-lg"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: EASE }}
          >
            {hero.body}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.7rem] tracking-[0.3em] text-cream-faint uppercase"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <span>one year</span>
            <span className="h-1 w-1 rounded-full bg-rose/60" />
            <span>twelve months</span>
            <span className="h-1 w-1 rounded-full bg-plum/60" />
            <span>one of me</span>
          </motion.div>
        </div>

        <div className="flex justify-center md:col-span-5 md:justify-end">
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.35, duration: 1.5, ease: EASE }}
            className="relative"
          >
            <motion.div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-[70px]"
              style={{
                background:
                  'radial-gradient(circle at 50% 40%, rgba(255,107,138,0.55), rgba(157,123,255,0.28) 45%, transparent 70%)',
              }}
            />

            <motion.div
              style={reduced ? undefined : { y: imageY, scale: imageScale }}
              className="relative"
            >
              <div className="anim-drift rounded-[46%_46%_26px_26px/34%_34%_26px_26px] shadow-[0_40px_120px_-30px_rgba(255,107,138,0.45)]">
                <img
                  src={hero.image}
                  alt="Us, one year in"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="aspect-[3/4] w-[min(74vw,320px)] rounded-[inherit] object-cover sm:w-[min(60vw,360px)]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-t from-ink-950/70 via-transparent to-white/5" />
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
              </div>

              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-ink-900/70 px-4 py-2 text-[0.65rem] tracking-[0.26em] text-cream-dim uppercase backdrop-blur-md"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.25, duration: 1 }}
              >
                day one — and still counting
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#counter"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.28em] text-cream-faint uppercase transition-colors hover:text-cream-dim md:bottom-8"
      >
        <span>scroll to remember</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-rose/80"
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  )
}
