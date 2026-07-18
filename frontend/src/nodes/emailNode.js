import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const EmailNode = ({ id, data }) => {
  const [recipient, setRecipient] = useState(data?.recipient || 'recipient@example.com');
  const [subject, setSubject] = useState(data?.subject || 'Pipeline update');
  const [message, setMessage] = useState(data?.message || '');

  return (
    <BaseNode
      title="Email"
      inputs={[
        { id: `${id}-recipient`, style: { top: '28%' } },
        { id: `${id}-subject`, style: { top: '50%' } },
        { id: `${id}-message`, style: { top: '75%' } },
      ]}
      outputs={[{ id: `${id}-status` }]}
    >
      <label>
        To:
        <input type="email" value={recipient} onChange={(event) => setRecipient(event.target.value)} />
      </label>
      <label>
        Subject:
        <input type="text" value={subject} onChange={(event) => setSubject(event.target.value)} />
      </label>
      <label>
        Message:
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
    </BaseNode>
  );
};
