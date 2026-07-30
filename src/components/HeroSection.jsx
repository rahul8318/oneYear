import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaStar } from 'react-icons/fa'
import { FaMusic } from 'react-icons/fa'

export default function HeroSection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    const hearts = []
    const stars = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 40; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 5,
        speedY: Math.random() * 1 + 0.5,
        speedX: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }

    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        twinkle: Math.random() * Math.PI * 2,
      })
    }

    const drawHeart = (x, y, size, opacity) => {
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.fillStyle = '#f472b6'
      ctx.beginPath()
      const topCurveHeight = size * 0.3
      ctx.moveTo(x, y + topCurveHeight)
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight)
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size)
      ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight)
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight)
      ctx.fill()
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        star.twinkle += 0.05
        const alpha = 0.3 + Math.sin(star.twinkle) * 0.3
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      hearts.forEach(heart => {
        heart.y -= heart.speedY
        heart.x += heart.speedX * 0.5
        if (heart.y < -20) {
          heart.y = canvas.height + 20
          heart.x = Math.random() * canvas.width
        }
        drawHeart(heart.x, heart.y, heart.size, heart.opacity)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollToContent = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-purple-900/30 to-indigo-900/30" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-pink-300 text-lg md:text-xl mb-4 font-light tracking-wider">
            To My Long Distance Best Friend
          </p>

          <motion.h1
            className="font-dancing text-6xl md:text-8xl lg:text-9xl mb-6 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            Muskan
            <motion.span
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block ml-2"
            >
              ❤️
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            "Distance may separate us, but our friendship keeps us close every single day."
          </motion.p>

          <motion.button
            onClick={scrollToContent}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-lg overflow-hidden shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Open the Surprise <FaHeart className="group-hover:animate-pulse" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-pink-300/50 text-2xl"
        >
          <FaMusic />
        </motion.div>
      </div>
    </section>
  )
}
