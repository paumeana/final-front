import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-fuchsia-300 via-purple-300 to-pink-300 text-slate-800">
    <Header />
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {children}
      </div>
    </main>
    <Footer />
  </div>
)