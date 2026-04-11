"use client"

import { useEffect, useState } from "react"

interface SpeedData {
  label: string
  speed: number
  color: string
  description: string
}

const speeds: SpeedData[] = [
  { label: "GSM (2G)", speed: 9.6, color: "bg-gray-500", description: "Solo voz y SMS básico" },
  { label: "GPRS (2.5G)", speed: 115, color: "bg-blue-500", description: "Email y WAP básico" },
  { label: "EDGE", speed: 384, color: "bg-emerald-500", description: "Navegación web lenta" },
  { label: "WCDMA (vehicular)", speed: 384, color: "bg-orange-500", description: "Internet en movimiento" },
  { label: "WCDMA (estático)", speed: 2048, color: "bg-purple-500", description: "Videollamadas, streaming" },
]

const services = [
  {
    id: "voice",
    icon: "🎤",
    tag: "Voz",
    tagColor: "bg-primary/20 text-primary",
    title: "AMR Codec",
    description: "Voz de alta calidad con Adaptive Multi-Rate. Mejor calidad que 2G con menor bitrate.",
    specs: [
      { key: "Bitrate", value: "4.75–12.2 kbps" },
      { key: "Mejora", value: "Adaptación al canal" },
      { key: "Novedad 3G", value: "Videollamada (64 kbps)" },
    ],
  },
  {
    id: "data",
    icon: "🌐",
    tag: "Datos",
    tagColor: "bg-green-500/20 text-green-400",
    title: "Internet Móvil Real",
    description: "Primer acceso real a páginas web completas, email con adjuntos, descarga de apps.",
    specs: [
      { key: "Navegación web", value: "Viable por primera vez" },
      { key: "Email", value: "Con adjuntos" },
      { key: "GPS asistido", value: "A-GPS introducido" },
    ],
  },
  {
    id: "impact",
    icon: "📱",
    tag: "Impacto social",
    tagColor: "bg-orange-500/20 text-orange-400",
    title: "Transformación digital",
    description: "3G fue el catalizador del ecosistema de apps móviles y el smartphone moderno.",
    specs: [
      { key: "iPhone (2007)", value: "Necesitó 3G" },
      { key: "App Store", value: "Habilitada por 3G" },
      { key: "LATAM", value: "Primera banda ancha para millones" },
    ],
  },
]

export function ServicesSection() {
  const [animatedSpeeds, setAnimatedSpeeds] = useState<number[]>(speeds.map(() => 0))
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const maxSpeed = 2048

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedSpeeds(speeds.map((s) => s.speed))
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Servicios y Velocidades 3G</h2>
        <p className="mt-2 text-muted-foreground">
          3G transformó el teléfono móvil de dispositivo de voz a computadora de bolsillo.
        </p>
      </div>

      {/* Speed Comparison Chart */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Comparativa de Velocidades (kbps)</h3>
        
        <div className="space-y-4">
          {speeds.map((item, index) => (
            <div key={item.label} className="group">
              <div className="mb-1 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.label}</span>
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    — {item.description}
                  </span>
                </div>
                <span className="font-mono font-semibold">{item.speed} kbps</span>
              </div>
              <div className="relative h-8 overflow-hidden rounded-lg bg-secondary">
                <div
                  className={`absolute inset-y-0 left-0 flex items-center rounded-lg ${item.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${(animatedSpeeds[index] / maxSpeed) * 100}%` }}
                >
                  <span className="px-3 text-xs font-semibold text-white">
                    {item.speed >= 100 ? `${item.speed}k` : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>3G alcanza velocidades <strong className="text-foreground">200x superiores</strong> a 2G en condiciones óptimas</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
            className={`group cursor-pointer rounded-xl border bg-card p-5 transition-all hover:border-primary/50 ${
              expandedService === service.id ? "border-primary ring-1 ring-primary/20" : "border-border"
            }`}
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="text-3xl">{service.icon}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${service.tagColor}`}>
                {service.tag}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>

            {/* Expanded details */}
            <div
              className={`grid transition-all duration-300 ${
                expandedService === service.id ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-2 border-t border-border pt-4">
                  {service.specs.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{spec.key}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expand indicator */}
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <svg
                className={`h-4 w-4 transition-transform ${expandedService === service.id ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {expandedService === service.id ? "Menos" : "Ver más"}
            </div>
          </div>
        ))}
      </div>

      {/* Historical devices */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Dispositivos icónicos de la era 3G</h3>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Nokia 6630", year: "2004", feature: "Primer smartphone 3G masivo" },
            { name: "iPhone 3G", year: "2008", feature: "Revolucionó la experiencia móvil" },
            { name: "BlackBerry Bold", year: "2008", feature: "Email corporativo 3G" },
            { name: "HTC Dream", year: "2008", feature: "Primer Android con 3G" },
          ].map((device) => (
            <div key={device.name} className="rounded-lg bg-secondary/50 p-4 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="1.5" />
                  <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h4 className="font-semibold">{device.name}</h4>
              <p className="text-xs text-muted-foreground">{device.year}</p>
              <p className="mt-2 text-xs text-muted-foreground">{device.feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact statement */}
      <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-green-400">Impacto en Colombia y LATAM</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Sin 3G no existiría el iPhone original, App Store, Google Maps móvil, ni redes sociales desde el celular. 
              En Colombia y Latinoamérica, <strong className="text-foreground">3G fue la primera banda ancha de millones de personas</strong> que nunca tuvieron acceso a ADSL.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
