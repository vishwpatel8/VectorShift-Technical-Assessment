// toolbar.js

import { DraggableNode } from './draggableNode';

const nodeGroups = [
  {
    title: 'Inputs',
    nodes: [
      { type: 'customInput', label: 'Input', icon: 'input' },
      { type: 'text', label: 'Text', icon: 'text' },
    ],
  },
  {
    title: 'AI',
    nodes: [
      { type: 'llm', label: 'LLM', icon: 'llm' },
      { type: 'promptTemplate', label: 'Prompt Template', icon: 'prompt' },
    ],
  },
  {
    title: 'Logic',
    nodes: [
      { type: 'condition', label: 'Condition', icon: 'condition' },
      { type: 'jsonParser', label: 'JSON Parser', icon: 'json' },
    ],
  },
  {
    title: 'Outputs',
    nodes: [
      { type: 'customOutput', label: 'Output', icon: 'output' },
    ],
  },
  {
    title: 'Integrations',
    nodes: [
      { type: 'customApiRequest', label: 'API Request', icon: 'api' },
      { type: 'email', label: 'Email', icon: 'email' },
    ],
  },
];

export const PipelineToolbar = () => {
  return (
    <aside className="node-sidebar">
      <div className="sidebar-heading">
        <span className="sidebar-kicker">Workflow tools</span>
        <h2>Nodes</h2>
      </div>
      <div className="node-groups">
        {nodeGroups.map((group) => (
          <section className="node-group" key={group.title}>
            <h3>{group.title}</h3>
            {group.nodes.map((node) => (
              <DraggableNode key={node.type} {...node} />
            ))}
          </section>
        ))}
      </div>
    </aside>
  );
};
