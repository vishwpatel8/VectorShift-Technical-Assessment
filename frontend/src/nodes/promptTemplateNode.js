import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const PromptTemplateNode = ({ id, data }) => {
  const [template, setTemplate] = useState(data?.template || 'Summarize {{text}}');

  return (
    <BaseNode
      title="Prompt Template"
      inputs={[{ id: `${id}-variables` }]}
      outputs={[{ id: `${id}-prompt` }]}
    >
      <label>
        Template:
        <textarea value={template} onChange={(event) => setTemplate(event.target.value)} />
      </label>
    </BaseNode>
  );
};
