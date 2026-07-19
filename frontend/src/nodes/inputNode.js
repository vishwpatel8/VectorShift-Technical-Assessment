// inputNode.js

import { BaseNode } from "../components/BaseNode";
import { useNodeField } from "../hooks/useNodeField";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useNodeField(
    id,
    "inputName",
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useNodeField(
    id,
    "inputType",
    data?.inputType || "Text",
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode title="Input" outputs={[{ id: `${id}-value` }]}>
      <div>
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
        <label>
          Type:
          <select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
