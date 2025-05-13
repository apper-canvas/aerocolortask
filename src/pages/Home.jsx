import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

function Home() {
  const [todayDate, setTodayDate] = useState('');
  const [greeting, setGreeting] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Icon declarations
  const ChevronRightIcon = getIcon('ChevronRight');
  const SunIcon = getIcon('Sun');
  const SunriseIcon = getIcon('Sunrise');
  const MoonIcon = getIcon('Moon');
  const ListTodoIcon = getIcon('ListTodo');
  const CalendarIcon = getIcon('Calendar');
  
  useEffect(() => {
    // Set today's date
    setTodayDate(format(new Date(), 'EEEE, MMMM d, yyyy'));
    
    // Set greeting based on time of day
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good morning');
    } else if (hours < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
    
    // Hide welcome message after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Get appropriate icon based on time of day
  const getGreetingIcon = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return <SunriseIcon className="w-6 h-6 text-amber-500" />;
    } else if (hours < 18) {
      return <SunIcon className="w-6 h-6 text-amber-500" />;
    } else {
      return <MoonIcon className="w-6 h-6 text-indigo-400" />;
    }
  };
  
  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary to-secondary"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="text-4xl md:text-6xl font-bold text-white text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <span className="text-6xl md:text-8xl">🎨</span>
              </div>
              <h1 className="text-shadow">ColorTask</h1>
              <p className="text-lg md:text-xl mt-4 font-normal opacity-90">Organize your day colorfully</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <header className="bg-gradient-to-r from-primary to-secondary py-6 md:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-white"
          >
            <div className="flex items-center space-x-2 mb-1">
              {getGreetingIcon()}
              <h2 className="text-xl md:text-2xl font-medium">{greeting}!</h2>
            </div>
            <p className="text-white/80 text-sm md:text-base">{todayDate}</p>
          </motion.div>
          
          <motion.div 
            className="flex items-center mt-8 gap-3 overflow-x-auto pb-2 scrollbar-hide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
              <ListTodoIcon className="w-4 h-4" />
              <span>Today's Tasks</span>
            </button>
            
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
              <CalendarIcon className="w-4 h-4" />
              <span>This Week</span>
            </button>
            
            <button className="bg-white/10 hover:bg-white/20 transition-colors text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
              Completed
            </button>
            
            <button className="bg-white/10 hover:bg-white/20 transition-colors text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
              Important
            </button>
          </motion.div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-surface-800 dark:text-surface-100">
              Let's get things done today
            </h2>
            
            <button 
              className="flex items-center text-sm text-primary-dark dark:text-primary-light hover:underline font-medium"
              onClick={() => toast.info("Coming soon: Weekly view")}
            >
              <span>Weekly view</span>
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="mt-4">
            <MainFeature />
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default Home;