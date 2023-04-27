import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Twilio } from 'twilio';
import TwilioConfig from 'src/config/twilio.config';

@Injectable()
export class TwilioService {
  readonly twilio: Twilio;
  onTranscribe = new Subject();

  constructor() {
    const config = TwilioConfig();
    this.twilio = new Twilio(config.accountSid, config.authToken);
  }
}
