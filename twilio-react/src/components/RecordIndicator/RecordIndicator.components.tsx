import { RecordIndicator } from './RecordIndicator.styles';
import cx from 'classnames';

interface RecordIndicatorProps {
  ready: boolean;
  isRecording?: boolean;
  toggleRecording: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

export default ({
  ready,
  isRecording,
  toggleRecording,
}: RecordIndicatorProps): JSX.Element => {
  const className = cx([{ ready, 'is-recording': isRecording }]);
  const tooltip = isRecording ? 'Recording' : ready ? 'Ready to Record' : '';

  return (
    <RecordIndicator
      title={tooltip}
      className={className}
      onClick={toggleRecording}
    />
  );
};
