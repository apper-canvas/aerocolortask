import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Define constant task categories with colors
const TASK_CATEGORIES = [
  { id: 'work', name: 'Work', color: 'category-indigo' },
  { id: 'personal', name: 'Personal', color: 'category-green' },
  { id: 'learning', name: 'Learning', color: 'category-purple' },
  { id: 'health', name: 'Health', color: 'category-rose' },
  { id: 'errands', name: 'Errands', color: 'category-amber' },
  { id: 'entertainment', name: 'Entertainment', color: 'category-cyan' },
];

// Example priority options
const PRIORITY_OPTIONS = [
  { id: 'low', name: 'Low', color: 'bg-green-500' },
  { id: 'medium', name: 'Medium', color: 'bg-amber-500' },
  { id: 'high', name: 'High', color: 'bg-rose-500' },
];

function MainFeature() {
  // Icon declarations
  const CheckCircleIcon = getIcon('CheckCircle');
  const CircleIcon = getIcon('Circle');
  const PlusIcon = getIcon('Plus');
  const XIcon = getIcon('X');
  const SaveIcon = getIcon('Save');
  const FilterIcon = getIcon('Filter');
  const ArrowUpIcon = getIcon('ArrowUp');
  const ArrowDownIcon = getIcon('ArrowDown');
  const TrashIcon = getIcon('Trash');
  const BriefcaseIcon = getIcon('Briefcase');
  const UserIcon = getIcon('User');
  const BookOpenIcon = getIcon('BookOpen');
  const HeartIcon = getIcon('Heart');
  const ShoppingBagIcon = getIcon('ShoppingBag');
  const FilmIcon = getIcon('Film');
  const ArchiveIcon = getIcon('Archive');
  
  // Task management state
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [showCompleted, setShowCompleted] = useState(true);
  
  // New task form state
  const [newTask, setNewTask] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
  });
  
  // Form validation state
  const [formErrors, setFormErrors] = useState({});
  
  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('colorTasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Error parsing saved tasks:', e);
        setTasks([]);
      }
    } else {
      // Set some example tasks for first-time users
      const exampleTasks = [
        {
          id: '1',
          title: 'Create project wireframes',
          completed: false,
          category: 'work',
          priority: 'high',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Go for a 30-minute walk',
          completed: false,
          category: 'health',
          priority: 'medium',
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          id: '3',
          title: 'Read chapter 5 of design book',
          completed: true,
          category: 'learning',
          priority: 'low',
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ];
      setTasks(exampleTasks);
      localStorage.setItem('colorTasks', JSON.stringify(exampleTasks));
    }
  }, []);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('colorTasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Toggle task completion status
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    
    const taskName = tasks.find(task => task.id === id).title;
    const isCompleted = !tasks.find(task => task.id === id).completed;
    
    if (isCompleted) {
      toast.success(`Completed: ${taskName}`);
    }
  };
  
  // Delete a task
  const deleteTask = (id) => {
    const taskName = tasks.find(task => task.id === id).title;
    setTasks(tasks.filter(task => task.id !== id));
    toast.success(`Deleted: ${taskName}`);
  };
  
  // Add a new task
  const addTask = () => {
    // Validate form
    const errors = {};
    if (!newTask.title.trim()) errors.title = "Title is required";
    if (!newTask.category) errors.category = "Category is required";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const task = {
      id: Date.now().toString(),
      title: newTask.title.trim(),
      category: newTask.category,
      priority: newTask.priority,
      description: newTask.description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTasks([task, ...tasks]);
    setShowTaskModal(false);
    setNewTask({ title: '', category: '', priority: 'medium', description: '' });
    setFormErrors({});
    toast.success(`Added: ${task.title}`);
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
    
    // Clear validation error when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };
  
  // Get filtered and sorted tasks
  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];
    
    // Filter by completion status
    if (!showCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.completed);
    }
    
    // Filter by category
    if (filter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.category === filter);
    }
    
    // Sort tasks
    filteredTasks.sort((a, b) => {
      // Always show incomplete tasks first
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then sort by the selected criteria
      if (sort === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sort === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sort === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      return 0;
    });
    
    return filteredTasks;
  };
  
  // Get category icon based on category id
  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case 'work':
        return <BriefcaseIcon className="w-4 h-4 text-indigo-500" />;
      case 'personal':
        return <UserIcon className="w-4 h-4 text-green-500" />;
      case 'learning':
        return <BookOpenIcon className="w-4 h-4 text-purple-500" />;
      case 'health':
        return <HeartIcon className="w-4 h-4 text-rose-500" />;
      case 'errands':
        return <ShoppingBagIcon className="w-4 h-4 text-amber-500" />;
      case 'entertainment':
        return <FilmIcon className="w-4 h-4 text-cyan-500" />;
      default:
        return <CircleIcon className="w-4 h-4 text-gray-500" />;
    }
  };
  
  const filteredTasks = getFilteredTasks();

  // Calculate completion stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="space-y-6">
      {/* Task Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div 
          className="card p-4"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col">
            <span className="text-sm text-surface-500 dark:text-surface-400">Total Tasks</span>
            <span className="text-2xl font-bold mt-1">{totalTasks}</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col">
            <span className="text-sm text-surface-500 dark:text-surface-400">Completed</span>
            <span className="text-2xl font-bold mt-1 text-green-500">{completedTasks}</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="card p-4"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col">
            <span className="text-sm text-surface-500 dark:text-surface-400">Progress</span>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold mr-2">{completionPercentage}%</span>
              <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Task Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <motion.button
              className="btn btn-outline flex items-center gap-2"
              onClick={() => setFilter(filter === 'all' ? 'all' : 'all')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FilterIcon className="w-4 h-4" />
              <span>
                {filter === 'all' 
                  ? 'All Categories' 
                  : TASK_CATEGORIES.find(c => c.id === filter)?.name || 'Filter'}
              </span>
            </motion.button>
            
            <div className="absolute top-12 left-0 z-10 bg-white dark:bg-surface-800 shadow-soft dark:shadow-neu-dark rounded-xl p-2 w-48 hidden group-focus:block">
              {TASK_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                  onClick={() => setFilter(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <motion.button
            className="btn btn-outline flex items-center gap-2"
            onClick={() => setSort(sort === 'newest' ? 'oldest' : 'newest')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {sort === 'newest' ? (
              <>
                <ArrowDownIcon className="w-4 h-4" />
                <span>Newest First</span>
              </>
            ) : (
              <>
                <ArrowUpIcon className="w-4 h-4" />
                <span>Oldest First</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            className={`btn ${showCompleted ? 'btn-primary' : 'btn-outline'} flex items-center gap-2`}
            onClick={() => setShowCompleted(!showCompleted)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArchiveIcon className="w-4 h-4" />
            <span>{showCompleted ? 'Showing Completed' : 'Show Completed'}</span>
          </motion.button>
        </div>
        
        <motion.button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => setShowTaskModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add Task</span>
        </motion.button>
      </div>
      
      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.length === 0 && (
            <motion.div 
              className="text-center py-10 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-surface-400 dark:text-surface-500 mb-2">
                <CheckCircleIcon className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-medium mb-2">No tasks to show</h3>
              <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
                {filter !== 'all' 
                  ? `No ${TASK_CATEGORIES.find(c => c.id === filter)?.name || ''} tasks found. Try changing your filter.`
                  : 'Your task list is empty. Add your first task to get started!'}
              </p>
            </motion.div>
          )}
          
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              className={`task-card ${task.completed ? 'opacity-70' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <button 
                className="flex-shrink-0"
                onClick={() => toggleTaskCompletion(task.id)}
                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {task.completed ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <CircleIcon className="w-6 h-6 text-surface-300 dark:text-surface-600" />
                )}
              </button>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <span 
                    className={`text-sm font-medium ${task.completed ? 'line-through text-surface-400 dark:text-surface-500' : ''}`}
                  >
                    {task.title}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-block w-2 h-2 rounded-full ${PRIORITY_OPTIONS.find(p => p.id === task.priority)?.color}`}></span>
                    
                    <span className="inline-flex items-center text-xs text-surface-500 dark:text-surface-400 gap-0.5">
                      {getCategoryIcon(task.category)}
                      <span className="hidden sm:inline">{TASK_CATEGORIES.find(c => c.id === task.category)?.name}</span>
                    </span>
                  </div>
                </div>
                
                {task.description && (
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 truncate">
                    {task.description}
                  </p>
                )}
              </div>
              
              <motion.button
                className="text-surface-400 hover:text-rose-500 dark:text-surface-500 dark:hover:text-rose-400 transition-colors"
                onClick={() => deleteTask(task.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Delete task"
              >
                <TrashIcon className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Add Task Modal */}
      <AnimatePresence>
        {showTaskModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTaskModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-surface-800 rounded-xl shadow-soft dark:shadow-neu-dark w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-lg font-semibold">Add New Task</h3>
                <motion.button
                  className="text-surface-400 hover:text-surface-600 dark:text-surface-500 dark:hover:text-surface-300"
                  onClick={() => setShowTaskModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XIcon className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Task Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newTask.title}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="What needs to be done?"
                    />
                    {formErrors.title && (
                      <p className="mt-1 text-sm text-rose-500">{formErrors.title}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={newTask.category}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="">Select a category</option>
                      {TASK_CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.category && (
                      <p className="mt-1 text-sm text-rose-500">{formErrors.category}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Priority
                    </label>
                    <div className="flex gap-4">
                      {PRIORITY_OPTIONS.map(priority => (
                        <label key={priority.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="priority"
                            value={priority.id}
                            checked={newTask.priority === priority.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <span 
                            className={`w-4 h-4 rounded-full ${priority.color} ${
                              newTask.priority === priority.id 
                                ? 'ring-2 ring-offset-2 ring-surface-400 dark:ring-surface-600' 
                                : ''
                            }`}
                          ></span>
                          <span className="text-sm">{priority.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newTask.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="input"
                      placeholder="Add details (optional)"
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <motion.button
                    className="btn btn-outline"
                    onClick={() => setShowTaskModal(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    className="btn btn-primary flex items-center gap-2"
                    onClick={addTask}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SaveIcon className="w-4 h-4" />
                    <span>Save Task</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainFeature;