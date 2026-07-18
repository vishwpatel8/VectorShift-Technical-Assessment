import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  title,
  children,
  inputs = [],
  outputs = [],
  className = '',
  style = {},
}) => {
  const renderHandles = (handles, type, position) =>
    handles.map(({ id, style: handleStyle }) => (
      <Handle
        key={id}
        type={type}
        position={position}
        id={id}
        style={handleStyle}
      />
    ));

  return (
    <div className={`base-node ${className}`.trim()} style={style}>
      <div className="node-title">{title}</div>
      <div className="node-content nodrag nowheel">{children}</div>
      {renderHandles(inputs, 'target', Position.Left)}
      {renderHandles(outputs, 'source', Position.Right)}
    </div>
  );
};
