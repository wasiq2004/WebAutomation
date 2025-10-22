"use client";

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  Connection,
  NodeProps,
  NodeTypes,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import NodeTrigger from './NodeTrigger';
import NodeAction from './NodeAction';

// Define service types
type ServiceType = 'gmail' | 'googleSheets' | 'googleForms' | 'webhook' | 'slack' | 'discord' | 'custom';

interface ServiceConfig {
  id: ServiceType;
  name: string;
  color: string;
  icon: string;
  triggers?: string[];
  actions?: string[];
}

const services: ServiceConfig[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    color: '#EA4335',
    icon: '📧',
    triggers: ['New Email', 'Email Received'],
    actions: ['Send Email', 'Reply to Email', 'Mark as Read']
  },
  {
    id: 'googleSheets',
    name: 'Google Sheets',
    color: '#34A853',
    icon: '📊',
    triggers: ['New Row', 'Updated Row'],
    actions: ['Create Row', 'Update Row', 'Delete Row']
  },
  {
    id: 'googleForms',
    name: 'Google Forms',
    color: '#FBBC04',
    icon: '📝',
    triggers: ['New Response'],
    actions: ['Create Form', 'Update Form']
  },
  {
    id: 'webhook',
    name: 'Webhook',
    color: '#4285F4',
    icon: '🔗',
    triggers: ['Incoming Webhook'],
    actions: ['Send Webhook']
  },
  {
    id: 'slack',
    name: 'Slack',
    color: '#4A154B',
    icon: '💬',
    triggers: ['New Message'],
    actions: ['Send Message', 'Post to Channel']
  },
  {
    id: 'discord',
    name: 'Discord',
    color: '#5865F2',
    icon: '🎮',
    triggers: ['New Message'],
    actions: ['Send Message']
  }
];

// Define custom node types
const nodeTypes: NodeTypes = {
  trigger: NodeTrigger,
  action: NodeAction,
};

// Initial empty nodes and edges for new flows
const initialEmptyNodes: Node[] = [];
const initialEmptyEdges: Edge[] = [];

export default function WorkflowCanvas({ flowId }: { flowId?: string }) {
  const [nodes, setNodes] = useState<Node[]>(initialEmptyNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEmptyEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [availableServices, setAvailableServices] = useState<ServiceConfig[]>(services);

  // Load flow data if flowId is provided
  useEffect(() => {
    if (flowId) {
      loadFlow(flowId);
    }
  }, [flowId]);

  const loadFlow = async (id: string) => {
    // In a real implementation, this would fetch from Supabase
    console.log(`Loading flow ${id}`);
    // For demo purposes, we'll just initialize with sample nodes
    const sampleNodes: Node[] = [
      {
        id: '1',
        type: 'trigger',
        position: { x: 250, y: 50 },
        data: { 
          label: 'Gmail Trigger', 
          description: 'When a new email arrives',
          service: 'gmail',
          triggerType: 'New Email'
        },
      },
      {
        id: '2',
        type: 'action',
        position: { x: 250, y: 200 },
        data: { 
          label: 'Google Sheets Action', 
          description: 'Add row to spreadsheet',
          service: 'googleSheets',
          actionType: 'Create Row'
        },
      }
    ];
    
    const sampleEdges: Edge[] = [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
      }
    ];
    
    setNodes(sampleNodes);
    setEdges(sampleEdges);
  };

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  const addServiceNode = useCallback((service: ServiceConfig, nodeType: 'trigger' | 'action') => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: nodeType,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { 
        label: `${service.name} ${nodeType === 'trigger' ? 'Trigger' : 'Action'}`, 
        description: nodeType === 'trigger' ? 'Trigger node' : 'Action node',
        service: service.id,
        [nodeType === 'trigger' ? 'triggerType' : 'actionType']: nodeType === 'trigger' ? service.triggers?.[0] : service.actions?.[0]
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes]);

  const updateNodeData = useCallback((id: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...data } } : node))
    );
  }, []);

  const deleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    if (selectedNode?.id === id) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  const runWorkflow = useCallback(() => {
    console.log('Running workflow with nodes:', nodes);
    console.log('Running workflow with edges:', edges);
    alert('Workflow executed! Check the console for details.');
  }, [nodes, edges]);

  const saveWorkflow = useCallback(async () => {
    if (!flowId) {
      alert('Please create or open a flow first');
      return;
    }
    
    // In a real implementation, this would save to Supabase
    console.log('Saving workflow:', { flowId, nodes, edges });
    alert('Workflow saved successfully!');
  }, [flowId, nodes, edges]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Workflow Builder</h2>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveWorkflow}
            className="btn-primary flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Save Flow
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runWorkflow}
            className="btn-primary flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Run Flow
          </motion.button>
        </div>
      </div>

      <div className="flex flex-1 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-medium text-gray-800 mb-3">Services</h3>
          <div className="space-y-2 mb-6">
            {availableServices.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center p-2">
                  <span className="mr-2 text-lg">{service.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{service.name}</span>
                </div>
                <div className="px-2 pb-2 space-y-1">
                  {service.triggers && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addServiceNode(service, 'trigger')}
                      className="w-full text-left px-2 py-1 text-xs bg-blue-50 hover:bg-blue-100 rounded text-blue-700"
                    >
                      + Add Trigger
                    </motion.button>
                  )}
                  {service.actions && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addServiceNode(service, 'action')}
                      className="w-full text-left px-2 py-1 text-xs bg-green-50 hover:bg-green-100 rounded text-green-700"
                    >
                      + Add Action
                    </motion.button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedNode && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-800 mb-3">Node Properties</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={selectedNode.data.label}
                    onChange={(e) => updateNodeData(selectedNode.id, { label: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={selectedNode.data.description}
                    onChange={(e) => updateNodeData(selectedNode.id, { description: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                  />
                </div>
                {selectedNode.data.service && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Service Type</label>
                    <select
                      value={selectedNode.data.triggerType || selectedNode.data.actionType || ''}
                      onChange={(e) => {
                        const service = availableServices.find(s => s.id === selectedNode.data.service);
                        if (selectedNode.type === 'trigger' && service?.triggers) {
                          updateNodeData(selectedNode.id, { triggerType: e.target.value });
                        } else if (selectedNode.type === 'action' && service?.actions) {
                          updateNodeData(selectedNode.id, { actionType: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {(selectedNode.type === 'trigger' 
                        ? availableServices.find(s => s.id === selectedNode.data.service)?.triggers 
                        : availableServices.find(s => s.id === selectedNode.data.service)?.actions
                      )?.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => deleteNode(selectedNode.id)}
                  className="w-full px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete Node
                </motion.button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background />
            <Panel position="top-right">
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-2 shadow-md">
                <p className="text-sm text-gray-700">Drag nodes to move them</p>
                <p className="text-sm text-gray-700">Click on nodes to select them</p>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}