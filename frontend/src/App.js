import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <img src="/vectorshift-wordmark.png" alt="VectorShift" />
          <span>Workflow Builder</span>
        </div>
        <SubmitButton />
      </header>
      <main className="workspace">
        <PipelineToolbar />
        <PipelineUI />
      </main>
    </div>
  );
}

export default App;
