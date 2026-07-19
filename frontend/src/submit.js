// submit.js

import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error("The backend could not analyze the pipeline.");
      }

      const data = await response.json();
      alert(
        `Pipeline summary\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nDAG: ${data.is_dag ? "Yes" : "No"}`,
      );
    } catch (error) {
      alert(`Unable to submit pipeline: ${error.message}`);
    }
  };

  return (
    <button className="submit-button" type="button" onClick={handleSubmit}>
      Submit
    </button>
  );
};
