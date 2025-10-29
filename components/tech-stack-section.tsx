"use client"

import { useInView } from "@/hooks/use-in-view"

export function TechStackSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const techCategories = [
    {
      title: "Frontend & UI",
      techs: ["Next.js", "React TS", "Flutter", "TypeScript", "TailwindCSS", "MUI"],
    },
    {
      title: "Backend & Databases",
      techs: ["Spring Boot", "Fastify", "Flask", "Supabase", "PostgreSQL", "MongoDB"],
    },
    {
      title: "AI & Data Science",
      techs: ["Python", "scikit-learn", "OpenAI", "LLaMA", "GROQ"],
    },
    {
      title: "Cloud & DevOps",
      techs: ["Docker", "Google Cloud", "Figma", "Cypress", "Yarn"],
    },
  ]

  return (
    <section ref={ref} className="py-20 px-4 md:px-8 bg-background relative">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold glow-text mb-12 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          Tech Stack
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {techCategories.map((category, idx) => (
            <div
              key={idx}
              className={`space-y-4 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold text-primary">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.techs.map((tech, techIdx) => (
                  <div
                    key={techIdx}
                    className="px-4 py-2 bg-card border border-primary rounded-full text-primary font-semibold text-sm hover-glow cursor-pointer transition-all hover:scale-110 hover:rotate-2"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
