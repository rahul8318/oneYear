import { motion, useReducedMotion } from 'framer-motion'
import CountUp from './ui/CountUp'
import Reveal from './ui/Reveal'
import { counters } from '../data/site'

const EASE = [0.16, 1, 0.3, 1]

export default function TimeCounter() {
  const reduced = useReducedMotion()

  return (
    <section
      id="counter"
      className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 md:px-12 md:py-32 lg:py-36"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[40vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-plum/[0.07] blur-[90px]" />

      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="display text-balance text-3xl leading-tight text-cream/90 sm:text-5xl">
            That’s a lot of time...
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.04] sm:mt-20 md:grid-cols-3">
          {counters.map((item, i) => (
            <motion.div
              key={item.label}
              initial={reduced ? false : { opacity: 0, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: i * 0.09, ease: EASE }}
              className="group relative bg-ink-900 px-4 py-9 text-center transition-colors duration-500 hover:bg-ink-800 sm:px-8 sm:py-14"
            >
              <span
                aria-hidden
                className="absolute inset-x-6 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-rose/60 to-transparent transition-transform duration-700 group-hover:scale-x-100"
              />
              <p className="display text-[2.05rem] leading-none text-cream tabular-nums sm:text-5xl md:text-6xl">
                <CountUp to={item.value} />
              </p>
              <p className="mt-3 text-[0.6rem] tracking-[0.28em] text-cream-faint uppercase transition-colors duration-500 group-hover:text-rose/70 sm:mt-4 sm:text-[0.65rem] sm:tracking-[0.34em]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-16 text-center">
          <p className="display text-balance text-2xl leading-snug text-cream/80 sm:text-4xl">
            ...and somehow,{' '}
            <span className="text-blush italic">I still want more memories.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
