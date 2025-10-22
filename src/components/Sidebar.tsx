"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navigation = [
  { name: "Flows", href: "/dashboard/flows", icon: "🔄" },
  { name: "Runs", href: "/dashboard/runs", icon: "⚡" },
  { name: "Issues", href: "/dashboard/issues", icon: "⚠️" },
  { name: "Connections", href: "/dashboard/connections", icon: "🔗" },
  { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  { name: "Support", href: "#", icon: "💬" }, // This will open the modal
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white bg-opacity-90 backdrop-blur-lg border-r border-gray-200 w-64 shadow-xl">
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3 shadow-md">
            <span className="text-white font-bold text-lg">Z</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ZenFlow</h1>
        </motion.div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                pathname === item.href
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
              }`}
            >
              <span className="text-lg mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </motion.div>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="font-bold text-gray-800 mb-1">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-3">Our support team is here for you</p>
          <button className="w-full py-2 bg-white text-blue-600 font-medium rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
}