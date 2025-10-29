"use client"

import { useInView } from "@/hooks/use-in-view"
import { useState } from "react"

export function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const projects = [
    {
      title: "Smart Exam",
      desc: "AI-Powered Exam Generation Platform",
      details: "Upload text or documents → Customize difficulty & duration → Auto-generate questions",
      tech: ["React TS", "Fastify", "PostgreSQL", "OpenAI API", "Docker"],
      features: ["Multilingual exams", "Analytics", "Prompt review", "Exportable content"],
    },
    {
      title: "Hammamet Adventures",
      desc: "Tourism Experience & Adventure Booking Platform",
      details: "Explore activities • Pay securely via Konnect • Manage tours easily",
      tech: ["Next.js", "Supabase", "Spring Boot", "Konnect API", "Google Cloud"],
      features: ["Activity booking", "Secure payments", "Tour management"],
    },
    {
      title: "Restaurant Management",
      desc: "Digital Experience for Restaurants",
      details: "Online orders, reservations, and menu control with secure backend APIs",
      tech: ["React", "Fastify", "PostgreSQL", "Docker"],
      features: ["Online orders", "Reservations", "Menu control", "Live updates"],
    },
    {
      title: "Pool Company System",
      desc: "Smart Business Management",
      details: "Real-time scheduling, notifications, and payment processing",
      tech: ["Spring Boot", "React", "PostgreSQL", "Konnect"],
      features: ["Real-time scheduling", "Notifications", "Payments"],
    },
    {
      title: "AI Mental Health",
      desc: "Machine Learning for Emotional Well-being",
      details: "Predicts mental health patterns based on workplace surveys",
      tech: ["Flask", "scikit-learn", "Pandas", "Matplotlib"],
      features: ["Pattern prediction", "Data analysis", "Visualizations"],
    },
  ]

  return (
    <section id="projects" ref={ref} className="py-20 px-4 md:px-8 bg-card/30 relative">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold glow-text mb-12 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedProject(selectedProject === idx ? null : idx)}
              className={`p-6 bg-background border border-border rounded-lg glow-border hover-glow cursor-pointer transition-all duration-700 hover:-translate-y-2 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
              <p className="text-secondary font-semibold mb-3">{project.desc}</p>
              <p className="text-muted-foreground text-sm mb-4">{project.details}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 10).map((t, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                    {t}
                  </span>
                ))}
              </div>

              {selectedProject === idx && (
                <div className="mt-4 pt-4 border-t border-border animate-slide-up">
                  <p className="text-sm text-muted-foreground mb-2 font-semibold">Features:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {project.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
