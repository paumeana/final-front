import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/20 border-b border-white/30 text-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">NeburikApp</h1>
        <nav className="flex items-center gap-4">
          {!user && (
            <>
              <Link className="hover:underline" to="/login">Ingresar</Link>
              <Link className="px-3 py-1 rounded-full bg-white/30 hover:bg-white/40 border border-white/40" to="/register">Crear cuenta</Link>
            </>
          )}
          {user && (
            <>
              <Link className="hover:underline" to="/">Inicio</Link>
              <button onClick={handleLogout} className="px-3 py-1 rounded-full bg-white/30 hover:bg-white/40 border border-white/40">
                Salir
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}