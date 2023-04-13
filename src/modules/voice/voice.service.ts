import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TwilioService } from '../twilio/twilio.service';
import { take } from 'rxjs';

@Injectable()
export class VoiceService {
  constructor(private readonly twilioService: TwilioService) {}
  async makeCall(to: string, from: string, url: string) {
    try {
      const call = await this.twilioService.client.calls.create({
        to,
        from,
        url,
      });

      return call.sid;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async holdCall() {
    this.twilioService.voiceResponse.say({ voice: 'alice' }, 'Please hold!');
    return this.twilioService.voiceResponse.toString();
  }

  async receiveCall() {
    // use twiml to greet the caller with a warm welcome message
    this.twilioService.voiceResponse.say(
      { voice: 'alice' },
      'Welcome, what would you like to know about our product?',
    );
    // record the call for transcription purposes
    this.twilioService.voiceResponse.record({
      action: '/exit-call',
      method: 'POST',
      timeout: 10,
      recordingStatusCallback: '/hold-call',
      recordingStatusCallbackMethod: 'POST',
      recordingStatusCallbackEvent: ['in-progress'],
      transcribeCallback: '/transcribe-call',
    });

    return this.twilioService.voiceResponse.toString();
  }

  async exitCall() {
    const sub$ = this.twilioService.onTranscribe
      .pipe(take(1))
      .subscribe((transcript: any) => {
        const message = transcript.text + 'Thank you. Goodbye';
        // use twiml to respond to user
        this.twilioService.voiceResponse.say({ voice: 'alice' }, message);
        // return xml response
        return this.twilioService.voiceResponse.toString();
      });
    // unsubscribe to avoid memory leak
    sub$.unsubscribe();
    return;
  }
}
