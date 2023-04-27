import { Injectable } from '@nestjs/common';
import { twiml } from 'twilio';
import { ReceiveCallDto } from '../../dto/ReceiveCall.dto';
import { agents } from './Agents';

@Injectable()
export class QueueCallsService {
  welcome(receiveCallDto: ReceiveCallDto) {
    console.log({ receiveCallDto });
    const voiceResponse = new twiml.VoiceResponse();

    const userRole = this.getRole(receiveCallDto.From);

    if (userRole === 'agent') {
      voiceResponse.redirect('/queue-calls/connect-call');
    }
    // client role
    else {
      const gather = voiceResponse.gather({
        action: '/queue-calls/menu',
        numDigits: 1,
        method: 'POST',
      });

      gather.say(
        'Thank you for calling to Telaclaims Insurance. Please press 1 to speak with an agent or press 2 to leave a message.',
      );
    }

    return voiceResponse.toString();
  }

  menu(digit) {
    const voiceResponse = new twiml.VoiceResponse();

    switch (digit) {
      case '1':
        voiceResponse.redirect('/queue-calls/call');
        break;
      case '2':
        voiceResponse.redirect('/agents/connectmessage');
        break;
      default:
        voiceResponse.say("Sorry, I don't understand that choice.");
        voiceResponse.hangup();
        break;
    }

    return voiceResponse.toString();
  }

  call() {
    const voiceResponse = new twiml.VoiceResponse();

    voiceResponse.say(
      'Please wait while we connect you to the next available agent.',
    );

    voiceResponse.enqueue('support');

    return voiceResponse.toString();
  }

  connectCall() {
    const voiceResponse = new twiml.VoiceResponse();
    const dial = voiceResponse.dial();
    dial.queue('support');
    voiceResponse.redirect('');

    return voiceResponse.toString();
  }

  getRole(from: string) {
    return (
      agents.find((agent) => agent.phoneNumber === from)?.role || undefined
    );
  }
}
