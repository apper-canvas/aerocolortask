import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  // Icon declarations
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const CloudOffIcon = getIcon('CloudOff');
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-8">
          <motion.div 
            className="p-4 bg-surface-100 dark:bg-surface-800 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <CloudOffIcon className="w-16 h-16 text-surface-400 dark:text-surface-300" />
          </motion.div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          404 - Page Not Found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-300 mb-8 text-lg">
          Oops! The page you're looking for seems to have vanished like a completed task.
        </p>
        
        <Link to="/">
          <motion.button 
            className="btn btn-primary inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Homepage
          </motion.button>
        </Link>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-20 md:h-32 bg-gradient-to-r from-primary/30 to-secondary/30 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    </div>
  );
}

export default NotFound;