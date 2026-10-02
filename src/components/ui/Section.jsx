import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Section shell: consistent vertical rhythm, optional centered heading block.
 */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  children,
}) {
  const reduced = useReducedMotion()
  const centered = align === 'center'

  return (
    <section
      id={id}
      className={`relative px-5 py-20 sm:px-8 sm:py-28 md:px-12 md:py-32 lg:py-36 ${className}`}
    >
      {(eyebrow || title || subtitle) && (
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
          className={`mx-auto mb-14 max-w-2xl md:mb-20 ${
            centered ? 'text-center' : 'text-left'
          }`}
        >
          {eyebrow && (
            <p className="eyebrow mb-5 flex items-center gap-3">
              {!centered && <span className="h-px w-8 bg-white/20" />}
              {eyebrow}
              {centered && (
                <>
                  <span className="h-px w-8 bg-white/20" />
                  <span className="h-1 w-1 rounded-full bg-rose/70" />
                  <span className="h-px w-8 bg-white/20" />
                </>
              )}
            </p>
          )}
          {title && (
            <h2 className="display text-balance text-[2.6rem] leading-[1.02] text-cream sm:text-6xl md:text-7xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-6 text-balance text-base font-light leading-relaxed text-cream-dim md:text-lg">
              {subtitle}
            </p>
          )}
        </motion.header>
      )}
      {children}
    </section>
  )
}
