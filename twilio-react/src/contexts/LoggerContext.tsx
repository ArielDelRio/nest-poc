import { createContext, useContext, useState } from 'react';

type LoggerContextType = {
  log: string;
  logger: (value: string) => void;
  clearLog: () => void;
};

const LoggerContext = createContext<LoggerContextType | undefined>(undefined);

export const useLoggerContext = () => {
  const context = useContext(LoggerContext);
  if (!context) {
    throw new Error(
      'useLoggerContext must be used within a UserContextProvider',
    );
  }
  return context;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const LoggerContextProvider = ({
  children,
}: UserContextProviderProps) => {
  const [log, setLog] = useState<string>('');

  const logger = (value: string) => {
    setLog((prev) => {
      console.log({ prev });
      return prev + '\n' + value;
    });
  };

  const clearLog = () => {
    setLog('');
  };

  return (
    <LoggerContext.Provider value={{ log, logger, clearLog }}>
      {children}
    </LoggerContext.Provider>
  );
};
