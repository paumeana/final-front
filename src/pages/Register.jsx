import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Layout } from "../layout/Layout"
import { registerApi, loginApi } from "../services/apiAuth"
import { useAuth } from "../context/AuthContext"

export const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }
    setLoading(true)
    try {
      await registerApi(email, password)
      const { token } = await loginApi(email, password)
      login(token)
      navigate("/")
    } catch (err) {
      setError("No se pudo crear la cuenta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md rounded-3xl p-8 bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl">
          <h1 className="text-2xl font-semibold text-center mb-2">Crear cuenta</h1>
          <p className="text-center text-slate-700 mb-6">Registrate para usar la grabadora</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/60 placeholder-slate-500 text-slate-800 outline-none border border-white/50 focus:border-purple-500"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/60 placeholder-slate-500 text-slate-800 outline-none border border-white/50 focus:border-purple-500"
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/60 placeholder-slate-500 text-slate-800 outline-none border border-white/50 focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-purple-600/90 hover:bg-purple-700 text-white font-medium shadow-lg"
            >
              {loading ? "Creando..." : "Crear cuenta"}
            </button>
          </form>

          {error && <p className="mt-4 text-center text-red-600">{error}</p>}

          <p className="mt-6 text-center text-sm">
            ¿Ya tenés cuenta? <Link to="/login" className="underline font-medium">Ingresar</Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}