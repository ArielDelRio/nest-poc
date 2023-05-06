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
import {
  IconButton,
  PanelButton,
  RecordIndicator,
} from '../PanelButton/PanelButton.style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faPhoneSlash,
  faPhoneVolume,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

import { Call, Device } from '../../common/constants';

export const CallPanelSection = () => {
  const { logger } = useLoggerContext();

  const { token: sdkToken } = useFetchToken('voice');

  const [phoneToCallInput, setPhoneToCallInput] = useState({
    value: '',
    error: '',
  });
  const [device, setDevice] = useState<Device | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [record, setRecord] = useState(false);

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
      setRecord,
    });

    setDevice(device);
  }, [sdkToken]);

  const toggleRegister = () => {
    if (device?.state === 'registered') {
      device?.unregister();
    } else {
      device?.register();
    }
  };

  // const handlePingToServer = () => {
  //   if (!call || call.status() !== 'open') return;

  //   const messageObject = {
  //     content: {
  //       key1: 'This is a messsage from the client side',
  //       key2: JSON.stringify({ status: call.status() }),
  //     },
  //     messageType: 'user-defined-message',
  //     contentType: 'application/json',
  //   };

  //   call.sendMessage(messageObject);
  //   logger('Ping to server sent');
  // };

  const handleCall = async () => {
    // accept incoming call
    if (call && call.status() === 'pending') {
      call.accept();
      return;
    }

    // make a outgoing call
    logger(`Calling phone number ${phoneToCallInput.value}`);

    const newCall = await device?.connect({
      params: {
        To: phoneToCallInput.value,
        Record: record,
      },
    });

    if (newCall) {
      registerCallEvents(newCall, {
        logger,
        setCall,
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
    if (!call) return;

    if (call.isMuted()) {
      call.mute(false);
    } else {
      call.mute();
    }
  };

  const handleToggleRecording = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setRecord(!record);
    logger(`Recording call ${record ? 'stopped' : 'started'}`);
  };

  console.log({ device, call });

  return (
    <CallPanelSectionContainer>
      <CallPanelSectionHeader>
        <p>Call Panel</p>
        <ButtonsSectionHeader>
          <PanelButton
            onClick={toggleRegister}
            className={`status ${
              device?.state === 'registered' ? 'active' : 'inactive'
            }`}
          >
            {device?.state === 'registered'
              ? 'Status Active'
              : 'Status Inactive'}
          </PanelButton>
          {/* <PanelButton onClick={handlePingToServer} disabled={call === null}>
            Ping to Server
          </PanelButton> */}
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
                title={record ? 'Recording' : ''}
                className={`${record ? 'recording' : 'no-recording'}`}
                onClick={handleToggleRecording}
              ></RecordIndicator>
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
        <CallPanelControl>
          {/* <select title="Available Input Devices">
            {inputDevices?.map(([id, availableInputDevice]) => (
              <option key={id} value={id}>
                {availableInputDevice.label}
              </option>
            ))}
          </select> */}
        </CallPanelControl>
      </CallPanelSectionMain>
    </CallPanelSectionContainer>
  );
};
