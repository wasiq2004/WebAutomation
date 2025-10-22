'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import WorkflowCanvas from '@/components/WorkflowCanvas';

export default function EditFlowPage() {
  const params = useParams();
  const { id } = params;
  const [flowName, setFlowName] = useState('');

  useEffect(() => {
    // In a real app, we would fetch the flow data from Supabase
    // For now, we'll just set a placeholder name
    setFlowName(`Flow ${id}`);
  }, [id]);

  return (
    <div className="h-[calc(100vh-200px)]">
      <div className="mb-4">
        <input
          type="text"
          value={flowName}
          onChange={(e) => setFlowName(e.target.value)}
          className="text-2xl font-bold text-gray-800 bg-transparent border-none focus:outline-none focus:ring-0"
        />
      </div>
      <WorkflowCanvas flowId={id as string} />
    </div>
  );
}