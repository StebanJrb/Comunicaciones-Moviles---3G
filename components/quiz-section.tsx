"use client"

import { useState } from "react"

interface Question {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Qué organismo definió IMT-2000 como el marco estándar de las redes 3G?",
    options: ["IEEE", "3GPP", "ITU", "ETSI"],
    correctIndex: 2,
    explanation: "La ITU (Unión Internacional de Telecomunicaciones) definió IMT-2000 como el marco regulatorio. 3GPP implementó WCDMA/UMTS bajo ese paraguas.",
  },
  {
    id: 2,
    question: "¿Cuál es la velocidad mínima que IMT-2000 exige en condición estática (peatonal)?",
    options: ["144 kbps", "384 kbps", "1 Mbps", "2 Mbps"],
    correctIndex: 3,
    explanation: "IMT-2000 exige 2 Mbps en condición estática/peatonal, 384 kbps vehicular y 144 kbps a alta velocidad (tren).",
  },
  {
    id: 3,
    question: "En la arquitectura UMTS, ¿qué interfaz conecta el UE con el NodeB?",
    options: ["Iub", "Iu-PS", "Uu", "Iur"],
    correctIndex: 2,
    explanation: "La interfaz Uu (también llamada interfaz aérea) conecta el UE con el NodeB usando WCDMA. Iub conecta NodeB con RNC.",
  },
  {
    id: 4,
    question: "¿Qué ventaja técnica clave tiene EDGE sobre GPRS?",
    options: ["Mayor ancho de banda de canal", "Modulación 8-PSK (3 bits/símbolo)", "Conmutación de circuitos", "Mayor cobertura de celda"],
    correctIndex: 1,
    explanation: "EDGE usa modulación 8-PSK que codifica 3 bits por símbolo vs 1 bit de GMSK/GPRS. El canal sigue siendo 200 kHz — la ganancia es de eficiencia espectral.",
  },
  {
    id: 5,
    question: "En WCDMA, el \"spreading factor\" (SF) determina:",
    options: ["La frecuencia portadora", "La relación entre chip rate y bit rate del usuario", "El número de celdas en la red", "La banda de frecuencia asignada"],
    correctIndex: 1,
    explanation: "SF = Chip Rate / Bit Rate. Un SF alto significa menor velocidad pero mayor ganancia de procesamiento y cobertura. WCDMA usa chip rate fijo de 3.84 Mcps.",
  },
  {
    id: 6,
    question: "¿Cuál es la principal diferencia entre el dominio CS y PS en UMTS?",
    options: ["CS es más rápido que PS", "CS usa conmutación de circuitos (voz), PS usa paquetes (datos)", "PS solo funciona en interiores", "CS es para datos y PS para voz"],
    correctIndex: 1,
    explanation: "CS (Circuit Switched) maneja la voz tradicional con conmutación de circuitos, mientras PS (Packet Switched) maneja los datos con conmutación de paquetes, permitiendo internet móvil real.",
  },
  {
    id: 7,
    question: "¿Qué nodo de la arquitectura UMTS es responsable del soft handover?",
    options: ["NodeB", "RNC", "SGSN", "GGSN"],
    correctIndex: 1,
    explanation: "El RNC (Radio Network Controller) gestiona el soft handover, permitiendo que el UE esté conectado a múltiples NodeB simultáneamente. Esta es una característica única de CDMA.",
  },
  {
    id: 8,
    question: "¿Por qué IS-136HS tuvo un despliegue limitado en América del Norte?",
    options: ["Era muy costoso", "Los operadores migraron directamente a WCDMA o CDMA2000", "No fue aprobado por la ITU", "Solo funcionaba en banda 2100 MHz"],
    correctIndex: 1,
    explanation: "IS-136HS fue un estándar de transición. Los operadores de D-AMPS/IS-136 prefirieron migrar directamente a tecnologías más avanzadas como WCDMA o CDMA2000 en lugar de implementar IS-136HS.",
  },
]

export function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState<number | null>(null)

  const question = questions[currentQuestion]
  const selectedAnswer = selectedAnswers[currentQuestion]
  const isAnswered = selectedAnswer !== null
  const isCorrect = selectedAnswer === question.correctIndex

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = index
    setSelectedAnswers(newAnswers)
    setShowExplanation(currentQuestion)
  }

  const handleNext = () => {
    setShowExplanation(null)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    setShowExplanation(null)
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(new Array(questions.length).fill(null))
    setShowResults(false)
    setShowExplanation(null)
  }

  const score = selectedAnswers.filter((ans, i) => ans === questions[i].correctIndex).length
  const percentage = Math.round((score / questions.length) * 100)

  if (showResults) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold">Quiz de Verificación</h2>
          <p className="mt-2 text-muted-foreground">Resultados finales</p>
        </div>

        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mb-4">
            <div className={`inline-flex h-32 w-32 items-center justify-center rounded-full ${
              percentage >= 70 ? "bg-green-500/20" : percentage >= 50 ? "bg-orange-500/20" : "bg-red-500/20"
            }`}>
              <span className={`text-5xl font-bold ${
                percentage >= 70 ? "text-green-400" : percentage >= 50 ? "text-orange-400" : "text-red-400"
              }`}>
                {score}/{questions.length}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-semibold">
            {percentage >= 70 ? "¡Excelente trabajo!" : percentage >= 50 ? "¡Buen intento!" : "Sigue practicando"}
          </h3>
          <p className="mt-2 text-muted-foreground">
            Has acertado el {percentage}% de las preguntas sobre tecnologías 3G.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={handleReset}
              className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Reintentar Quiz
            </button>
            <button
              onClick={() => setShowResults(false)}
              className="rounded-full border border-border px-6 py-3 font-medium transition-colors hover:bg-secondary"
            >
              Revisar Respuestas
            </button>
          </div>
        </div>

        {/* Answer review */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Revisión de respuestas</h3>
          {questions.map((q, i) => {
            const userAnswer = selectedAnswers[i]
            const isCorrectAnswer = userAnswer === q.correctIndex
            return (
              <div
                key={q.id}
                className={`rounded-xl border p-4 ${
                  isCorrectAnswer ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    isCorrectAnswer ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {isCorrectAnswer ? "✓" : "✗"}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{q.question}</p>
                    <p className="mt-1 text-sm">
                      <span className="text-muted-foreground">Tu respuesta: </span>
                      <span className={isCorrectAnswer ? "text-green-400" : "text-red-400"}>
                        {userAnswer !== null ? q.options[userAnswer] : "Sin responder"}
                      </span>
                    </p>
                    {!isCorrectAnswer && (
                      <p className="mt-1 text-sm">
                        <span className="text-muted-foreground">Respuesta correcta: </span>
                        <span className="text-green-400">{q.options[q.correctIndex]}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Quiz de Verificación</h2>
        <p className="mt-2 text-muted-foreground">
          Pon a prueba tus conocimientos sobre las tecnologías 3G.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 overflow-hidden rounded-full bg-secondary h-2">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-6">
          <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
            Pregunta {currentQuestion + 1}
          </span>
          <h3 className="mt-3 text-lg font-semibold">{question.question}</h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrectOption = index === question.correctIndex
            const showCorrect = isAnswered && isCorrectOption
            const showWrong = isAnswered && isSelected && !isCorrectOption

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  showCorrect
                    ? "border-green-500 bg-green-500/10 text-green-400"
                    : showWrong
                    ? "border-red-500 bg-red-500/10 text-red-400"
                    : isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                } ${isAnswered ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                    showCorrect
                      ? "border-green-500 bg-green-500 text-white"
                      : showWrong
                      ? "border-red-500 bg-red-500 text-white"
                      : isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  }`}>
                    {showCorrect ? "✓" : showWrong ? "✗" : String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation === currentQuestion && (
          <div className={`mt-4 animate-in fade-in slide-in-from-top-2 rounded-xl p-4 ${
            isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"
          }`}>
            <p className={`text-sm font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>
              {isCorrect ? "¡Correcto!" : "Incorrecto"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-secondary disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </button>

        <div className="flex gap-2">
          {questions.map((_, i) => {
            const answered = selectedAnswers[i] !== null
            const correct = selectedAnswers[i] === questions[i].correctIndex
            return (
              <button
                key={i}
                onClick={() => {
                  setCurrentQuestion(i)
                  setShowExplanation(null)
                }}
                className={`h-3 w-3 rounded-full transition-all ${
                  i === currentQuestion
                    ? "scale-125 bg-primary"
                    : answered
                    ? correct
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-border hover:bg-muted-foreground"
                }`}
              />
            )
          })}
        </div>

        {isAnswered ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {currentQuestion === questions.length - 1 ? "Ver Resultados" : "Siguiente"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <div className="w-32" /> // Spacer
        )}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg bg-secondary/50 p-3">
          <div className="text-2xl font-bold text-primary">{selectedAnswers.filter(a => a !== null).length}</div>
          <div className="text-xs text-muted-foreground">Respondidas</div>
        </div>
        <div className="rounded-lg bg-secondary/50 p-3">
          <div className="text-2xl font-bold text-green-400">
            {selectedAnswers.filter((a, i) => a === questions[i].correctIndex).length}
          </div>
          <div className="text-xs text-muted-foreground">Correctas</div>
        </div>
        <div className="rounded-lg bg-secondary/50 p-3">
          <div className="text-2xl font-bold text-muted-foreground">
            {questions.length - selectedAnswers.filter(a => a !== null).length}
          </div>
          <div className="text-xs text-muted-foreground">Pendientes</div>
        </div>
      </div>
    </div>
  )
}
