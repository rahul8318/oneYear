import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Image with a cinematic mask reveal + inner zoom settle.
 * No distortion: the crop is driven by the wrapper's aspect ratio.
 */
export default function Photo({
  src,
  alt,
  className = '',
  imgClassName = '',
  ratio = '',
  priority = false,
  hoverZoom = true,
  amount = 0.3,
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`relative overflow-hidden bg-ink-700 ${ratio} ${className}`}
      initial={
        reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.4 }
      }
      whileInView={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.div
        className="group/photo h-full w-full"
        initial={reduced ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          className={`h-full w-full object-cover transition-transform duration-[900ms] ease-out ${
            hoverZoom ? 'group-hover/photo:scale-[1.06]' : ''
          } ${imgClassName}`}
        />
      </motion.div>
    </motion.div>
  )
}
