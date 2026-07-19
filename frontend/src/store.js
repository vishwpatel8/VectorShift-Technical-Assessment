// store.js

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
} from "reactflow";
import { create } from "zustand";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges,
      ),
    });
  },
  deleteElements: (nodeIds = [], edgeIds = []) => {
    set((state) => {
      const removableEdgeIds = new Set(edgeIds);

      state.edges.forEach((edge) => {
        if (nodeIds.includes(edge.source) || nodeIds.includes(edge.target)) {
          removableEdgeIds.add(edge.id);
        }
      });

      return {
        nodes: state.nodes.filter((node) => !nodeIds.includes(node.id)),
        edges: state.edges.filter((edge) => !removableEdgeIds.has(edge.id)),
      };
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
}));
