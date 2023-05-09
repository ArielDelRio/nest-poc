import { createContext, useContext, useState } from 'react';
import { Record, RecordingState } from '../common/constants';
import { updateRecordingStatus } from '../services/recording';

export type RecordContextType = {
  record: Record;
  setRecord: React.Dispatch<React.SetStateAction<Record>>;
  toggleRecord: () => void;
  updateRecordStatusToggle: (callSid: string) => void;
  updateRecordState: (state: RecordingState) => void;
  startRecording: () => void;
  completeRecording: (mediaUrl: string) => void;
};

const RecordContext = createContext<RecordContextType>({
  record: {
    state: 'disabled',
    url: '',
    status: 'stopped',
  },
} as RecordContextType);

export const useRecordContext = () => {
  const context = useContext(RecordContext);
  if (!context) {
    throw new Error(
      'useRecordContext must be used within a RecordContextProvider',
    );
  }
  return context;
};

type RecordContextProviderProps = {
  children: React.ReactNode;
};

export const RecordContextProvider = ({
  children,
}: RecordContextProviderProps) => {
  const [record, setRecord] = useState<Record>({
    state: 'disabled',
    url: '',
    status: 'stopped',
  });

  const toggleRecord = () => {
    setRecord({
      ...record,
      state: record.state === 'ready' ? 'disabled' : 'ready',
    });
  };

  const updateRecordStatusToggle = async (callSid: string) => {
    const recording = await updateRecordingStatus(
      callSid,
      record.status === 'paused' ? 'in-progress' : 'paused',
    );

    setRecord({ ...record, status: recording.status });
  };

  const updateRecordState = (state: RecordingState) => {
    setRecord({ ...record, state });
  };

  const startRecording = () => {
    if (record.state === 'ready') {
      setRecord({ ...record, state: 'recording', status: 'in-progress' });
    }
  };

  const completeRecording = (mediaUrl: string) => {
    setRecord({
      ...record,
      status: 'completed',
      state: 'ready',
      url: mediaUrl,
    });
  };

  console.log('RecordContextProvider', { record });

  return (
    <RecordContext.Provider
      value={{
        record,
        setRecord,
        toggleRecord,
        updateRecordStatusToggle,
        updateRecordState,
        startRecording,
        completeRecording,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
};
