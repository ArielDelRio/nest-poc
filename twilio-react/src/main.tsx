import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { LoggerContextProvider } from './contexts/LoggerContext.tsx';
import { WorkerContextProvider } from './contexts/WorkerContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoggerContextProvider>
      <WorkerContextProvider>
        <App />
      </WorkerContextProvider>
    </LoggerContextProvider>
  </React.StrictMode>,
);
