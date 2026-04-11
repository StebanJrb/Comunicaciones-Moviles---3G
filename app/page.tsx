"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { TimelineSection } from "@/components/timeline-section"
import { IMT2000Section } from "@/components/imt2000-section"
import { UMTSSection } from "@/components/umts-section"
import { EDGESection } from "@/components/edge-section"
import { ServicesSection } from "@/components/services-section"
import { QuizSection } from "@/components/quiz-section"

const sections = [
  { id: "hero", label: "Inicio", icon: "📡" },
  { id: "timeline", label: "Evolución", icon: "📈" },
  { id: "imt", label: "IMT-2000", icon: "🌐" },
  { id: "umts", label: "WCDMA/UMTS", icon: "📶" },
  { id: "edge", label: "EDGE", icon: "⚡" },
  { id: "services", label: "Servicios", icon: "📱" },
  { id: "quiz", label: "Quiz", icon: "🎯" },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {activeSection === "hero" && <HeroSection />}
        {activeSection === "timeline" && <TimelineSection />}
        {activeSection === "imt" && <IMT2000Section />}
        {activeSection === "umts" && <UMTSSection />}
        {activeSection === "edge" && <EDGESection />}
        {activeSection === "services" && <ServicesSection />}
        {activeSection === "quiz" && <QuizSection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Julian Steban Ruiz Benavides</span> — Comunicaciones Móviles
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Universidad Piloto de Colombia — Ingeniería de Telecomunicaciones
          </p>
        </div>
      </footer>
    </div>
  )
}
