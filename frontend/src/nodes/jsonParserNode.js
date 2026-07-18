import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const JsonParserNode = ({ id, data }) => {
  const [path, setPath] = useState(data?.path || 'data.items');

  return (
    <BaseNode
      title="JSON Parser"
      inputs={[{ id: `${id}-json` }]}
      outputs={[
        { id: `${id}-parsed`, style: { top: '35%' } },
        { id: `${id}-error`, style: { top: '65%' } },
      ]}
    >
      <label>
        Path:
        <input type="text" value={path} onChange={(event) => setPath(event.target.value)} />
      </label>
    </BaseNode>
  );
};
