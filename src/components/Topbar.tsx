"use client";

import { motion } from "framer-motion";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between h-20 px-6 bg-white bg-opacity-90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mr-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3 shadow-md">
            <span className="text-white font-bold text-lg">Z</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ZenFlow</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Wasiq's Project</h2>
      </motion.div>
      
      <motion.div 
        className="flex items-center space-x-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.button 
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-all"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Invite Member
        </motion.button>
        <motion.button 
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-all"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          View Usage
        </motion.button>
        <motion.button 
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-all"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Platform Admin
        </motion.button>
        <motion.div 
          className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          W
        </motion.div>
      </motion.div>
    </div>
  );
}