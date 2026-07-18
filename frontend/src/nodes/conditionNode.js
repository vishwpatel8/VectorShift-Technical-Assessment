import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || 'Equals');

  return (
    <BaseNode
      title="Condition"
      inputs={[{ id: `${id}-value` }]}
      outputs={[
        { id: `${id}-true`, style: { top: '35%' } },
        { id: `${id}-false`, style: { top: '65%' } },
      ]}
    >
      <label>
        Check:
        <select value={operator} onChange={(event) => setOperator(event.target.value)}>
          <option value="Equals">Equals</option>
          <option value="Contains">Contains</option>
          <option value="Is Empty">Is Empty</option>
        </select>
      </label>
    </BaseNode>
  );
};
