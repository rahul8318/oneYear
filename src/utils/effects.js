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
    heart.innerHTML = '❤️'
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
