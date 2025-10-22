"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModalSupport() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Support button - only show on dashboard pages */}
      <AnimatePresence>
        {typeof window !== 'undefined' && window.location.pathname.includes('dashboard') && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-40 p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            aria-label="Support"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Support</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Need help with ZenFlow? Our support team is here to assist you.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Documentation:</span> Check our comprehensive guides
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Email:</span> support@zenflow.com
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <p className="ml-3 text-gray-700">
                        <span className="font-medium">Hours:</span> Mon-Fri, 9AM-5PM EST
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        window.open('mailto:support@zenflow.com', '_blank');
                        setIsOpen(false);
                      }}
                      className="w-full btn-primary"
                    >
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}