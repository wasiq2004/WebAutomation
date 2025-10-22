import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export default function NodeTrigger({ data }: NodeProps) {
  // Get service information
  const getServiceInfo = () => {
    const services: Record<string, { color: string; icon: string; name: string }> = {
      gmail: { color: '#EA4335', icon: '📧', name: 'Gmail' },
      googleSheets: { color: '#34A853', icon: '📊', name: 'Google Sheets' },
      googleForms: { color: '#FBBC04', icon: '📝', name: 'Google Forms' },
      webhook: { color: '#4285F4', icon: '🔗', name: 'Webhook' },
      slack: { color: '#4A154B', icon: '💬', name: 'Slack' },
      discord: { color: '#5865F2', icon: '🎮', name: 'Discord' },
    };
    
    return services[data.service] || { color: '#3B82F6', icon: '⚡', name: 'Trigger' };
  };

  const serviceInfo = getServiceInfo();

  return (
    <div 
      className="px-4 py-3 bg-white border-2 rounded-lg shadow-md w-48"
      style={{ borderColor: serviceInfo.color }}
    >
      <div className="flex items-center">
        <div 
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: serviceInfo.color }}
        ></div>
        <div className="font-medium text-gray-800">{data.label}</div>
      </div>
      <div className="mt-1 flex items-center">
        <span className="text-lg mr-1">{serviceInfo.icon}</span>
        <span className="text-xs text-gray-500">{serviceInfo.name}</span>
      </div>
      {data.triggerType && (
        <div className="mt-1 text-xs text-gray-600 bg-gray-100 rounded px-2 py-1">
          {data.triggerType}
        </div>
      )}
      <div className="mt-2 text-xs text-gray-600">{data.description}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: serviceInfo.color }}
      />
    </div>
  );
}