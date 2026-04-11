"use client"

import { useState } from "react"

interface InfoCard {
  id: string
  tag: string
  tagColor: string
  title: string
  description: string
  details: { key: string; value: string }[]
}

const cards: InfoCard[] = [
  {
    id: "speeds",
    tag: "Requisitos ITU",
    tagColor: "bg-primary/20 text-primary",
    title: "Velocidades mínimas",
    description: "Los umbrales de velocidad que toda tecnología 3G debía superar según IMT-2000.",
    details: [
      { key: "Estático / peatonal", value: "2 Mbps" },
      { key: "Vehicular (<120 km/h)", value: "384 kbps" },
      { key: "Alta velocidad (tren)", value: "144 kbps" },
      { key: "Cobertura global", value: "Satélite incluido" },
    ],
  },
  {
    id: "standards",
    tag: "Familia de estándares",
    tagColor: "bg-purple-500/20 text-purple-400",
    title: "Tecnologías aprobadas",
    description: "IMT-2000 aceptó múltiples tecnologías bajo su paraguas normativo.",
    details: [
      { key: "WCDMA/UMTS", value: "Europa/Japón" },
      { key: "CDMA2000", value: "América del Norte" },
      { key: "TD-SCDMA", value: "China" },
      { key: "EDGE (UWC-136)", value: "TDMA legacy" },
      { key: "DECT", value: "Europa (local)" },
    ],
  },
  {
    id: "spectrum",
    tag: "Bandas de frecuencia",
    tagColor: "bg-green-500/20 text-green-400",
    title: "Espectro asignado",
    description: "La CMR-2000 asignó bandas específicas para despliegue global de IMT-2000.",
    details: [
      { key: "Banda principal", value: "2100 MHz (FDD)" },
      { key: "Uplink", value: "1920–1980 MHz" },
      { key: "Downlink", value: "2110–2170 MHz" },
      { key: "TDD (TD-SCDMA)", value: "1900/2000 MHz" },
    ],
  },
  {
    id: "switching",
    tag: "Conmutación",
    tagColor: "bg-orange-500/20 text-orange-400",
    title: "Circuitos vs. Paquetes",
    description: "3G introdujo la dualidad: voz por circuitos, datos por paquetes sobre la misma infraestructura.",
    details: [
      { key: "Voz", value: "Circuit Switched (CS)" },
      { key: "Datos/internet", value: "Packet Switched (PS)" },
      { key: "Plano de control", value: "RRC / NAS" },
      { key: "Innovación clave", value: "Dominios paralelos" },
    ],
  },
]

export function IMT2000Section() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Estándar Global
        </div>
        <h2 className="text-2xl font-bold">IMT-2000 — El Marco Global</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          IMT-2000 (International Mobile Telecommunications-2000) fue el estándar paraguas definido por la ITU para unificar las redes 3G globalmente. 
          No es una tecnología en sí, sino un conjunto de requisitos que deben cumplir las tecnologías 3G.
        </p>
      </div>

      {/* World map illustration */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 800 400" className="h-full w-full" fill="currentColor">
            {/* Simplified world continents */}
            <ellipse cx="400" cy="200" rx="380" ry="180" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <ellipse cx="400" cy="200" rx="280" ry="130" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <ellipse cx="400" cy="200" rx="180" ry="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>
        </div>
        
        <div className="relative grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
              <span className="text-2xl">🇪🇺</span>
            </div>
            <h4 className="font-semibold text-blue-400">Europa & Japón</h4>
            <p className="mt-1 text-sm text-muted-foreground">WCDMA/UMTS</p>
            <p className="mt-1 text-xs text-muted-foreground/70">Banda 2100 MHz</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/20">
              <span className="text-2xl">🇺🇸</span>
            </div>
            <h4 className="font-semibold text-orange-400">América del Norte</h4>
            <p className="mt-1 text-sm text-muted-foreground">CDMA2000</p>
            <p className="mt-1 text-xs text-muted-foreground/70">Banda 850/1900 MHz</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
              <span className="text-2xl">🇨🇳</span>
            </div>
            <h4 className="font-semibold text-red-400">China</h4>
            <p className="mt-1 text-sm text-muted-foreground">TD-SCDMA</p>
            <p className="mt-1 text-xs text-muted-foreground/70">TDD 1900/2000 MHz</p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
            className={`group cursor-pointer rounded-xl border bg-card p-5 transition-all hover:border-primary/50 ${
              expandedCard === card.id ? "border-primary ring-1 ring-primary/20" : "border-border"
            }`}
          >
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${card.tagColor}`}>
              {card.tag}
            </span>
            <h3 className="mt-3 text-lg font-semibold group-hover:text-primary transition-colors">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>

            {/* Expanded details */}
            <div
              className={`grid transition-all duration-300 ${
                expandedCard === card.id ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-2 border-t border-border pt-4">
                  {card.details.map((detail, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{detail.key}</span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expand indicator */}
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <svg
                className={`h-4 w-4 transition-transform ${expandedCard === card.id ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {expandedCard === card.id ? "Menos detalles" : "Ver detalles"}
            </div>
          </div>
        ))}
      </div>

      {/* Key insight */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold">Dato clave</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              En 2G toda la red era de conmutación de circuitos. 3G introdujo un <strong className="text-foreground">dominio de paquetes (PS)</strong> paralelo al dominio de circuitos (CS), 
              permitiendo que la voz y los datos coexistan sobre la misma infraestructura radio sin interferir entre sí.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
