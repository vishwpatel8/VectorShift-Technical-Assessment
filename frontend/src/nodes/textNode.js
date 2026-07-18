// textNode.js

import { useEffect, useMemo, useState } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from '../components/BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = useMemo(() => {
    const matches = currText.matchAll(/\{\{\s*([A-Za-z_][A-Za-z0-9_]*)\s*\}\}/g);
    return [...new Set([...matches].map((match) => match[1]))];
  }, [currText]);

  const lines = currText.split('\n');
  const longestLine = Math.max(...lines.map((line) => line.length), 0);
  const nodeWidth = Math.min(420, Math.max(220, longestLine * 7 + 54));
  const textAreaHeight = Math.min(180, Math.max(58, lines.length * 22));

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, variables]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      title="Text"
      className="text-node"
      style={{ width: nodeWidth }}
      inputs={variables.map((variable, index) => ({
        id: `${id}-${variable}`,
        style: { top: `${((index + 1) / (variables.length + 1)) * 100}%` },
      }))}
      outputs={[{ id: `${id}-output` }]}
    >
      <label>
        Template:
        <textarea
          value={currText}
          onChange={handleTextChange}
          style={{ height: textAreaHeight }}
        />
      </label>
    </BaseNode>
  );
};
