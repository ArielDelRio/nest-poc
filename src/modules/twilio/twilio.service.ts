import AppConfig from 'src/config/app.config';
import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  readonly twilio: Twilio;
  onTranscribe = new Subject();

  constructor() {
    const config = AppConfig();
    this.twilio = new Twilio(config.twilio.accountSid, config.twilio.authToken);
  }
}
