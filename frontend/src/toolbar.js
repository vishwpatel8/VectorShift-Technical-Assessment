// toolbar.js

import { useState } from "react";
import { DraggableNode } from "./draggableNode";

const nodeGroups = [
  {
    title: "Inputs",
    nodes: [
      { type: "customInput", label: "Input", icon: "input" },
      { type: "text", label: "Text", icon: "text" },
    ],
  },
  {
    title: "AI",
    nodes: [
      { type: "llm", label: "LLM", icon: "llm" },
      { type: "promptTemplate", label: "Prompt Template", icon: "prompt" },
    ],
  },
  {
    title: "Logic",
    nodes: [
      { type: "condition", label: "Condition", icon: "condition" },
      { type: "jsonParser", label: "JSON Parser", icon: "json" },
    ],
  },
  {
    title: "Outputs",
    nodes: [{ type: "customOutput", label: "Output", icon: "output" }],
  },
  {
    title: "Integrations",
    nodes: [
      { type: "customApiRequest", label: "API Request", icon: "api" },
      { type: "email", label: "Email", icon: "email" },
    ],
  },
];

export const PipelineToolbar = () => {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 768);

  return (
    <>
      <button
        type="button"
        className={`mobile-sidebar-toggle ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="node-sidebar-panel"
        aria-label={isOpen ? "Close node picker" : "Open node picker"}
      >
        <span aria-hidden="true">{isOpen ? "✕" : "＋"}</span>
      </button>
      <aside
        id="node-sidebar-panel"
        className={`node-sidebar ${isOpen ? "is-open" : "is-closed"}`}
      >
        <div className="sidebar-heading">
          <span className="sidebar-kicker">Workflow tools</span>
          <h2>Nodes</h2>
        </div>
        <div className="node-groups">
          {nodeGroups.map((group) => (
            <section className="node-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.nodes.map((node) => (
                <DraggableNode key={node.type} {...node} />
              ))}
            </section>
          ))}
        </div>
      </aside>
    </>
  );
};
