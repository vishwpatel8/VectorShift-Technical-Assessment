// apiRequestNode.js

import { useState } from "react";
import { BaseNode } from '../components/BaseNode';

export const ApiRequestNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || "{{url}}");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <BaseNode
      title="API Request"
      handles={[{ type: 'source', id: `${id}-output` }]}
    >
      <div>
        <label>
          URL:
          <input type="text" value={url} onChange={handleUrlChange} />
        </label>
      </div>
    </BaseNode>
  );
};
