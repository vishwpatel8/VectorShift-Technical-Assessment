// llmNode.js

import { BaseNode } from '../components/BaseNode';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode
      title="LLM"
      handles={[
        { type: 'target', id: `${id}-system`, style: { top: `${100 / 3}%` } },
        { type: 'target', id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
        { type: 'source', id: `${id}-response` },
      ]}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
