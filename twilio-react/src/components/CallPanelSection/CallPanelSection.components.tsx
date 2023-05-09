import { useEffect, useState } from 'react';
import {
  registerCallEvents,
  registerDeviceListeners,
} from '../../common/utils';
import { useLoggerContext } from '../../contexts/LoggerContext';
import { useFetchToken } from '../../hooks/useFetchToken';
import {
  ButtonsSection,
  ButtonsSectionHeader,
  CallPanelControl,
  CallPanelSectionContainer,
  CallPanelSectionHeader,
  CallPanelSectionMain,
  ErrorLabel,
  LabelInput,
  TelInput,
} from './CallPanelSection.styles';
import { IconButton, PanelButton } from '../PanelButton/PanelButton.style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faPhoneSlash,
  faPhoneVolume,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

import { Call, Device } from '../../common/constants';
import RecordIndicator from '../RecordIndicator/RecordIndicator.components';
import { RecordingSection } from '../RecordingSection/RecordingSection.components';
import { useRecordContext } from '../../contexts/RecordContext';

export const CallPanelSection = () => {
  const { logger } = useLoggerContext();

  const RecordContext = useRecordContext();

  const { record, startRecording, completeRecording } = RecordContext;

  const { token: sdkToken } = useFetchToken('voice');

  const [phoneToCallInput, setPhoneToCallInput] = useState({
    value: '',
    error: '',
  });

  const [device, setDevice] = useState<Device | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    // Can't import using npm current issue with vite and twilio https://github.com/twilio/twilio-voice.js/issues/76
    const device = new window.Twilio.Device(sdkToken, {
      // logLevel: 1,
      // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
      // providing better audio quality in restrained network conditions.
      codecPreferences: ['opus', 'pcmu'],
      closeProtection: true, // prevent users from closing the browser tab
    });

    registerDeviceListeners(device, {
      logger,
      setCall,
      RecordContext,
    });

    setDevice(device);
  }, [sdkToken]);

  const toggleRegister = () => {
    device?.state === 'registered' ? device?.unregister() : device?.register();
  };

  const handleCall = async () => {
    // accept incoming call
    if (call?.status() === 'pending') {
      call.accept();
      return;
    }

    // make a outgoing call
    logger(`Calling phone number ${phoneToCallInput.value}`);

    const newCall = await device?.connect({
      params: {
        To: phoneToCallInput.value,
        Record: JSON.stringify({ isRecording: record.state === 'ready' }),
      },
    });

    if (newCall) {
      registerCallEvents(newCall, {
        logger,
        setCall,
        RecordContext,
      });
    }
  };

  const handleHangUp = async () => {
    if (!device) return;

    if (!call) {
      // OutGoing call
      device.disconnectAll();
    } else if (call.status() !== 'closed') {
      // Incoming call
      if (call.status() === 'pending') {
        logger('Rejecting ...');
        call.reject();
      } else {
        logger('Hanging up ...');
        call.disconnect();
      }
    }
  };

  const handleMute = () => {
    call?.mute(!call.isMuted());
  };

  const handleToggleRecording = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    if (device?.state === 'unregistered') return;

    RecordContext.toggleRecord();
    logger(`Recording is ${record.state === 'ready' ? 'disabled' : 'ready'}`);
  };

  // console.log({ device, call, record });

  const status = device?.state === 'registered' ? 'active' : 'inactive';

  return (
    <CallPanelSectionContainer>
      <CallPanelSectionHeader>
        <p>Call Panel</p>
        <ButtonsSectionHeader>
          <PanelButton onClick={toggleRegister} className={`status ${status}`}>
            {`Status ${status}`}
          </PanelButton>
        </ButtonsSectionHeader>
      </CallPanelSectionHeader>
      <CallPanelSectionMain>
        <CallPanelControl>
          <div>
            <LabelInput htmlFor="numberToCall">Number to call</LabelInput>
            <TelInput
              id="numberToCall"
              type="tel"
              placeholder="1 555 555 1234"
              value={phoneToCallInput.value}
              onChange={(event) =>
                setPhoneToCallInput({ error: '', value: event.target.value })
              }
            />
            {phoneToCallInput.error && (
              <ErrorLabel>{phoneToCallInput.error}</ErrorLabel>
            )}
          </div>
          <ButtonsSection>
            <IconButton
              onClick={handleCall}
              disabled={device?.state === 'unregistered'}
            >
              <RecordIndicator
                ready={record.state === 'ready'}
                isRecording={record.state === 'recording'}
                toggleRecording={handleToggleRecording}
              />
              <FontAwesomeIcon icon={faPhone} className="phone-icon" />
            </IconButton>
            <IconButton
              onClick={handleHangUp}
              disabled={!device?.isBusy && call?.status() !== 'pending'}
            >
              <FontAwesomeIcon icon={faPhoneSlash} className="phone-icon" />
            </IconButton>
            <IconButton
              onClick={handleMute}
              disabled={!device?.isBusy && call?.status() !== 'pending'}
            >
              <FontAwesomeIcon
                icon={call?.isMuted() ? faVolumeMute : faPhoneVolume}
                className="phone-icon"
              />
            </IconButton>
          </ButtonsSection>
        </CallPanelControl>
        <RecordingSection
          callSid={call?.parameters?.CallSid || ''}
          isActiveCall={call?.status() === 'open'}
          isRecording={record.state === 'recording'}
          status={record.status}
        />
      </CallPanelSectionMain>
    </CallPanelSectionContainer>
  );
};
