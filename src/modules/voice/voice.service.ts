import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TwilioService } from '../twilio/twilio.service';
import { take } from 'rxjs';
import { MakeCallDto } from './dto/MakeCall.dto';
import { Twilio, twiml } from 'twilio';
import { MODERATOR } from 'src/common/constants';

@Injectable()
export class VoiceService {
  private _callId: string;
  private twilio: Twilio;

  constructor(private readonly twilioService: TwilioService) {
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
      const voiceResponse = new twiml.VoiceResponse();

      const call = await this.twilio.calls.create({
        to,
        from,
        twiml: voiceResponse.say(message),
      });

      return call;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async holdCall() {
    const voiceResponse = new twiml.VoiceResponse();
    voiceResponse.say({ voice: 'alice' }, 'Please hold!');
    return voiceResponse.toString();
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
    const voiceResponse = new twiml.VoiceResponse();
    const sub$ = this.twilioService.onTranscribe
      .pipe(take(1))
      .subscribe((transcript: any) => {
        const message = transcript.text + 'Thank you. Goodbye';
        voiceResponse.say({ voice: 'alice' }, message);
        return voiceResponse.toString();
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
    const voiceResponse = new twiml.VoiceResponse();

    voiceResponse.say('Hello. Please leave a message after the beep.');

    voiceResponse.record({
      action: '/voice/handle-recording',
      method: 'POST',
      transcribe: true,
      playBeep: true,
    });

    voiceResponse.hangup();

    return voiceResponse.toString();
  }

  async createModeratedConference(from: string) {
    const voiceResponse = new twiml.VoiceResponse();
    const dial = voiceResponse.dial();
    const CONFERENCE_NAME = 'My conference';
    const isModerator = from === MODERATOR;

    dial.conference(
      {
        startConferenceOnEnter: true,
        endConferenceOnExit: isModerator,
      },
      CONFERENCE_NAME,
    );

    return voiceResponse.toString();
  }

  async interactiveVoiceResponse() {
    const voiceResponse = new twiml.VoiceResponse();

    const gather = voiceResponse.gather({
      numDigits: 1,
      action: '/voice/gather',
    });
    gather.say('For sales, press 1. For support, press 2.');

    voiceResponse.redirect('/voice/interactive-voice-response');

    return voiceResponse.toString();
  }

  async gather(Digits) {
    const voiceResponse = new twiml.VoiceResponse();
    console.log(typeof Digits);
    if (Digits) {
      console.log(`digits pressed ${Digits}`);
      switch (Digits) {
        case '1':
          voiceResponse.say('You selected sales. Good for you!');
          break;
        case '2':
          console.log('I am in 2');
          voiceResponse.say('You need support. We will help!');
          break;
        default:
          voiceResponse.say("Sorry, I don't understand that choice.");
          voiceResponse.pause();
          voiceResponse.redirect('/voice/interactive-voice-response');
          break;
      }
    } else {
      voiceResponse.redirect('/voice/interactive-voice-response');
    }
    return voiceResponse.toString();
  }

  async retrieveCallsList() {
    /**
     * Retrieve call by id
     */
    // return await this.twilio
    //   .calls('CAe1644a7eed5088b159577c5802d8be38')
    //   .fetch();

    /**
     * Retrieve calls by filters
     */
    // return await this.twilio.calls.list({
    //   status: 'busy',
    //   to: '+2347030000000',
    //   limit: 20,
    // });

    /**
     * Retrieve calls
     */
    return await this.twilio.calls.list();
  }
}
