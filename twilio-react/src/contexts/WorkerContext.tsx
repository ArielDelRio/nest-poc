import { createContext, useContext, useState } from 'react';

type WorkerContextType = {
  worker: {} | undefined;
  setWorker: React.Dispatch<React.SetStateAction<any>>;
};

const WorkerContext = createContext<WorkerContextType | undefined>(undefined);

export const useWorkerContext = () => {
  const context = useContext(WorkerContext);
  if (!context) {
    throw new Error(
      'useWorkerContext must be used within a WorkerContextProvider',
    );
  }
  return context;
};

type WorkerContextProviderProps = {
  children: React.ReactNode;
};

export const WorkerContextProvider = ({
  children,
}: WorkerContextProviderProps) => {
  const [worker, setWorker] = useState(undefined);

  return (
    <WorkerContext.Provider value={{ worker, setWorker }}>
      {children}
    </WorkerContext.Provider>
  );
};
