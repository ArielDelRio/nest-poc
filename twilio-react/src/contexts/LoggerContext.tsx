import { createContext, useContext, useState } from 'react';

export type LogType = 'error' | 'info' | 'warning';

export type LoggerType = (
  value: JSX.Element | string,
  logType?: LogType,
) => void;

type LoggerContextType = {
  log: JSX.Element | string;
  logger: LoggerType;
  clearLog: () => void;
};

const LoggerContext = createContext<LoggerContextType>({} as LoggerContextType);

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
  const [log, setLog] = useState<JSX.Element | string>('');

  const logger = (value: JSX.Element | string, logType: LogType = 'info') => {
    const color =
      logType === 'error' ? 'red' : logType === 'warning' ? 'orange' : 'black';

    setLog((prev) => {
      return (
        <>
          <>{prev}</>
          <span style={{ color }}>
            <span>{'> '}</span>
            {value}
          </span>
          <br />
        </>
      );
    });
  };

  const clearLog = () => {
    setLog(<></>);
  };

  return (
    <LoggerContext.Provider value={{ log, logger, clearLog }}>
      {children}
    </LoggerContext.Provider>
  );
};
