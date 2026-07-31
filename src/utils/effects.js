export function triggerConfetti(x, y) {
  const colors = ['#f472b6', '#e879f9', '#a78bfa', '#60a5fa', '#34d399', '#fbbf24']
  const particleCount = 30

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      pointer-events: none;
      z-index: 9999;
      transition: all 1s ease-out;
    `
    document.body.appendChild(particle)

    const angle = Math.random() * Math.PI * 2
    const velocity = Math.random() * 200 + 100
    const tx = Math.cos(angle) * velocity
    const ty = Math.sin(angle) * velocity - 200

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 720}deg)`
      particle.style.opacity = '0'
    })

    setTimeout(() => particle.remove(), 1000)
  }
}

export function triggerHearts(x, y) {
  const heartCount = 15

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div')
    heart.innerHTML = 'â¤ï¸'
    heart.style.cssText = `
      position: fixed;
      left: ${x + (Math.random() - 0.5) * 100}px;
      top: ${y}px;
      font-size: ${Math.random() * 20 + 15}px;
      pointer-events: none;
      z-index: 9999;
      transition: all 1.5s ease-out;
    `
    document.body.appendChild(heart)

    requestAnimationFrame(() => {
      heart.style.transform = `translateY(-${Math.random() * 200 + 100}px) translateX(${(Math.random() - 0.5) * 200}px)`
      heart.style.opacity = '0'
    })

    setTimeout(() => heart.remove(), 1500)
  }
}

export function triggerSkyFirecracker(x, y) {
  const colors = ['#f472b6', '#e879f9', '#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f8b5b2', '#fecaca']

  playSoftPopSound()

  const heartSize = 300
  const totalHearts = 80

  for (let i = 0; i < totalHearts; i++) {
    const heart = document.createElement('div')
    heart.innerHTML = 'â¤ï¸'
    const size = Math.random() * 18 + 10
    heart.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: ${size}px;
      pointer-events: none;
      z-index: 9999;
      transition: all 1.8s cubic-bezier(0.25, 0.8, 0.25, 1);
    `
    heart.style.color = colors[Math.floor(Math.random() * colors.length)]
    document.body.appendChild(heart)

    const { tx, ty } = getRandomHeartPosition(heartSize)

    requestAnimationFrame(() => {
      heart.style.transform = `translate(${tx}px, ${ty}px) scale(1.5)`
      heart.style.opacity = '0'
    })

    setTimeout(() => heart.remove(), 2000)
  }
}

function getRandomHeartPosition(size) {
  let px, py
  let attempts = 0
  do {
    px = (Math.random() - 0.5) * size
    py = (Math.random() - 0.5) * size * 1.2
    attempts++
  } while (!isInsideHeart(px, py, size / 3) && attempts < 100)

  return { tx: px, ty: -py }
}

function isInsideHeart(px, py, a) {
  const x = px / a
  const y = py / a

  const y2 = y * y
  const x2 = x * x

  return (x2 + y2 - 1) * (x2 + y2 - 1) * (x2 + y2 - 1) - x2 * y2 * y2 <= 0
}

function playSoftPopSound() {
  if (!window.AudioContext && !window.webkitAudioContext) return

  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(200, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3)

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.5)
  } catch (e) {
    console.log('Audio context not available')
  }
}
