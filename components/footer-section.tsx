"use client"

import { useEffect, useRef } from "react"

export function FooterSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = 300

    const particles: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = []

    const createParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 14, 39, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02

        ctx.fillStyle = `rgba(0, 255, 0, ${p.life * 0.5})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()

        if (p.life <= 0) {
          particles.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.8) {
        createParticle(e.clientX, e.clientY - canvas.getBoundingClientRect().top)
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-auto" />

      <div className="relative z-10 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center animate-fade-in-scale">
          <div className="mb-6">
            <p className="text-2xl font-bold glow-text mb-2">Code Smart, Think Human.</p>
            <p className="text-muted-foreground">
              AI should empower, not replace, human creativity. Every project is designed to enhance learning and
              decision-making.
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>© 2025 Ahmed Ksontini. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
