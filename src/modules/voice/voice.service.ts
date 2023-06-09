import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TwilioService } from '../twilio/twilio.service';
import { take } from 'rxjs';
import { MakeCallDto } from './dto/MakeCall.dto';
import { Twilio, jwt, twiml } from 'twilio';
import { MODERATOR } from 'src/common/constants';
import twilioConfig, { TwilioConfig } from 'src/config/twilio.config';
import { WorkspaceContext } from 'twilio/lib/rest/taskrouter/v1/workspace';
import { DialAttributes } from 'twilio/lib/twiml/VoiceResponse';
import { RecordingStatus } from 'twilio/lib/rest/api/v2010/account/call/recording';

@Injectable()
export class VoiceService {
  private _callId: string;
  private twilio: Twilio;
  private workspace: WorkspaceContext;
  private twilioConfig: TwilioConfig;

  constructor(private readonly twilioService: TwilioService) {
    this.twilioConfig = twilioConfig();
    this.twilio = this.twilioService.twilio;
    this.workspace = this.twilio.taskrouter.v1.workspaces(
      this.twilioConfig.workspaceSid,
    );
  }

  public get callId(): string {
    return this._callId;
  }

  public set callId(v: string) {
    this._callId = v;
  }

  async makeCall({ To, From, message }: MakeCallDto) {
    try {
      const voiceResponse = new twiml.VoiceResponse();

      const call = await this.twilio.calls.create({
        to: To,
        from: From,
        twiml: voiceResponse.say(message),
      });

      return call;
    } catch (error: any) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async receiveCall() {
    // return this.recordCall();
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

    const voiceResponse = new twiml.VoiceResponse();
    const dial = voiceResponse.dial();
    dial.client('Ariel');
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

  async tokenGenerator(workerSid) {
    try {
      const worker = await this.workspace.workers(workerSid).fetch();

      const grant = new jwt.AccessToken.VoiceGrant({
        outgoingApplicationSid: this.twilioConfig.twiMLAppSid,
        incomingAllow: true,
      });

      const accessToken = new jwt.AccessToken(
        this.twilioConfig.accountSid,
        this.twilioConfig.apiKey,
        this.twilioConfig.apiSecret,
        {
          identity: worker.friendlyName,
        },
      );

      accessToken.addGrant(grant);

      const token = accessToken.toJwt();

      return token;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async handleClientCall(callDto: any) {
    const { To, Record, callSid, queueName } = callDto;
    const callerId = this.twilioConfig.callerId;
    const voiceResponse = new twiml.VoiceResponse();

    const recordData = JSON.parse(Record || '{}');

    const dialSettings: DialAttributes = {
      // action: '/voice/handle-client-call-dial',
      timeout: 10,
      record: recordData?.isRecording
        ? 'record-from-ringing-dual'
        : 'do-not-record',
      // recordingStatusCallbackEvent: ['in-progress', 'completed'],
    };

    try {
      if (To === callerId) {
        const dial = voiceResponse.dial(dialSettings);

        dial.client('Ariel');
      } else if (To) {
        const dial = voiceResponse.dial({ ...dialSettings, callerId });

        const attr = /^[\d\+\-\(\) ]+$/.test(To) ? 'number' : 'client';

        if (attr === 'client') {
          // const conference = dial.conference(
          //   {
          //     startConferenceOnEnter: true,
          //     endConferenceOnExit: true,
          //     beep: 'false',
          //   },
          //   'My conference',
          // );

          // this.twilio.calls.create({
          //   to: `client:${To}`,
          //   from: callerId,
          //   callerId,
          //   twiml: conference.toString(),
          // });

          dial.client({}, To).parameter({
            name: 'Record',
            value: JSON.stringify({ isRecording: recordData?.isRecording }),
          });
        } else {
          dial.number(To);
        }
      } else if (queueName) {
        const dial = voiceResponse.dial({ ...dialSettings, callerId });

        const isMemberInQueue = this.connectToQueue(callSid, queueName);
        if (isMemberInQueue) dial.queue(queueName);
      } else {
        voiceResponse.say('Thanks for calling!');
      }

      return voiceResponse.toString();
    } catch (error: any) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async getRecordingsCalls(callSid: string) {
    return await this.twilio.recordings.list({ limit: 5 });
  }

  async updateRecordingStatus(callSid: string, status: RecordingStatus) {
    try {
      return await this.twilio
        .calls(callSid)
        .recordings('Twilio.CURRENT')
        .update({ status });
    } catch (error) {
      console.log(error);
    }
  }

  async holdCall(callSid: string) {
    const voiceResponse = new twiml.VoiceResponse();

    try {
      const callToHold = await this.findCallToHold(callSid);

      const queueName = `support-${callToHold.toFormatted}`;

      const queueToHoldTwiml = voiceResponse
        .enqueue(
          { waitUrl: 'https://demo.twilio.com/docs/voice.xml' },
          `${queueName}`,
        )
        .toString();

      callToHold.update({
        twiml: queueToHoldTwiml,
      });

      return {
        callSid: callToHold.sid,
        queueName,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findCallToHold(callSid: string) {
    const call = await this.twilio.calls(callSid).fetch();
    let callToHold;

    // outgoing call to hold
    if (call.direction === 'inbound') {
      callToHold = (
        await this.twilio.calls.list({ status: 'in-progress' })
      ).filter((call) => call.sid !== callSid)?.[0];
    }
    // incoming call to hold
    else {
      callToHold = await this.twilio.calls(call.parentCallSid).fetch();
    }

    return callToHold;
  }

  async connectToQueue(callSid: string, queueName = 'support') {
    const queue = (await this.twilio.queues.list()).find((queue) =>
      queue.friendlyName.includes(queueName),
    );
    if (queue) {
      // dial to queue
      const members = (await queue.members().list()).at(0);
      if (members === undefined) {
        queue.remove();
        return false;
      }
      return true;
    }
  }
}
