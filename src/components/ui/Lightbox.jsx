import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'

const EASE = [0.16, 1, 0.3, 1]

export default function Lightbox({ items, index, onClose, onIndexChange }) {
  const reduced = useReducedMotion()
  const open = index !== null && index >= 0
  const total = items.length

  const go = useCallback(
    (dir) => {
      if (!total) return
      onIndexChange((index + dir + total) % total)
    },
    [index, total, onIndexChange],
  )

  useEffect(() => {
    if (!open) return
    document.body.classList.add('is-locked')
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, go, onClose])

  const item = open ? items[index] : null

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Memory viewer"
          className="fixed inset-0 z-[80] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <motion.button
            type="button"
            aria-label="Close viewer"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-ink-950/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.figure
            className="relative z-10 mx-4 flex w-full max-w-4xl flex-col items-center"
            drag={reduced ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1)
              else if (info.offset.x > 70) go(-1)
            }}
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 rounded-[3rem] bg-rose/10 blur-3xl" />

            <img
              src={item.src}
              alt={item.alt || ''}
              draggable={false}
              className="max-h-[68vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)]"
            />

            {item.caption && (
              <figcaption className="mt-6 text-center text-sm font-light text-cream-dim md:text-base">
                {item.caption}
              </figcaption>
            )}
            {total > 1 && (
              <p className="mt-3 text-[0.7rem] tracking-[0.3em] text-cream-faint">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
            )}
          </motion.figure>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous memory"
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3.5 text-cream/80 backdrop-blur-md transition hover:bg-white/10 hover:text-cream sm:left-6 sm:p-4"
              >
                <FaChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next memory"
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3.5 text-cream/80 backdrop-blur-md transition hover:bg-white/10 hover:text-cream sm:right-6 sm:p-4"
              >
                <FaChevronRight size={18} />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-white/5 p-3.5 text-cream/80 backdrop-blur-md transition hover:bg-white/10 hover:text-cream sm:right-8 sm:top-8"
          >
            <FaTimes size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
