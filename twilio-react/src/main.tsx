import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { LoggerContextProvider } from './contexts/LoggerContext.tsx';
import { WorkerContextProvider } from './contexts/WorkerContext.tsx';
import { RecordContextProvider } from './contexts/RecordContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <LoggerContextProvider>
    <WorkerContextProvider>
      <RecordContextProvider>
        <App />
      </RecordContextProvider>
    </WorkerContextProvider>
  </LoggerContextProvider>,
);
