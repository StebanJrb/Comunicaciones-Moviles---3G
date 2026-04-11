"use client"

import { useState } from "react"

interface NetworkNode {
  id: string
  name: string
  description: string
  x: number
  y: number
  color: string
  icon: React.ReactNode
}

const networkNodes: NetworkNode[] = [
  {
    id: "ue",
    name: "UE — Dispositivo Móvil",
    description: "El equipo del usuario incluye el teléfono y la USIM. Usa WCDMA FDD a 2100 MHz con 5 MHz de ancho de banda. Soporta soft handover: puede conectarse a múltiples NodeB simultáneamente.",
    x: 10,
    y: 60,
    color: "from-cyan-400 to-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <rect x="6" y="2" width="12" height="20" rx="2" fill="currentColor" opacity="0.3" />
        <rect x="7" y="4" width="10" height="14" rx="1" fill="currentColor" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "nodeb",
    name: "NodeB — Estación Base",
    description: "Equivalente al BTS de GSM pero para WCDMA. Maneja la capa física: modulación WCDMA, control de potencia interno (1500 veces/s), mediciones de calidad (RSSI, Ec/N0). Interfaz Iub hacia RNC.",
    x: 35,
    y: 40,
    color: "from-orange-400 to-amber-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
        <path d="M12 2L8 6v12l4 4 4-4V6l-4-4z" fill="currentColor" opacity="0.3" />
        <path d="M12 6v12M8 10h8M8 14h8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="4" r="2" fill="currentColor" />
        <path d="M6 8l-2 2M18 8l2 2M6 16l-2-2M18 16l2-2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "rnc",
    name: "RNC — Radio Network Controller",
    description: "El cerebro del UTRAN. Controla uno o más NodeB. Maneja handover suave (soft handover), asignación de códigos OVSF, cifrado RRC, y control de admisión. Interfaz Iu hacia el Core.",
    x: 55,
    y: 50,
    color: "from-emerald-400 to-green-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor">
        <rect x="4" y="6" width="16" height="12" rx="2" fill="currentColor" opacity="0.3" />
        <rect x="6" y="8" width="4" height="3" rx="0.5" fill="currentColor" />
        <rect x="11" y="8" width="4" height="3" rx="0.5" fill="currentColor" />
        <rect x="6" y="13" width="4" height="3" rx="0.5" fill="currentColor" />
        <rect x="11" y="13" width="4" height="3" rx="0.5" fill="currentColor" />
        <circle cx="18" cy="10" r="1" fill="currentColor" />
        <circle cx="18" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "core",
    name: "Core Network (MSC + SGSN/GGSN)",
    description: "Dos dominios: CS (Circuit Switched) para voz con MSC/VLR, y PS (Packet Switched) para datos con SGSN y GGSN. El GGSN asigna IPs y conecta a internet. Separar voz y datos fue la innovación clave de 3G.",
    x: 78,
    y: 45,
    color: "from-purple-400 to-violet-500",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
        <rect x="2" y="4" width="8" height="7" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="14" y="4" width="8" height="7" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="8" y="13" width="8" height="7" rx="1" fill="currentColor" opacity="0.4" />
        <path d="M6 11v2l6 4M18 11v2l-6 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="6" y="9" fontSize="4" fill="currentColor" textAnchor="middle">CS</text>
        <text x="18" y="9" fontSize="4" fill="currentColor" textAnchor="middle">PS</text>
      </svg>
    ),
  },
]

export function HeroSection() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const selectedNode = networkNodes.find((n) => n.id === activeNode)

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
          Tecnología 3G — IMT-2000
        </div>
        <h1 className="bg-gradient-to-r from-cyan-400 via-primary to-purple-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
          Evolución de las Redes Móviles 3G
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Explora la arquitectura UMTS/WCDMA de forma interactiva. Haz clic en cada elemento para descubrir su función en la red.
        </p>
      </div>

      {/* Interactive Network Visualization */}
      <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background via-card to-background">
        {/* Grid background */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* UE to NodeB */}
          <path
            d="M 15 62 Q 25 50 35 45"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="0.5"
            strokeDasharray="2 1"
            className="animate-data-flow"
          />
          {/* NodeB to RNC */}
          <path
            d="M 42 42 Q 48 45 55 48"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="0.5"
            strokeDasharray="2 1"
            className="animate-data-flow"
            style={{ animationDelay: "0.5s" }}
          />
          {/* RNC to Core */}
          <path
            d="M 62 50 Q 70 48 78 46"
            fill="none"
            stroke="url(#gradient3)"
            strokeWidth="0.5"
            strokeDasharray="2 1"
            className="animate-data-flow"
            style={{ animationDelay: "1s" }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Signal waves from NodeB */}
        <div className="absolute" style={{ left: "35%", top: "35%" }}>
          <div className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/30 animate-signal-wave" />
          <div className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/20 animate-signal-wave" style={{ animationDelay: "0.5s" }} />
          <div className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/10 animate-signal-wave" style={{ animationDelay: "1s" }} />
        </div>

        {/* Buildings silhouette */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 400 60" className="h-20 w-full text-border/20" preserveAspectRatio="none">
            <path
              d="M0 60 L0 45 L20 45 L20 30 L40 30 L40 45 L60 45 L60 25 L80 25 L80 45 L100 45 L100 35 L120 35 L120 45 L140 45 L140 20 L160 20 L160 45 L180 45 L180 40 L200 40 L200 45 L220 45 L220 15 L240 15 L240 45 L260 45 L260 30 L280 30 L280 45 L300 45 L300 25 L320 25 L320 45 L340 45 L340 35 L360 35 L360 45 L380 45 L380 40 L400 40 L400 60 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Network nodes */}
        {networkNodes.map((node) => (
          <button
            key={node.id}
            onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              activeNode === node.id ? "scale-125 z-20" : "hover:scale-110 z-10"
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div
              className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${node.color} text-white shadow-lg ${
                activeNode === node.id ? "ring-4 ring-white/50" : ""
              }`}
            >
              {node.icon}
              {activeNode === node.id && (
                <div className="absolute -inset-2 animate-ping rounded-2xl bg-white/20" />
              )}
            </div>
            <div className="mt-2 text-center">
              <span className="rounded-full bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
                {node.id.toUpperCase()}
              </span>
            </div>
          </button>
        ))}

        {/* Interface labels */}
        <div className="absolute text-[10px] font-mono text-cyan-400/70" style={{ left: "22%", top: "50%" }}>Uu</div>
        <div className="absolute text-[10px] font-mono text-orange-400/70" style={{ left: "47%", top: "40%" }}>Iub</div>
        <div className="absolute text-[10px] font-mono text-green-400/70" style={{ left: "68%", top: "44%" }}>Iu</div>
      </div>

      {/* Selected Node Info */}
      {selectedNode && (
        <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className={`rounded-xl bg-gradient-to-r ${selectedNode.color} p-[1px]`}>
            <div className="rounded-xl bg-card p-6">
              <h3 className="mb-3 text-xl font-semibold">{selectedNode.name}</h3>
              <p className="leading-relaxed text-muted-foreground">{selectedNode.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        {[
          { color: "bg-cyan-400", label: "UE (Dispositivo)" },
          { color: "bg-orange-400", label: "NodeB (Antena)" },
          { color: "bg-emerald-400", label: "RNC (Controlador)" },
          { color: "bg-purple-400", label: "Core Network" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className={`h-3 w-3 rounded-full ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Key insight */}
      <div className="mx-auto max-w-3xl rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Flujo de datos 3G:</span> Los paquetes viajan desde el dispositivo (UE) → NodeB → RNC → Core Network → Internet. 
          La arquitectura UMTS separa el plano de voz (CS) del de datos (PS), permitiendo internet móvil real por primera vez.
        </p>
      </div>
    </div>
  )
}
