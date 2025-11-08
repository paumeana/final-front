import { formatDate } from "../utils/formatDate.js"

export const TaskItem = ({ task, onDelete, onToggle }) => (
  <li className={`flex items-center justify-between p-3 mb-2 rounded-2xl border border-white/40 backdrop-blur-xl bg-white/30 ${task.completed ? "line-through text-slate-500" : "text-slate-800"}`}>
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)}
        className="w-4 h-4 accent-purple-600"
      />
      <span>{task.text}</span>
    </div>
    <div className="flex items-center gap-4 text-sm">
      <span className="text-slate-600">{formatDate(task.createdAt)}</span>
      <button
        onClick={() => onDelete(task._id)}
        className="px-3 py-1 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white"
      >
        Eliminar
      </button>
    </div>
  </li>
)