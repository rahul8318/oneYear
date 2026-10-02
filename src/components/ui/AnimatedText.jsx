import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Word-by-word masked reveal. Pass an array for multiple lines.
 */
export default function AnimatedText({
  text,
  as: Tag = 'span',
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.06,
  duration = 1.05,
  once = true,
}) {
  const reduced = useReducedMotion()
  const lines = Array.isArray(text) ? text : [text]

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={lineClassName}>
            {line}
            {'\n'}
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag className={className}>
      {lines.map((line, li) => (
        <span key={li} className={`block ${lineClassName}`}>
          {line.split(' ').map((word, wi) => (
            <span
              key={wi}
              className="inline-block overflow-hidden align-bottom pb-[0.14em] pr-[0.22em]"
            >
              <motion.span
                className="inline-block"
                initial={{ y: '112%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once, amount: 0.5 }}
                transition={{
                  duration,
                  delay: delay + (li * 0.18 + wi * stagger),
                  ease: EASE,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
