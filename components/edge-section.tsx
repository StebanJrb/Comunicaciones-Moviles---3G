"use client"

import { useState } from "react"

export function EDGESection() {
  const [activeModulation, setActiveModulation] = useState<"gmsk" | "8psk">("8psk")

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">TDMA-EDGE e IS-136HS</h2>
        <p className="mt-2 text-muted-foreground">
          La vía de evolución 3G para redes TDMA heredadas (GSM e IS-136). 
          Permite actualizar a 3G sin cambiar la infraestructura de radio existente.
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* EDGE Card */}
        <div className="rounded-xl border border-orange-500/30 bg-card p-5">
          <div className="mb-3 inline-block rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-400">
            TDMA-EDGE (GSM)
          </div>
          <h3 className="text-lg font-semibold">Enhanced Data rates for GSM Evolution</h3>
          
          <div className="mt-4 space-y-2">
            {[
              { key: "Base", value: "GSM / GPRS" },
              { key: "Modulación", value: "8-PSK (vs GMSK 2G)" },
              { key: "Velocidad teórica", value: "384 kbps" },
              { key: "Velocidad real", value: "~100–150 kbps" },
              { key: "Ancho de banda", value: "200 kHz (igual 2G)" },
              { key: "Despliegue", value: "Global (150+ países)" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.key}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            EDGE es considerado oficialmente 3G por la ITU (UWC-136). Su ventaja: reutiliza completamente la red GSM. 
            Solo requiere actualización de software en NodeB y nuevas tarjetas de modulación.
          </p>
        </div>

        {/* IS-136HS Card */}
        <div className="rounded-xl border-2 border-primary/50 bg-card p-5 ring-1 ring-primary/10">
          <div className="mb-3 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
            IS-136HS
          </div>
          <h3 className="text-lg font-semibold">IS-136 High Speed (D-AMPS evolution)</h3>
          
          <div className="mt-4 space-y-2">
            {[
              { key: "Base", value: "IS-136 / D-AMPS" },
              { key: "Modulación", value: "8-PSK + técnicas avanzadas" },
              { key: "Velocidad teórica", value: "384 kbps" },
              { key: "Banda", value: "850 / 1900 MHz" },
              { key: "Región", value: "América del Norte" },
              { key: "Estado", value: "Transición → WCDMA" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.key}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            IS-136HS fue la propuesta de evolución del IS-136 (D-AMPS) hacia 3G. En la práctica, los operadores migraron 
            directamente a WCDMA o CDMA2000, haciendo de IS-136HS más un estándar de transición.
          </p>
        </div>
      </div>

      {/* Modulation Visualization */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-2 text-lg font-semibold">Modulación: GMSK vs 8-PSK</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          8-PSK codifica 3 bits por símbolo (vs 1 bit de GMSK), triplicando la eficiencia espectral.
        </p>

        {/* Toggle */}
        <div className="mb-6 flex items-center gap-2">
          <button
            onClick={() => setActiveModulation("gmsk")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeModulation === "gmsk"
                ? "bg-orange-500 text-white"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            GMSK (2G)
          </button>
          <button
            onClick={() => setActiveModulation("8psk")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeModulation === "8psk"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            8-PSK (EDGE)
          </button>
        </div>

        {/* Constellation diagrams */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
          {/* GMSK */}
          <div className={`transition-opacity ${activeModulation === "gmsk" ? "opacity-100" : "opacity-30"}`}>
            <div className="mb-2 text-center text-sm font-medium text-muted-foreground">
              GMSK — 2 fases (1 bit/símbolo)
            </div>
            <svg viewBox="0 0 200 200" className="h-48 w-48">
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" className="text-border" />
              <line x1="100" y1="100" x2="170" y2="100" stroke="#f97316" strokeWidth="1" strokeDasharray="4 2" />
              <line x1="100" y1="100" x2="30" y2="100" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2" />
              <circle cx="170" cy="100" r="12" fill="#f97316" />
              <text x="170" y="80" fill="#f97316" fontSize="14" textAnchor="middle" fontWeight="600">0</text>
              <circle cx="30" cy="100" r="12" fill="#ef4444" />
              <text x="30" y="80" fill="#ef4444" fontSize="14" textAnchor="middle" fontWeight="600">1</text>
              <circle cx="100" cy="100" r="3" fill="currentColor" className="text-muted-foreground" />
            </svg>
          </div>

          {/* Arrow */}
          <div className="hidden text-4xl text-muted-foreground md:block">→</div>

          {/* 8-PSK */}
          <div className={`transition-opacity ${activeModulation === "8psk" ? "opacity-100" : "opacity-30"}`}>
            <div className="mb-2 text-center text-sm font-medium text-muted-foreground">
              8-PSK — 8 fases (3 bits/símbolo)
            </div>
            <svg viewBox="0 0 200 200" className="h-48 w-48">
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" className="text-border" />
              {[
                { angle: 0, bits: "000", color: "#4a9eff" },
                { angle: 45, bits: "001", color: "#22c55e" },
                { angle: 90, bits: "010", color: "#f97316" },
                { angle: 135, bits: "011", color: "#ef4444" },
                { angle: 180, bits: "100", color: "#a855f7" },
                { angle: 225, bits: "101", color: "#14b8a6" },
                { angle: 270, bits: "110", color: "#eab308" },
                { angle: 315, bits: "111", color: "#ec4899" },
              ].map((point, i) => {
                const rad = (point.angle * Math.PI) / 180
                const x = 100 + 70 * Math.cos(rad)
                const y = 100 - 70 * Math.sin(rad)
                const labelX = 100 + 90 * Math.cos(rad)
                const labelY = 100 - 90 * Math.sin(rad)
                return (
                  <g key={i}>
                    <line x1="100" y1="100" x2={x} y2={y} stroke={point.color} strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
                    <circle cx={x} cy={y} r="10" fill={point.color} />
                    <text x={labelX} y={labelY + 4} fill={point.color} fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {point.bits}
                    </text>
                  </g>
                )
              })}
              <circle cx="100" cy="100" r="3" fill="currentColor" className="text-muted-foreground" />
            </svg>
          </div>
        </div>

        {/* Comparison stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
          <div className="rounded-lg bg-secondary/50 p-4">
            <div className="text-2xl font-bold text-orange-400">1</div>
            <div className="text-xs text-muted-foreground">bit/símbolo GMSK</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4">
            <div className="text-2xl font-bold text-primary">3</div>
            <div className="text-xs text-muted-foreground">bits/símbolo 8-PSK</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4">
            <div className="text-2xl font-bold text-green-400">3x</div>
            <div className="text-xs text-muted-foreground">mejora eficiencia</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4">
            <div className="text-2xl font-bold text-purple-400">200</div>
            <div className="text-xs text-muted-foreground">kHz (mismo canal)</div>
          </div>
        </div>
      </div>

      {/* Key differences */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <h4 className="mb-4 font-semibold">Diferencias clave entre EDGE e IS-136HS</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h5 className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-400">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20">E</span>
              EDGE
            </h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Evolución de GSM (sistema europeo)</li>
              <li>• Despliegue masivo global</li>
              <li>• Coexistencia con GPRS</li>
              <li>• Todavía en uso como fallback</li>
            </ul>
          </div>
          <div>
            <h5 className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">I</span>
              IS-136HS
            </h5>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Evolución de D-AMPS (sistema americano)</li>
              <li>• Despliegue limitado</li>
              <li>• Operadores migraron a CDMA2000</li>
              <li>• Principalmente histórico</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
