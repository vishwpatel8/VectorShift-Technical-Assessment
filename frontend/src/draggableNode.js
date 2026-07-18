// draggableNode.js

const iconPaths = {
  input: ['M12 3v10', 'm8 9 4 4 4-4', 'M5 15v4h14v-4'],
  text: ['M6 3h9l3 3v15H6z', 'M9 11h6', 'M9 15h6'],
  llm: ['M7 8h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z', 'M9 4v4M15 4v4M8 14h.01M16 14h.01', 'M10 18h4'],
  prompt: ['M6 3h9l3 3v15H6z', 'M9 11h6M9 15h4', 'M15 3v4h4'],
  condition: ['M4 4v16', 'M4 8h10', 'm-3-3 3 3-3 3', 'M4 16h10', 'm-3-3 3 3-3 3'],
  json: ['M9 4c-2 0-2 2-2 4v2c0 1-1 2-2 2 1 0 2 1 2 2v2c0 2 0 4 2 4', 'M15 4c2 0 2 2 2 4v2c0 1 1 2 2 2-1 0-2 1-2 2v2c0 2 0 4-2 4'],
  output: ['M5 15v4h14v-4', 'M12 13V3', 'm8 7 4-4 4 4'],
  api: ['M4 5h6v14H4z', 'M14 8h6v8h-6z', 'M10 12h6', 'm-3-3 3 3-3 3'],
  email: ['M4 6h16v12H4z', 'm4 8 8 6 8-6'],
};

const NodeIcon = ({ name }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {(iconPaths[name] || []).map((path) => <path d={path} key={path} />)}
  </svg>
);

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="sidebar-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <span className="node-icon"><NodeIcon name={icon} /></span>
      <span>{label}</span>
    </div>
  );
};
