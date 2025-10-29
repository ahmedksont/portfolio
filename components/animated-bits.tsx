"use client"

import { useEffect, useRef } from "react"

interface Bit {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
  isSquare: boolean
}

export function AnimatedBits() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bitsRef = useRef<Bit[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Generate random bits
    const generateBits = () => {
      const bits: Bit[] = []
      const bitCount = 80

      for (let i = 0; i < bitCount; i++) {
        bits.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() > 0.7 ? Math.random() * 20 + 10 : Math.random() * 8 + 2,
          opacity: Math.random() * 0.6 + 0.2,
          duration: Math.random() * 8 + 6,
          delay: Math.random() * 2,
          isSquare: Math.random() > 0.4,
        })
      }
      return bits
    }

    bitsRef.current = generateBits()

    // Create SVG with animated bits
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    svg.setAttribute("viewBox", "0 0 100 100")
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice")
    svg.style.position = "absolute"
    svg.style.top = "0"
    svg.style.left = "0"
    svg.style.pointerEvents = "none"

    // Add defs for animations
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
    const style = document.createElementNS("http://www.w3.org/2000/svg", "style")
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); opacity: var(--start-opacity); }
        50% { transform: translateY(-20px) translateX(10px); opacity: var(--mid-opacity); }
      }
      @keyframes pulse {
        0%, 100% { opacity: var(--start-opacity); }
        50% { opacity: var(--end-opacity); }
      }
      .bit {
        animation: float var(--duration)s ease-in-out var(--delay)s infinite, 
                   pulse calc(var(--duration)s * 1.5) ease-in-out var(--delay)s infinite;
      }
    `
    defs.appendChild(style)
    svg.appendChild(defs)

    // Add bits to SVG
    bitsRef.current.forEach((bit) => {
      if (bit.isSquare) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute("x", String(bit.x))
        rect.setAttribute("y", String(bit.y))
        rect.setAttribute("width", String(bit.size))
        rect.setAttribute("height", String(bit.size))
        rect.setAttribute("fill", "#3b82f6")
        rect.setAttribute("class", "bit")
        rect.style.setProperty("--duration", `${bit.duration}s`)
        rect.style.setProperty("--delay", `${bit.delay}s`)
        rect.style.setProperty("--start-opacity", String(bit.opacity))
        rect.style.setProperty("--mid-opacity", String(Math.min(bit.opacity + 0.3, 1)))
        rect.style.setProperty("--end-opacity", String(Math.max(bit.opacity - 0.2, 0.1)))
        svg.appendChild(rect)
      } else {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("cx", String(bit.x))
        circle.setAttribute("cy", String(bit.y))
        circle.setAttribute("r", String(bit.size / 2))
        circle.setAttribute("fill", "#60a5fa")
        circle.setAttribute("class", "bit")
        circle.style.setProperty("--duration", `${bit.duration}s`)
        circle.style.setProperty("--delay", `${bit.delay}s`)
        circle.style.setProperty("--start-opacity", String(bit.opacity))
        circle.style.setProperty("--mid-opacity", String(Math.min(bit.opacity + 0.3, 1)))
        circle.style.setProperty("--end-opacity", String(Math.max(bit.opacity - 0.2, 0.1)))
        svg.appendChild(circle)
      }
    })

    containerRef.current.appendChild(svg)

    return () => {
      if (containerRef.current && svg.parentNode === containerRef.current) {
        containerRef.current.removeChild(svg)
      }
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} />
}
