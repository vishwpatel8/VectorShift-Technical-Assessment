import { useCallback, useEffect, useState } from "react";
import { useStore } from "../store";

export const useNodeField = (nodeId, fieldName, initialValue) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const nodeData = useStore(
    (state) => state.nodes.find((node) => node.id === nodeId)?.data,
  );

  const [value, setValue] = useState(
    () => nodeData?.[fieldName] ?? initialValue,
  );

  useEffect(() => {
    const storeValue = nodeData?.[fieldName];

    if (storeValue !== undefined && storeValue !== value) {
      setValue(storeValue);
      return;
    }

    if (storeValue === undefined) {
      updateNodeField(nodeId, fieldName, value);
    }
  }, [fieldName, nodeId, nodeData, updateNodeField, value]);

  const setSyncedValue = useCallback(
    (nextValue) => {
      setValue(nextValue);
      updateNodeField(nodeId, fieldName, nextValue);
    },
    [fieldName, nodeId, updateNodeField],
  );

  return [value, setSyncedValue];
};
