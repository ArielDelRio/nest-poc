import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TwilioService } from '../twilio/twilio.service';
import { take } from 'rxjs';
import { MakeCallDto } from './dto/MakeCall.dto';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { Twilio } from 'twilio';
import { MODERATOR } from 'src/common/constants';

@Injectable()
export class VoiceService {
  private _callId: string;
  private voiceResponse: VoiceResponse;
  private twilio: Twilio;

  constructor(private readonly twilioService: TwilioService) {
    this.voiceResponse = this.twilioService.voiceResponse;
    this.twilio = this.twilioService.twilio;
  }

  public get callId(): string {
    return this._callId;
  }

  public set callId(v: string) {
    this._callId = v;
  }

  async makeCall({ to, from, message }: MakeCallDto) {
    try {
      const twiml = this.voiceResponse.say(message);

      const call = await this.twilio.calls.create({
        to,
        from,
        twiml,
      });

      return call;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async holdCall() {
    this.voiceResponse.say({ voice: 'alice' }, 'Please hold!');
    return this.voiceResponse.toString();
  }

  async receiveCall() {
    return this.recordCall();
    // this.voiceResponse.say(
    //   { voice: 'alice' },
    //   'Welcome, what would you like to know about our product?',
    // );

    // this.voiceResponse.record({
    //   action: '/exit-call',
    //   method: 'POST',
    //   timeout: 10,
    //   recordingStatusCallback: '/hold-call',
    //   recordingStatusCallbackMethod: 'POST',
    //   recordingStatusCallbackEvent: ['in-progress'],
    //   transcribeCallback: '/transcribe-call',
    // });
  }

  async exitCall() {
    const sub$ = this.twilioService.onTranscribe
      .pipe(take(1))
      .subscribe((transcript: any) => {
        const message = transcript.text + 'Thank you. Goodbye';
        this.voiceResponse.say({ voice: 'alice' }, message);
        return this.voiceResponse.toString();
      });
    // unsubscribe to avoid memory leak
    sub$.unsubscribe();
    return;
  }

  async terminateCall() {
    const call = await this.twilio
      .calls(this._callId)
      .update({ status: 'completed' });

    return call.status === 'canceled';
  }

  async recordCall() {
    this.voiceResponse.say('Hello. Please leave a message after the beep.');

    this.voiceResponse.record({
      action: '/voice/handle-recording',
      method: 'POST',
      transcribe: true,
      playBeep: true,
    });

    this.voiceResponse.hangup();

    return this.voiceResponse.toString();
  }

  async createModeratedConference(from: string) {
    const dial = this.voiceResponse.dial();
    const CONFERENCE_NAME = 'My conference';
    const isModerator = from === MODERATOR;

    dial.conference(
      {
        startConferenceOnEnter: true,
        endConferenceOnExit: isModerator,
      },
      CONFERENCE_NAME,
    );

    return this.voiceResponse.toString();
  }

  async interactiveVoiceResponse() {
    const gather = this.voiceResponse.gather({
      numDigits: 1,
      action: '/voice/gather',
    });
    gather.say('For sales, press 1. For support, press 2.');

    this.voiceResponse.redirect('/voice/interactive-voice-response');

    return this.voiceResponse.toString();
  }

  async gather(Digits) {
    console.log(Digits);
    if (Digits) {
      console.log(`digits pressed ${Digits}`);
      switch (Digits) {
        case '1':
          this.voiceResponse.say('You selected sales. Good for you!');
          break;
        case '2':
          console.log('I am in 2');
          this.voiceResponse.say('You need support. We will help!');
          break;
        default:
          this.voiceResponse.say("Sorry, I don't understand that choice.");
          this.voiceResponse.pause();
          this.voiceResponse.redirect('/voice/interactive-voice-response');
          break;
      }
    } else {
      this.voiceResponse.redirect('/voice/interactive-voice-response');
    }
    return this.voiceResponse.toString();
  }
}
