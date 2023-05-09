import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CallPanelControl } from '../CallPanelSection/CallPanelSection.styles';
import { RecordingStatus } from '../../common/constants';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../PanelButton/PanelButton.style';
import { useRecordContext } from '../../contexts/RecordContext';

interface RecordingSectionProps {
  callSid: string;
  isActiveCall: boolean;
  isRecording: boolean;
  status: RecordingStatus;
}

export const RecordingSection = ({
  callSid,
  isActiveCall,
  isRecording,
  status,
}: RecordingSectionProps) => {
  if (!isActiveCall || !isRecording) return null;

  const { updateRecordStatusToggle } = useRecordContext();

  return (
    <CallPanelControl>
      <p>Recording...</p>
      <IconButton onClick={() => updateRecordStatusToggle(callSid)}>
        <FontAwesomeIcon
          icon={status === 'in-progress' ? faPause : faPlay}
          className={`phone-icon ${
            status === 'in-progress' ? 'fa-pause' : 'fa-play'
          }`}
        />
      </IconButton>
    </CallPanelControl>
  );
};
