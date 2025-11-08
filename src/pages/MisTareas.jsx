import { useTasks } from "../hooks/useTasks"
import { TaskList } from "../components/TaskList"
import { TaskInput } from "../components/TaskInput"
import { Layout } from "../layout/Layout"
import { Helmet } from "react-helmet"

export const MisTareas = () => {
  const { tasks, addTask, removeTask, toggleTask } = useTasks()

  return (
    <Layout>
      <Helmet><title>Grabadora</title></Helmet>

      <div className="relative mb-8">
        <div className="mx-auto w-28 h-28 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 shadow-2xl flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-purple-600/90 hover:bg-purple-700 transition-all flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">🎤</span>
          </div>
        </div>
        <p className="text-center mt-3 text-slate-700">Tocá el mic para dictar tu tarea</p>
      </div>

      <div className="rounded-3xl p-4 bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl">
        <TaskInput onAdd={addTask} />
      </div>

      <div className="mt-6 rounded-3xl p-4 bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl">
        <h2 className="text-lg font-medium mb-2">Tus notas</h2>
        <TaskList tasks={tasks} onDelete={removeTask} onToggle={toggleTask} />
      </div>
    </Layout>
  )
}