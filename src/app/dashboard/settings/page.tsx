'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [teamMembers, setTeamMembers] = useState([
    { id: '1', email: 'admin@zenflow.com', role: 'Admin', status: 'Active' }
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Member');

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      // In a real app, this would clear data from Supabase
      alert('Data cleared successfully!');
    }
  };

  const handleAddTeamMember = () => {
    if (newMemberEmail && newMemberEmail.includes('@')) {
      const newMember = {
        id: `${teamMembers.length + 1}`,
        email: newMemberEmail,
        role: newMemberRole,
        status: 'Invited'
      };
      setTeamMembers([...teamMembers, newMember]);
      setNewMemberEmail('');
      setNewMemberRole('Member');
    }
  };

  const handleRemoveTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure your ZenFlow preferences</p>
        </div>
      </motion.div>

      <motion.div 
        className="card space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">General Settings</h2>
          
          <div className="space-y-4">
            <motion.div 
              className="flex items-center justify-between py-3 border-b border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div>
                <h3 className="font-medium text-gray-900">Theme</h3>
                <p className="text-sm text-gray-600">Select the theme for the application</p>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme('light')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Light
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme('dark')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Dark
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-between py-3 border-b border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div>
                <h3 className="font-medium text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">Enable or disable notifications</p>
              </div>
              <motion.label 
                className="relative inline-flex items-center cursor-pointer"
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
              </motion.label>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-between py-3 border-b border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div>
                <h3 className="font-medium text-gray-900">Auto Save</h3>
                <p className="text-sm text-gray-600">Automatically save workflows</p>
              </div>
              <motion.label 
                className="relative inline-flex items-center cursor-pointer"
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={() => setAutoSave(!autoSave)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
              </motion.label>
            </motion.div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Team Access</h2>
          
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="flex gap-2">
              <input
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Enter email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <select
                value={newMemberRole}
                onChange={(e) => setNewMemberRole(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddTeamMember}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
              >
                Add
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            className="responsive-table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamMembers.map((member, index) => (
                  <motion.tr 
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{member.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{member.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status-active">{member.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemoveTeamMember(member.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Remove
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Management</h2>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-900">Clear All Data</h3>
                <p className="text-sm text-gray-600">Delete all flows, runs, and issues</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearData}
                className="px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-red-600 hover:to-orange-600 transition-all"
              >
                Clear Data
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}