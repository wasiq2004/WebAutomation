'use client';

import WorkflowCanvas from '@/components/WorkflowCanvas';

export default function NewFlowPage() {
  // For new flows, we don't pass a flowId, so it will start with an empty canvas
  return (
    <div className="h-[calc(100vh-200px)]">
      <WorkflowCanvas />
    </div>
  );
}