import AppConfig from 'src/config/app.config';
import { Injectable } from '@nestjs/common';
import { Twilio, twiml } from 'twilio';
import { Subject } from 'rxjs';

@Injectable()
export class TwilioService {
  readonly twilio: Twilio;
  readonly voiceResponse: twiml.VoiceResponse;
  onTranscribe = new Subject();

  constructor() {
    const config = AppConfig();
    this.twilio = new Twilio(config.twilio.accountSid, config.twilio.authToken);
    this.voiceResponse = new twiml.VoiceResponse();
  }
}
