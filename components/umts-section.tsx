"use client"

import { useState } from "react"

interface ArchNode {
  id: string
  label: string
  sublabel: string
  color: string
  description: string
  specs: { key: string; value: string }[]
}

const archNodes: ArchNode[] = [
  {
    id: "ue",
    label: "UE",
    sublabel: "Dispositivo móvil",
    color: "border-cyan-400 bg-cyan-950/50 text-cyan-400",
    description: "El dispositivo móvil del usuario. En UMTS incluye el ME (Mobile Equipment) y la USIM (tarjeta SIM universal). Se comunica con el NodeB usando la interfaz aérea Uu con WCDMA a 5 MHz de ancho de banda.",
    specs: [
      { key: "Interfaz aérea", value: "Uu (WCDMA)" },
      { key: "Duplex", value: "FDD o TDD" },
      { key: "Potencia TX", value: "21–24 dBm" },
      { key: "Chip rate", value: "3.84 Mcps" },
    ],
  },
  {
    id: "nodeb",
    label: "NodeB",
    sublabel: "Estación Base WCDMA",
    color: "border-orange-400 bg-orange-950/50 text-orange-400",
    description: "Equivalente al BTS de GSM pero para WCDMA. Maneja la capa física: modulación/demodulación WCDMA, control de potencia interno (inner loop), mediciones de calidad de señal (RSSI, Ec/N0).",
    specs: [
      { key: "Función", value: "Transceptor radio WCDMA" },
      { key: "Control potencia", value: "Inner loop (1500 Hz)" },
      { key: "Interfaz RNC", value: "Iub (ATM/IP)" },
      { key: "Sectores típico", value: "3 (120° c/u)" },
    ],
  },
  {
    id: "rnc",
    label: "RNC",
    sublabel: "Radio Network Controller",
    color: "border-green-400 bg-green-950/50 text-green-400",
    description: "El cerebro del UTRAN. Controla uno o más NodeB. Maneja handover, control de admisión, control de carga, cifrado y protección de integridad. Es el punto de conexión entre la red radio y el core.",
    specs: [
      { key: "Función", value: "Control de radio + handover" },
      { key: "Interfaz Core", value: "Iu-CS (voz) + Iu-PS (datos)" },
      { key: "Control potencia", value: "Outer loop" },
      { key: "Protocolo radio", value: "RRC" },
    ],
  },
  {
    id: "cs",
    label: "MSC/VLR",
    sublabel: "Core CS (Voz)",
    color: "border-red-400 bg-red-950/50 text-red-400",
    description: "El Mobile Switching Center maneja las llamadas de voz tradicionales (conmutación de circuitos). El VLR almacena información temporal del usuario en esa área. Se conecta al HLR y a la PSTN.",
    specs: [
      { key: "Función", value: "Conmutación de voz" },
      { key: "Protocolo", value: "MAP / ISUP" },
      { key: "BD local", value: "VLR" },
      { key: "Conexión", value: "PSTN / otros MSC" },
    ],
  },
  {
    id: "ps",
    label: "SGSN/GGSN",
    sublabel: "Core PS (Datos)",
    color: "border-purple-400 bg-purple-950/50 text-purple-400",
    description: "SGSN gestiona sesiones de datos, movilidad y seguridad. GGSN es la pasarela hacia internet externo, asigna IPs y aplica políticas de datos.",
    specs: [
      { key: "SGSN función", value: "Movilidad + seguridad" },
      { key: "GGSN función", value: "Gateway hacia Internet" },
      { key: "Protocolo", value: "GTP" },
      { key: "IP asignada", value: "Dinámica desde GGSN" },
    ],
  },
]

export function UMTSSection() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [spreadingStep, setSpreadingStep] = useState(0)

  const dataBits = [1, 0, 1, 1]
  const codeChips = [1, -1, 1, -1, 1, 1, -1, 1]

  const getSpreadResult = () => {
    const result = []
    for (let i = 0; i < 8; i++) {
      const dataBit = dataBits[Math.floor(i / 2)]
      const codeChip = codeChips[i]
      result.push(dataBit === 1 ? codeChip : -codeChip)
    }
    return result
  }

  const animateSpreading = () => {
    setSpreadingStep(0)
    let step = 0
    const interval = setInterval(() => {
      step++
      setSpreadingStep(step)
      if (step >= 8) clearInterval(interval)
    }, 200)
  }

  const node = archNodes.find((n) => n.id === selectedNode)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">WCDMA / UMTS</h2>
        <p className="mt-2 text-muted-foreground">
          La implementación de IMT-2000 más extendida en el mundo. Haz clic en cada nodo para explorar su función.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Arquitectura UMTS</h3>
        
        {/* SVG Architecture */}
        <div className="relative overflow-x-auto">
          <svg viewBox="0 0 800 200" className="min-w-[600px] w-full h-auto">
            {/* Connection lines */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4a9eff" />
              </marker>
            </defs>
            
            {/* UE to NodeB */}
            <line x1="120" y1="100" x2="220" y2="100" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="6 3" />
            <text x="170" y="85" fill="#22d3ee" fontSize="12" textAnchor="middle" fontFamily="monospace">Uu</text>
            
            {/* NodeB to RNC */}
            <line x1="320" y1="100" x2="420" y2="100" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="6 3" />
            <text x="370" y="85" fill="#f97316" fontSize="12" textAnchor="middle" fontFamily="monospace">Iub</text>
            
            {/* RNC to CS */}
            <line x1="520" y1="80" x2="600" y2="60" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="6 3" />
            <text x="555" y="60" fill="#22c55e" fontSize="10" textAnchor="middle" fontFamily="monospace">Iu-CS</text>
            
            {/* RNC to PS */}
            <line x1="520" y1="120" x2="600" y2="140" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="6 3" />
            <text x="555" y="145" fill="#22c55e" fontSize="10" textAnchor="middle" fontFamily="monospace">Iu-PS</text>
            
            {/* CS to Internet */}
            <line x1="720" y1="60" x2="770" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="6 3" />
            
            {/* PS to Internet */}
            <line x1="720" y1="140" x2="770" y2="100" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="6 3" />

            {/* Nodes */}
            {/* UE */}
            <g 
              onClick={() => setSelectedNode(selectedNode === "ue" ? null : "ue")} 
              className="cursor-pointer"
            >
              <rect x="30" y="60" width="90" height="80" rx="8" fill="#083344" stroke="#22d3ee" strokeWidth={selectedNode === "ue" ? 3 : 1.5} />
              <text x="75" y="95" fill="#22d3ee" fontSize="14" textAnchor="middle" fontWeight="600">UE</text>
              <text x="75" y="115" fill="#67e8f9" fontSize="10" textAnchor="middle">Dispositivo</text>
            </g>
            
            {/* NodeB */}
            <g 
              onClick={() => setSelectedNode(selectedNode === "nodeb" ? null : "nodeb")} 
              className="cursor-pointer"
            >
              <rect x="220" y="55" width="100" height="90" rx="8" fill="#431407" stroke="#f97316" strokeWidth={selectedNode === "nodeb" ? 3 : 1.5} />
              <text x="270" y="90" fill="#f97316" fontSize="14" textAnchor="middle" fontWeight="600">NodeB</text>
              <text x="270" y="110" fill="#fdba74" fontSize="10" textAnchor="middle">Estación Base</text>
              <text x="270" y="125" fill="#fdba74" fontSize="10" textAnchor="middle">WCDMA</text>
            </g>
            
            {/* RNC */}
            <g 
              onClick={() => setSelectedNode(selectedNode === "rnc" ? null : "rnc")} 
              className="cursor-pointer"
            >
              <rect x="420" y="55" width="100" height="90" rx="8" fill="#052e16" stroke="#22c55e" strokeWidth={selectedNode === "rnc" ? 3 : 1.5} />
              <text x="470" y="90" fill="#22c55e" fontSize="14" textAnchor="middle" fontWeight="600">RNC</text>
              <text x="470" y="110" fill="#86efac" fontSize="10" textAnchor="middle">Radio Network</text>
              <text x="470" y="125" fill="#86efac" fontSize="10" textAnchor="middle">Controller</text>
            </g>
            
            {/* MSC/VLR */}
            <g 
              onClick={() => setSelectedNode(selectedNode === "cs" ? null : "cs")} 
              className="cursor-pointer"
            >
              <rect x="610" y="30" width="110" height="60" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth={selectedNode === "cs" ? 3 : 1.5} />
              <text x="665" y="55" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="600">MSC/VLR</text>
              <text x="665" y="72" fill="#fca5a5" fontSize="10" textAnchor="middle">Core CS (Voz)</text>
            </g>
            
            {/* SGSN/GGSN */}
            <g 
              onClick={() => setSelectedNode(selectedNode === "ps" ? null : "ps")} 
              className="cursor-pointer"
            >
              <rect x="610" y="110" width="110" height="60" rx="8" fill="#2e1065" stroke="#a855f7" strokeWidth={selectedNode === "ps" ? 3 : 1.5} />
              <text x="665" y="135" fill="#a855f7" fontSize="11" textAnchor="middle" fontWeight="600">SGSN/GGSN</text>
              <text x="665" y="152" fill="#d8b4fe" fontSize="10" textAnchor="middle">Core PS (Datos)</text>
            </g>
            
            {/* Internet */}
            <g>
              <circle cx="785" cy="100" r="25" fill="#134e4a" stroke="#14b8a6" strokeWidth="1.5" />
              <text x="785" y="105" fill="#14b8a6" fontSize="10" textAnchor="middle">Internet</text>
            </g>
          </svg>
        </div>

        {/* Selected node info */}
        {node && (
          <div className={`mt-4 animate-in fade-in slide-in-from-top-2 rounded-lg border p-4 ${node.color}`}>
            <h4 className="text-lg font-semibold">{node.label} — {node.sublabel}</h4>
            <p className="mt-2 text-sm opacity-80">{node.description}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {node.specs.map((spec, i) => (
                <div key={i} className="flex justify-between rounded bg-background/20 px-3 py-2 text-sm">
                  <span className="opacity-70">{spec.key}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WCDMA Spreading Demo */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-2 text-lg font-semibold">Cómo funciona WCDMA — Spreading de señal</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          WCDMA multiplica cada bit de datos por un código de dispersión de alta frecuencia. 
          Esto esparce la señal sobre 5 MHz. En recepción, el mismo código extrae la señal original.
        </p>

        {/* Legend */}
        <div className="mb-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-red-500" />
            <span className="text-muted-foreground">Bit "1"</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-blue-500" />
            <span className="text-muted-foreground">Bit "0"</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-purple-500" />
            <span className="text-muted-foreground">Chip dispersado</span>
          </div>
        </div>

        {/* Data bits */}
        <div className="mb-3 flex items-center gap-3">
          <span className="w-24 shrink-0 text-sm text-muted-foreground">Bits de datos:</span>
          <div className="flex gap-1">
            {dataBits.map((bit, i) => (
              <div
                key={i}
                className={`flex h-10 w-12 items-center justify-center rounded font-mono text-sm font-semibold text-white ${
                  bit === 1 ? "bg-red-500" : "bg-blue-500"
                }`}
              >
                {bit}
              </div>
            ))}
          </div>
        </div>

        {/* Code chips */}
        <div className="mb-3 flex items-center gap-3">
          <span className="w-24 shrink-0 text-sm text-muted-foreground">Código (SF=8):</span>
          <div className="flex gap-1">
            {codeChips.map((chip, i) => (
              <div
                key={i}
                className="flex h-10 w-12 items-center justify-center rounded bg-gray-600 font-mono text-sm font-semibold text-white"
              >
                {chip > 0 ? "+1" : "-1"}
              </div>
            ))}
          </div>
        </div>

        {/* Spread result */}
        <div className="mb-4 flex items-center gap-3">
          <span className="w-24 shrink-0 text-sm text-muted-foreground">Transmitido:</span>
          <div className="flex gap-1">
            {getSpreadResult().map((chip, i) => (
              <div
                key={i}
                className={`flex h-10 w-12 items-center justify-center rounded font-mono text-sm font-semibold text-white transition-all duration-300 ${
                  i < spreadingStep ? "bg-purple-500 opacity-100" : "bg-gray-800 opacity-30"
                }`}
              >
                {i < spreadingStep ? (chip > 0 ? "+1" : "-1") : "?"}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={animateSpreading}
          className="rounded-full border border-primary bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          Animar spreading →
        </button>
      </div>
    </div>
  )
}
