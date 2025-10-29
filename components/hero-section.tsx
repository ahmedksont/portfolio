"use client"

import { TypingText } from "./typing-text"
import { DigitalRain } from "./digital-rain"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <DigitalRain />

      <div className="relative z-10 text-center px-4 md:px-8 animate-fade-in-scale">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold glow-text mb-4">
            <TypingText text="Hello there! I'm Ahmed Ksontini" speed={40} />
          </h1>
        </div>

        <div className="mb-8">
          <p className="text-xl md:text-2xl text-secondary animate-glow-pulse">
            CyberSecurity Enthusiast | AI Developer | Full-Stack Innovator | GDG Sousse Organizer
          </p>
        </div>

        <div className="mb-12">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Crafting intelligent, secure, and human-centered digital experiences that bridge AI, web technologies, and
            real-world impact.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold glow-border hover:shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold glow-border hover:bg-primary/10 transition-all hover:scale-105 active:scale-95"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
