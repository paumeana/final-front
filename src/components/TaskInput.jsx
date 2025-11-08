import { useRef, useState } from "react"
import { z } from "zod"

const taskSchema = z.object({
  text: z.string().min(3, "El texto debe tener al menos 3 caracteres").max(200, "El texto no puede superar los 200 caracteres"),
})

export const TaskInput = ({ onAdd }) => {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isValid, setIsValid] = useState(false)
  const recognitionRef = useRef(null)

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta reconocimiento de voz")
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = "es-AR"
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event) => {
      let texto = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        texto += event.results[i][0].transcript
      }
      setTranscript(texto)
      try {
        taskSchema.parse({ text: texto.trim() })
        setIsValid(true)
      } catch {
        setIsValid(false)
      }
    }

    recognition.onend = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  const handleConfirm = () => {
    const text = transcript.trim()
    try {
      taskSchema.parse({ text })
      onAdd(text)
      setTranscript("")
      setIsValid(false)
    } catch (err) {
      alert(err.errors?.[0]?.message || "Texto inválido")
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        {!listening ? (
          <button onClick={startListening} className="w-16 h-16 rounded-full bg-purple-600/90 hover:bg-purple-700 text-white shadow-lg">
            🎤
          </button>
        ) : (
          <button onClick={stopListening} className="w-16 h-16 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white shadow-lg animate-pulse">
            ■
          </button>
        )}
      </div>

      {transcript && (
        <div className="mt-4 rounded-2xl p-4 bg-white/50 border border-white/60">
          <label className="block text-sm text-slate-700 mb-1">Texto dictado</label>
          <textarea
            className="w-full min-h-24 rounded-xl bg-white/70 text-slate-800 p-3 outline-none border border-white/60"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
          <div className="mt-3 flex items-center justify-between">
            <span className={`text-sm ${isValid ? "text-emerald-700" : "text-rose-700"}`}>
              {isValid ? "Listo para guardar" : "Mín. 3 caracteres"}
            </span>
            <button onClick={handleConfirm} className="px-4 py-2 rounded-full bg-purple-600/90 hover:bg-purple-700 text-white shadow">
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}