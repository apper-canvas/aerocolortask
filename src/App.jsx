import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import getIcon from './utils/iconUtils';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  
  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 z-10 p-3 rounded-full bg-surface-100 dark:bg-surface-800 shadow-card dark:shadow-neu-dark"
        onClick={toggleDarkMode}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? 
          <SunIcon className="w-5 h-5 text-yellow-400" /> : 
          <MoonIcon className="w-5 h-5 text-indigo-500" />
        }
      </motion.button>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
        toastClassName="rounded-xl shadow-soft"
      />
    </>
  );
}

export default App;