'use client';

import { motion } from 'framer-motion';

const connections = [
  {
    id: '1',
    name: 'Slack',
    description: 'Connect to Slack for notifications and updates',
    icon: '💬',
    connected: true
  },
  {
    id: '2',
    name: 'Gmail',
    description: 'Send and receive emails through Gmail',
    icon: '📧',
    connected: false
  },
  {
    id: '3',
    name: 'Webhook',
    description: 'Connect to any service via webhook',
    icon: '🔗',
    connected: false
  },
  {
    id: '4',
    name: 'GitHub',
    description: 'Integrate with GitHub for code repositories',
    icon: '💻',
    connected: true
  },
  {
    id: '5',
    name: 'Trello',
    description: 'Sync with Trello boards and cards',
    icon: '📋',
    connected: false
  },
  {
    id: '6',
    name: 'Google Drive',
    description: 'Access and manage Google Drive files',
    icon: '💾',
    connected: false
  }
];

export default function ConnectionsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Connections</h1>
          <p className="text-gray-600 mt-1">Manage your service integrations</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection, index) => (
          <motion.div
            key={connection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="card flex flex-col h-full"
          >
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4">{connection.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{connection.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{connection.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              {connection.connected ? (
                <span className="status-active flex items-center">
                  <span className="text-lg mr-1">✅</span> Connected
                </span>
              ) : (
                <span className="status-inactive flex items-center">
                  <span className="text-lg mr-1">❌</span> Not connected
                </span>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  connection.connected
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                }`}
              >
                {connection.connected ? 'Disconnect' : 'Connect'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}