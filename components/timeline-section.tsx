"use client"

import { useState } from "react"

interface Generation {
  id: string
  name: string
  year: string
  subtitle: string
  color: string
  bgColor: string
  description: string
  features: string[]
  speed: string
}

const generations: Generation[] = [
  {
    id: "1g",
    name: "1G",
    year: "1980s",
    subtitle: "Analógico",
    color: "text-gray-400",
    bgColor: "bg-gray-800",
    description: "La primera generación fue completamente analógica. Solo voz, sin cifrado, y cualquiera con un escáner podía interceptar llamadas.",
    features: [
      "Solo voz analógica",
      "Sin cifrado de señal",
      "Celdas grandes (~30 km)",
      "Sin itinerancia internacional",
      "Estándares: AMPS, NMT, ETACS",
    ],
    speed: "N/A",
  },
  {
    id: "2g",
    name: "2G",
    year: "1991",
    subtitle: "Digital/GSM",
    color: "text-blue-400",
    bgColor: "bg-blue-900/50",
    description: "La revolución digital. Introdujo codecs de voz digital, SMS, y cifrado básico. Dos familias dominantes: TDMA (GSM) y CDMA (IS-95).",
    features: [
      "Voz digital con codecs",
      "SMS introducido",
      "Cifrado básico A5/1",
      "Interoperabilidad GSM global",
      "Estándares: GSM, IS-95",
    ],
    speed: "9.6 kbps",
  },
  {
    id: "2.5g",
    name: "2.5G",
    year: "1997",
    subtitle: "Datos básicos",
    color: "text-green-400",
    bgColor: "bg-green-900/50",
    description: "La transición hacia datos. Añadió conmutación de paquetes sobre la infraestructura 2G existente. Email móvil y WAP se vuelven usables.",
    features: [
      "Conmutación de paquetes",
      "GPRS: hasta 115 kbps",
      "EDGE: hasta 384 kbps",
      "Email móvil viable",
      "Estándares: GPRS, EDGE, IS-95B",
    ],
    speed: "115-384 kbps",
  },
  {
    id: "3g",
    name: "3G",
    year: "2000",
    subtitle: "Banda ancha móvil",
    color: "text-purple-400",
    bgColor: "bg-purple-900/50",
    description: "El salto decisivo: internet móvil real. IMT-2000 de la ITU unificó estándares globalmente. Videollamadas, GPS asistido, streaming básico.",
    features: [
      "Internet móvil real",
      "Videollamadas (64 kbps)",
      "GPS asistido (A-GPS)",
      "Arquitectura CS + PS separados",
      "Estándares: WCDMA/UMTS, CDMA2000",
    ],
    speed: "384 kbps - 2 Mbps",
  },
  {
    id: "4g",
    name: "4G",
    year: "2009",
    subtitle: "Todo IP",
    color: "text-teal-400",
    bgColor: "bg-teal-900/50",
    description: "Arquitectura 100% basada en paquetes IP. Eliminó la conmutación de circuitos. OFDMA reemplazó CDMA como técnica de acceso múltiple.",
    features: [
      "Todo IP (sin circuitos)",
      "OFDMA en lugar de CDMA",
      "Core simplificado (EPC)",
      "VoLTE para voz",
      "Estándares: LTE, LTE-Advanced",
    ],
    speed: "100 Mbps - 1 Gbps",
  },
]

export function TimelineSection() {
  const [activeGen, setActiveGen] = useState<string | null>("3g")
  const selectedGen = generations.find((g) => g.id === activeGen)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Evolución Generacional Móvil</h2>
        <p className="mt-2 text-muted-foreground">
          Haz clic en cada generación para ver los cambios tecnológicos clave.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute left-0 right-0 top-8 h-0.5 bg-gradient-to-r from-gray-600 via-purple-500 to-teal-500" />

        <div className="relative flex justify-between gap-4 overflow-x-auto pb-4">
          {generations.map((gen, index) => (
            <button
              key={gen.id}
              onClick={() => setActiveGen(activeGen === gen.id ? null : gen.id)}
              className={`group relative flex min-w-[120px] flex-col items-center transition-all ${
                activeGen === gen.id ? "scale-110" : "hover:scale-105"
              }`}
            >
              {/* Dot */}
              <div
                className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all ${
                  activeGen === gen.id
                    ? `${gen.bgColor} border-current ${gen.color} ring-4 ring-current/20`
                    : `bg-card border-border group-hover:border-current ${gen.color}`
                }`}
              >
                <span className={`text-lg font-bold ${gen.color}`}>{gen.name}</span>
              </div>

              {/* Label */}
              <div className="mt-3 text-center">
                <div className={`font-semibold ${gen.color}`}>{gen.year}</div>
                <div className="text-xs text-muted-foreground">{gen.subtitle}</div>
              </div>

              {/* Active indicator */}
              {activeGen === gen.id && (
                <div className={`absolute -bottom-2 h-1 w-full rounded-full ${gen.bgColor}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Generation Details */}
      {selectedGen && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className={`rounded-xl border ${selectedGen.bgColor} border-current/20 p-6 ${selectedGen.color}`}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">
                {selectedGen.name} — {selectedGen.subtitle}
              </h3>
              <span className="rounded-full bg-background/50 px-3 py-1 text-sm font-mono">
                {selectedGen.speed}
              </span>
            </div>

            <p className="mb-6 text-muted-foreground">{selectedGen.description}</p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedGen.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg bg-background/30 px-3 py-2 text-sm"
                >
                  <span className={`h-1.5 w-1.5 rounded-full bg-current ${selectedGen.color}`} />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Speed comparison chart */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Comparativa de Velocidades</h3>
        <div className="space-y-4">
          {[
            { label: "2G (GSM)", speed: 9.6, max: 2048, color: "bg-blue-500" },
            { label: "2.5G (GPRS)", speed: 115, max: 2048, color: "bg-green-500" },
            { label: "2.5G (EDGE)", speed: 384, max: 2048, color: "bg-emerald-500" },
            { label: "3G (WCDMA)", speed: 2048, max: 2048, color: "bg-purple-500" },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-mono font-medium">{item.speed} kbps</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                  style={{ width: `${(item.speed / item.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          * 3G alcanza velocidades 200x superiores a 2G en condiciones óptimas
        </p>
      </div>
    </div>
  )
}
