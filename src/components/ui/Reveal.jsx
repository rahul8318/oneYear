import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Generic scroll-triggered reveal. Pass motion props (initial / variants) freely.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 34,
  blur = 6,
  once = true,
  amount = 0.3,
  className = '',
  ...rest
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
