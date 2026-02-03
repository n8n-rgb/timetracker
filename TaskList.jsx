import React, { useState } from 'react';
import { Plus, Check, Trash2, Clock, Calendar, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, onAddTask, onToggleTask, onDeleteTask, onClearCompleted }) => {
    const [newTaskText, setNewTaskText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTaskText.trim()) {
            onAddTask(newTaskText);
            setNewTaskText('');
        }
    };

    const completedCount = tasks.filter(t => t.completed).length;

    return (
        <div className="flex flex-col h-full">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Calendar className="text-primary" size={24} />
                        Today's Focus
                    </h2>
                    {completedCount > 0 && (
                        <button
                            onClick={onClearCompleted}
                            className="text-xs font-semibold text-text-muted hover:text-accent transition-colors flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-accent/20"
                        >
                            Clear Completed
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="relative group">
                    <input
                        type="text"
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        placeholder="What's your primary focus?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 pr-14 focus:outline-none focus:border-primary/50 transition-all font-medium placeholder:text-text-muted/50"
                    />
                    <button
                        type="submit"
                        className="absolute right-2.5 top-2.5 p-2 bg-primary rounded-lg text-white hover:bg-primary/80 transition-all transform active:scale-90"
                    >
                        <Plus size={22} />
                    </button>
                </form>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout" initial={false}>
                    {tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className={`glass p-4 group flex items-center gap-4 transition-all ${task.completed ? 'opacity-40 grayscale-[0.5]' : 'hover:border-primary/30'
                                }`}
                        >
                            <button
                                onClick={() => onToggleTask(task.id)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed
                                        ? 'bg-secondary border-secondary text-white'
                                        : 'border-white/20 hover:border-primary group-hover:scale-110'
                                    }`}
                            >
                                {task.completed && <Check size={14} strokeWidth={3} />}
                            </button>

                            <span className={`flex-1 text-lg font-medium transition-all ${task.completed ? 'line-through' : ''}`}>
                                {task.text}
                            </span>

                            <button
                                onClick={() => onDeleteTask(task.id)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-text-muted hover:text-accent transition-all transform hover:rotate-12"
                            >
                                <Trash2 size={18} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {tasks.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-text-muted opacity-40"
                    >
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                            <ListTodo size={32} />
                        </div>
                        <p className="font-medium text-lg">Your focus list is clear</p>
                        <p className="text-sm">Enjoy the clarity and start a new goal</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default TaskList;
