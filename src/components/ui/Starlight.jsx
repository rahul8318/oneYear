import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Lightweight ambient starfield. DOM-based (GPU friendly), no canvas loop.
 * Rendered inside a positioned parent.
 */
export default function Starlight({ count = 46, className = '' }) {
  const reduced = useReducedMotion()

  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 1 + Math.random() * 2.2
        return {
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size,
          opacity: 0.18 + Math.random() * 0.5,
          duration: 9 + Math.random() * 14,
          delay: Math.random() * 12,
          drift: (Math.random() - 0.5) * 34,
        }
      }),
    [count],
  )

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-cream"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            boxShadow: '0 0 6px rgba(247,241,236,0.5)',
            animation: reduced
              ? 'none'
              : `drift ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}
