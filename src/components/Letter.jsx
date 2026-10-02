import { motion, useReducedMotion } from 'framer-motion'
import { letter } from '../data/site'

const EASE = [0.16, 1, 0.3, 1]

export default function Letter() {
  const reduced = useReducedMotion()

  return (
    <section id="letter" className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 md:px-12 md:py-32 lg:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(255,178,122,0.08)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.015] px-5 py-10 backdrop-blur-sm sm:px-12 sm:py-16 md:px-16"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-rose/10 blur-3xl"
          />

          <p className="eyebrow mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-white/20" />
            {letter.eyebrow}
            <span className="h-px w-8 bg-white/20" />
          </p>

          <h2 className="display text-balance text-[2.4rem] leading-[1.05] text-cream sm:text-6xl">
            Okay... one serious moment.
          </h2>

          <div className="mt-10 space-y-1 sm:mt-12">
            {letter.lines.map((line, i) => (
              <motion.p
                key={line.text}
                initial={reduced ? false : { opacity: 0, y: 26, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.85, ease: EASE }}
                className={
                  line.style === 'lead'
                    ? 'display max-w-xl text-balance text-[1.75rem] leading-snug text-cream/90 sm:text-[2rem]'
                    : line.style === 'gap'
                      ? 'pt-8 text-[1.02rem] font-light leading-relaxed text-cream-dim sm:text-xl'
                      : line.style === 'accent'
                        ? 'pt-6 text-[1.02rem] font-light leading-relaxed text-cream sm:text-xl'
                        : line.style === 'signature'
                          ? 'pt-8 font-script text-3xl text-blush sm:text-4xl'
                          : 'text-[1.02rem] font-light leading-relaxed text-cream-dim sm:text-xl'
                }
              >
                {line.style === 'accent' ? (
                  <>
                    But I’m really glad this year had{' '}
                    <span className="text-blush italic">you</span> in it.
                  </>
                ) : (
                  line.text
                )}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="mt-10 h-px w-24 origin-left bg-gradient-to-r from-rose/60 to-transparent"
          />
          <p className="mt-5 text-[0.65rem] tracking-[0.3em] text-cream-faint uppercase">
            with love · year one
          </p>
        </motion.div>
      </div>
    </section>
  )
}
