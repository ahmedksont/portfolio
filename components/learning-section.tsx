"use client"

import { useInView } from "@/hooks/use-in-view"
import { useEffect, useState } from "react"
import { GitHubInsights } from "./github-insights"

export function LearningSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [widths, setWidths] = useState<number[]>([0, 0, 0, 0])

  const skills = [
    { name: "Web Development", progress: 85 },
    { name: "Advanced AI Integration", progress: 80 },
    { name: "Cloud Architecture", progress: 75 },
    { name: "Competitive Programming", progress: 90 },
  ]

  useEffect(() => {
    if (inView) {
      const timers = skills.map((skill, idx) =>
        setTimeout(() => {
          setWidths((prev) => {
            const newWidths = [...prev]
            newWidths[idx] = skill.progress
            return newWidths
          })
        }, idx * 100),
      )
      return () => timers.forEach((timer) => clearTimeout(timer))
    }
  }, [inView])

  return (
    <section ref={ref} className="py-20 px-4 md:px-8 bg-background relative">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold glow-text mb-12 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          Currently Learning & GitHub Insights
        </h2>

        {/* Skills Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">Skills & Expertise</h3>
          <div className="max-w-2xl mx-auto space-y-8">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-primary">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{widths[idx]}%</span>
                </div>
                <div className="w-full h-3 bg-card border border-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary glow-text transition-all duration-1000 ease-out"
                    style={{ width: `${widths[idx]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Insights Section */}
        <div>
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">GitHub Activity</h3>
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            <GitHubInsights />
          </div>
        </div>
      </div>
    </section>
  )
}
