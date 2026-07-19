// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useCallback, useRef, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import { shallow } from "zustand/shallow";
import { ApiRequestNode } from "./nodes/apiRequestNode";
import { ConditionNode } from "./nodes/conditionNode";
import { EmailNode } from "./nodes/emailNode";
import { InputNode } from "./nodes/inputNode";
import { JsonParserNode } from "./nodes/jsonParserNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { PromptTemplateNode } from "./nodes/promptTemplateNode";
import { TextNode } from "./nodes/textNode";
import { useStore } from "./store";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  customApiRequest: ApiRequestNode,
  condition: ConditionNode,
  email: EmailNode,
  jsonParser: JsonParserNode,
  promptTemplate: PromptTemplateNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  deleteElements: state.deleteElements,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteElements,
  } = useStore(selector, shallow);
  const [selectedNodeIds, setSelectedNodeIds] = useState([]);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState([]);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleSelectionChange = useCallback(
    ({ nodes: selectedNodes, edges: selectedEdges }) => {
      setSelectedNodeIds(selectedNodes.map((node) => node.id));
      setSelectedEdgeIds(selectedEdges.map((edge) => edge.id));
    },
    [],
  );

  const handleDeleteSelection = useCallback(() => {
    if (selectedNodeIds.length === 0 && selectedEdgeIds.length === 0) {
      return;
    }

    deleteElements(selectedNodeIds, selectedEdgeIds);
    setSelectedNodeIds([]);
    setSelectedEdgeIds([]);
  }, [deleteElements, selectedEdgeIds, selectedNodeIds]);

  return (
    <section className="canvas-panel" ref={reactFlowWrapper}>
      <button
        type="button"
        className="canvas-delete-button"
        onClick={handleDeleteSelection}
        disabled={selectedNodeIds.length === 0 && selectedEdgeIds.length === 0}
        title="Delete selected node or edge"
      >
        🗑️ Delete
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onSelectionChange={handleSelectionChange}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color="#cbd5e1" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </section>
  );
};
