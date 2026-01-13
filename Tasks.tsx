
import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  category: 'Assignment' | 'Self Study' | 'Admin' | 'Personal';
  dueDate: string;
  completed: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Finish OS Lab Report', category: 'Assignment', dueDate: 'Tomorrow', completed: false },
    { id: '2', title: 'Prepare for Math Quiz', category: 'Self Study', dueDate: 'May 20', completed: false },
    { id: '3', title: 'Submit Scholarship Form', category: 'Admin', dueDate: 'May 25', completed: true }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      category: 'Personal',
      dueDate: 'Today',
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Your Tasks</h2>
            <p className="text-[#444746] font-medium">Keep track of your academic commitments.</p>
          </div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-[22px] flex items-center justify-center">
            <i className="fas fa-clipboard-list text-2xl"></i>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <input 
            type="text" 
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="What needs to be done?"
            className="flex-1 bg-gray-50 border border-transparent rounded-[24px] px-6 py-4 outline-none focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium text-gray-700"
          />
          <button 
            onClick={addTask}
            className="bg-indigo-600 text-white px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            Add Task
          </button>
        </div>

        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div 
                key={task.id} 
                className={`flex items-center justify-between p-5 rounded-[28px] border transition-all group ${
                  task.completed ? 'bg-gray-50 border-transparent opacity-60' : 'bg-white border-gray-100 shadow-sm hover:border-indigo-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-200 text-transparent hover:border-indigo-400'
                    }`}
                  >
                    <i className="fas fa-check text-[10px]"></i>
                  </button>
                  <div>
                    <p className={`font-bold text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[9px] font-black uppercase text-indigo-500 tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md">{task.category}</span>
                      <span className="text-[9px] font-bold text-gray-400"><i className="far fa-clock mr-1"></i>{task.dueDate}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="w-10 h-10 rounded-xl text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                >
                  <i className="fas fa-trash-alt text-sm"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
              <i className="fas fa-check-double text-4xl text-gray-200 mb-4"></i>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">All clear! No pending tasks.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
