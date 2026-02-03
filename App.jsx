import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Timer as TimerIcon, ListTodo, Settings, User, Bell, Search } from 'lucide-react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Design the dashboard UI', completed: true },
      { id: 2, text: 'Implement Pomodoro logic', completed: false },
      { id: 3, text: 'Add task management', completed: false },
    ];
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  const productivityTips = [
    "The 2-minute rule: If a task takes less than 2 minutes, do it now.",
    "Try the Pomodoro technique for deep focus.",
    "Break large projects into smaller, actionable tasks.",
    "Prioritize your 'Big Three' tasks every morning.",
  ];

  const randomTip = productivityTips[Math.floor(Date.now() / 86400000) % productivityTips.length];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-20 md:w-64 glass m-4 mr-0 p-6 flex flex-col gap-8 sticky top-4 h-[calc(100vh-32px)]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary-glow">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="hidden md:block font-bold text-xl tracking-tight">Antigravity</span>
        </div>

        <div className="flex-1 space-y-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem
            icon={<TimerIcon size={20} />}
            label="Focus Mode"
            active={activeTab === 'focus'}
            onClick={() => setActiveTab('focus')}
          />
          <NavItem
            icon={<ListTodo size={20} />}
            label="Tasks"
            active={activeTab === 'tasks'}
            onClick={() => setActiveTab('tasks')}
          />
        </div>

        <div className="space-y-4">
          <div className="hidden md:block glass p-4 text-xs">
            <p className="text-text-muted mb-2 font-bold uppercase tracking-wider">Pro Tip</p>
            <p className="leading-relaxed opacity-80">{randomTip}</p>
          </div>
          <div className="space-y-2 opacity-50">
            <NavItem icon={<Settings size={20} />} label="Settings" />
            <NavItem icon={<User size={20} />} label="Profile" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-1 tracking-tight">Welcome back, Fatima!</h1>
            <p className="text-text-muted text-lg">You have {tasks.length - completedCount} tasks to complete today.</p>
          </div>
          <div className="flex gap-4">
            <button className="glass p-3 text-text-muted hover:text-white hover:bg-white/10 transition-all">
              <Search size={20} />
            </button>
            <button className="glass p-3 text-text-muted hover:text-white hover:bg-white/10 relative transition-all">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full border-2 border-bg-dark"></span>
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StatCard
                    label="Tasks Completed"
                    value={completedCount}
                    total={tasks.length}
                    color="var(--primary)"
                  />
                  <StatCard
                    label="Focus Time"
                    value="4.5h"
                    total="Goal: 6h"
                    color="var(--secondary)"
                  />
                </div>

                <div className="glass p-8 min-h-[500px] flex flex-col">
                  <TaskList
                    tasks={tasks}
                    onAddTask={addTask}
                    onToggleTask={toggleTask}
                    onDeleteTask={deleteTask}
                    onClearCompleted={clearCompleted}
                  />
                </div>
              </div>

              <div className="space-y-8">
                <Timer />
                <div className="glass p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    Coming Up Next
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start opacity-70">
                      <div className="bg-white/5 p-2 rounded-lg">15:00</div>
                      <div>
                        <p className="font-medium">Team Sync</p>
                        <p className="text-xs text-text-muted">Marketing Project</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start opacity-40">
                      <div className="bg-white/5 p-2 rounded-lg">16:30</div>
                      <div>
                        <p className="font-medium">Review PRs</p>
                        <p className="text-xs text-text-muted">Github</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'focus' && (
            <motion.div
              key="focus"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-center min-h-[60vh]"
            >
              <div className="w-full max-w-md">
                <Timer />
              </div>
            </motion.div>
          )}

          {activeTab === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-8 max-w-4xl mx-auto min-h-[600px]"
            >
              <TaskList
                tasks={tasks}
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onClearCompleted={clearCompleted}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${active
      ? 'bg-primary/20 text-primary border border-primary/20'
      : 'text-text-muted hover:text-white hover:bg-white/5'
      }`}
  >
    {icon}
    <span className="hidden md:block font-medium">{label}</span>
  </button>
);

const StatCard = ({ label, value, total, color }) => (
  <div className="glass p-6">
    <p className="text-text-muted text-sm font-medium mb-2">{label}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-bold">{value}</span>
      <span className="text-text-muted text-sm">/ {total}</span>
    </div>
    <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: typeof value === 'number' ? `${(value / total) * 100}%` : '65%',
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}88`
        }}
      />
    </div>
  </div>
);

export default App;
