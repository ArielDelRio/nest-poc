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
  CallPanelSectionContainer,
  CallPanelSectionHeader,
  CallPanelSectionMain,
  ErrorLabel,
  LabelInput,
  TelInput,
} from './CallPanelSection.styles';
import { IconButton, PanelButton } from '../PanelButton/PanelButton.style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { Call, CallError, Device } from '../../common/constants';

export const CallPanelSection = () => {
  const { logger } = useLoggerContext();

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
    });

    registerDeviceListeners(device, {
      logger,
      setCall,
    });

    setDevice(device);
  }, [sdkToken]);

  const handleRegister = () => {
    if (device?.state === 'registered') {
      logger('Device already registered');
      return;
    }

    device?.register();
  };

  const handleAcceptIncomingCall = () => {
    if (!call) return;
    call.accept();
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneToCallInput({ error: '', value: event.target.value });
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(?:\+?\d{1,3}[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneBlur = () => {
    if (!validatePhone(phoneToCallInput.value)) {
      setPhoneToCallInput({
        ...phoneToCallInput,
        error: 'Please enter a valid phone number',
      });
    }
  };

  const handleCall = async () => {
    logger(`Calling phone number ${phoneToCallInput.value}`);

    const call = await device?.connect({
      params: {
        To: phoneToCallInput.value,
      },
    });

    if (call) {
      registerCallEvents(call, {
        logger,
        setCall,
      });
    }
  };

  const handleHangUp = async () => {
    if (!call || call.status() === 'closed') return;

    if (call.status() === 'pending') {
      logger('Rejecting ...');
      call.reject();
    } else {
      logger('Hanging up ...');
      call.disconnect();
    }
  };

  return (
    <CallPanelSectionContainer>
      <CallPanelSectionHeader>
        <p>Call Panel</p>
        <ButtonsSectionHeader>
          <PanelButton onClick={handleRegister}>
            Allow Receive calls
          </PanelButton>
          <PanelButton
            onClick={handleAcceptIncomingCall}
            disabled={device?.state === 'unregistered'}
          >
            Accept incoming call
          </PanelButton>
        </ButtonsSectionHeader>
      </CallPanelSectionHeader>
      <CallPanelSectionMain>
        <div>
          <LabelInput htmlFor="numberToCall">Number to call</LabelInput>
          <TelInput
            id="numberToCall"
            type="tel"
            placeholder="1 555 555 1234"
            value={phoneToCallInput.value}
            onChange={handlePhoneChange}
            // onBlur={handlePhoneBlur}
          />

          {phoneToCallInput.error && (
            <ErrorLabel>{phoneToCallInput.error}</ErrorLabel>
          )}
        </div>
        <ButtonsSection>
          <IconButton onClick={handleCall}>
            <FontAwesomeIcon icon={faPhone} className="phone-icon" />
          </IconButton>
          <IconButton onClick={handleHangUp}>
            <FontAwesomeIcon icon={faPhoneSlash} className="phone-icon" />
          </IconButton>
        </ButtonsSection>
      </CallPanelSectionMain>
    </CallPanelSectionContainer>
  );
};
