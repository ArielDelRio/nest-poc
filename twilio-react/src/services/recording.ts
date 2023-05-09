import axios from 'axios';
import config from '../common/config';
import { RecordingStatus } from '../common/constants';

export const fetchRecordings = async (callSid: string | undefined) => {
  const recording = await axios.post(
    `${config.nestHost}/voice/recordings-calls`,
    {
      callSid,
    },
  );

  return recording.data;
};

export const updateRecordingStatus = async (
  callSid: string | undefined,
  status: RecordingStatus,
) => {
  const recording = await axios.post(
    `${config.nestHost}/voice/update-recording-status`,
    {
      callSid,
      status,
    },
  );

  return recording.data;
};
