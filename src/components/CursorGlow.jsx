import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

const INTERACTIVE = 'a, button, [role="button"], input, label'

export default function CursorGlow() {
  const fine = useMediaQuery('(pointer: fine)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const active = fine && !reduced
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 700, damping: 40, mass: 0.35 })
  const dotY = useSpring(y, { stiffness: 700, damping: 40, mass: 0.35 })
  const glowX = useSpring(x, { stiffness: 160, damping: 26, mass: 0.6 })
  const glowY = useSpring(y, { stiffness: 160, damping: 26, mass: 0.6 })

  useEffect(() => {
    if (!active) return
    document.documentElement.classList.add('cursor-custom')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHovering(Boolean(e.target.closest?.(INTERACTIVE)))
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      document.documentElement.classList.remove('cursor-custom')
      window.removeEventListener('pointermove', move)
    }
  }, [active, x, y])

  if (!active) return null

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/[0.07] blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed left-0 top-0 z-[91] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream"
        animate={{ scale: hovering ? 2.6 : 1, opacity: hovering ? 0.9 : 0.65 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  )
}
