"use client"

import { useInView } from "@/hooks/use-in-view"

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const contacts = [
    { label: "Email", value: "ksontiniahmed369@gmail.com", href: "mailto:ksontiniahmed369@gmail.com" },
    { label: "LinkedIn", value: "Ahmed Ksontini", href: "https://linkedin.com/in/ahmed-ksontini-b38414254" },
    { label: "GitHub", value: "ahmedksont", href: "https://github.com/ahmedksont" },
    { label: "Portfolio", value: "ahmedksontini.dev", href: "https://ahmedksontini.dev" },
  ]

  return (
    <section id="contact" ref={ref} className="py-20 px-4 md:px-8 bg-card/30 relative">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold glow-text mb-12 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          Let's Collaborate
        </h2>

        <p
          className={`text-center text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          I'm passionate about impactful, real-world tech. Let's build together in AI, CyberSecurity, EdTech, and more.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {contacts.map((contact, idx) => (
            <a
              key={idx}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-6 bg-background border border-border rounded-lg glow-border hover-glow text-center transition-all duration-700 hover:scale-105 active:scale-95 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <p className="text-sm text-muted-foreground mb-2">{contact.label}</p>
              <p className="text-lg font-semibold text-primary hover:text-secondary transition-colors">
                {contact.value}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
