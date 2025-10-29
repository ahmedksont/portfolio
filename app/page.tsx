"use client"

import { AnimatedBits } from "@/components/animated-bits"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { AchievementsSection } from "@/components/achievements-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ProjectsSection } from "@/components/projects-section"
import { LearningSection } from "@/components/learning-section"
import { ContactSection } from "@/components/contact-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <>
      <AnimatedBits />
      <main className="bg-background text-foreground relative z-10">
        <HeroSection />
        <AboutSection />
        <AchievementsSection />
        <TechStackSection />
        <ProjectsSection />
        <LearningSection />
        <ContactSection />
        <FooterSection />
      </main>
    </>
  )
}
