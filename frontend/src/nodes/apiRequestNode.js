// apiRequestNode.js

import { BaseNode } from "../components/BaseNode";
import { useNodeField } from "../hooks/useNodeField";

export const ApiRequestNode = ({ id, data }) => {
  const [method, setMethod] = useNodeField(id, "method", data?.method || "GET");
  const [url, setUrl] = useNodeField(
    id,
    "url",
    data?.url || "https://api.example.com",
  );
  const [headers, setHeaders] = useNodeField(
    id,
    "headers",
    data?.headers || "Content-Type: application/json",
  );
  const [body, setBody] = useNodeField(id, "body", data?.body || "");

  const updateField = (fieldName, setField) => (event) => {
    const value = event.target.value;
    setField(value);
  };

  return (
    <BaseNode
      title="API Request"
      inputs={[
        { id: `${id}-url`, style: { top: "28%" } },
        { id: `${id}-headers`, style: { top: "50%" } },
        { id: `${id}-body`, style: { top: "75%" } },
      ]}
      outputs={[
        { id: `${id}-response`, style: { top: "38%" } },
        { id: `${id}-status`, style: { top: "68%" } },
      ]}
    >
      <div>
        <label>
          Method:
          <select value={method} onChange={updateField("method", setMethod)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        <label>
          URL:
          <input type="url" value={url} onChange={updateField("url", setUrl)} />
        </label>
        <label>
          Headers:
          <input
            type="text"
            value={headers}
            onChange={updateField("headers", setHeaders)}
          />
        </label>
        <label>
          Body:
          <textarea value={body} onChange={updateField("body", setBody)} />
        </label>
      </div>
    </BaseNode>
  );
};
