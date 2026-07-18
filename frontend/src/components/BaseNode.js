import { Handle, Position } from 'reactflow';

const defaultHandlePosition = {
  source: Position.Right,
  target: Position.Left,
};

export const BaseNode = ({
  title,
  children,
  handles = [],
  className = '',
  style = {},
}) => {
  const nodeStyle = {
    width: 200,
    minHeight: 80,
    border: '1px solid black',
    background: '#fff',
    padding: '8px',
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <div className={className} style={nodeStyle}>
      <div>{title}</div>
      <div>{children}</div>
      {handles.map(({ type, position, id, style: handleStyle }) => (
        <Handle
          key={id}
          type={type}
          position={position || defaultHandlePosition[type]}
          id={id}
          style={handleStyle}
        />
      ))}
    </div>
  );
};
