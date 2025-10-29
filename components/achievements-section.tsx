"use client"

import { useInView } from "@/hooks/use-in-view"

export function AchievementsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const achievements = [
    {
      competition: "IEEExtreme 19.0",
      rank: "2nd 🇹🇳",
      year: "2025",
      desc: "Solved advanced algorithmic problems under 24h pressure",
    },
    {
      competition: "Code of Duty",
      rank: "2nd",
      year: "2024",
      desc: "Competitive coding challenge, focused on data structures & algorithms",
    },
    {
      competition: "AI Wave Hackathon 2.0",
      rank: "Finalist",
      year: "2024",
      desc: "Built ML-based mental health monitoring platform",
    },
    {
      competition: "GDG Sousse",
      rank: "Organizer",
      year: "Present",
      desc: "Leading workshops, hackathons, and tech initiatives",
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 md:px-8 bg-card/30 relative">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold glow-text mb-12 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          Achievements & Leadership
        </h2>

        <div className="space-y-4">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className={`p-6 bg-background border border-border rounded-lg glow-border hover-glow cursor-pointer transition-all duration-700 hover:scale-102 hover:translate-x-2 ${
                inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
              }`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Competition</p>
                  <p className="text-lg font-bold text-primary">{achievement.competition}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rank</p>
                  <p className="text-lg font-bold text-secondary">{achievement.rank}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="text-lg font-bold text-accent">{achievement.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-muted-foreground">{achievement.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
