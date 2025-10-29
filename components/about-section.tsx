"use client"

import { useInView } from "@/hooks/use-in-view"

export function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 px-4 md:px-8 bg-background relative">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold glow-text mb-12 text-center animate-slide-up">About Me</h2>

          <div className="mb-12 text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-lg md:text-xl text-muted-foreground italic mb-6 max-w-3xl mx-auto">
              "Passionate about crafting intelligent, secure, and human-centered digital experiences that bridge AI, web
              technologies, and real-world impact."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Currently Building", desc: "Smart Exam — AI-powered exam generation platform" },
              { title: "Exploring", desc: "AI for mental health and emotional well-being" },
              { title: "Focus", desc: "Scalable systems • Modern UI/UX • AI Integration" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-card border border-border rounded-lg glow-border hover-glow animate-bounce-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <p className="text-muted-foreground mb-2">Location: Tunisia 🇹🇳</p>
            <p className="text-muted-foreground">Community: Organizer at GDG Sousse | Tech event mentor & speaker</p>
          </div>
        </div>
      </div>
    </section>
  )
}
