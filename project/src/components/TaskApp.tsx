import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { Plus, Trash2, Check, X } from 'lucide-react';

function TaskApp() {
  const { tasks, addTask, toggleTask, deleteTask, renameTask } = useTasks();
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addTask(newTitle.trim());
    setNewTitle('');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Add new task"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAdd();
          }}
        />
        <button onClick={handleAdd} className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-1 text-sm">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto p-4 space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2">
            <button onClick={() => toggleTask(task.id)} className="text-green-600">
              {task.completed ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
            <input
              className={`flex-1 bg-transparent outline-none text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}
              value={task.title}
              onChange={(e) => renameTask(task.id, e.target.value)}
            />
            <button onClick={() => deleteTask(task.id)} className="text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskApp;
