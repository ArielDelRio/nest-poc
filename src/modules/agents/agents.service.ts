import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { twiml } from 'twilio';
import { ROUTES } from 'src/common/constants';

@Injectable()
export class AgentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.agent.findMany();
  }

  async call(callStatus: string, agentId: string) {
    const voiceResponse = new twiml.VoiceResponse();
    if (callStatus === 'completed') {
      return 'Call completed';
    }

    voiceResponse.say(
      { voice: 'alice', language: 'en-GB' },
      `It appears that no agent is available. Please leave a message after the beep`,
    );

    voiceResponse.record({
      maxLength: 20,
      action: ROUTES.AGENTS.HANGUP.path,
      transcribeCallback: `${ROUTES.EXTENSION.RECORDING.path}?agentId=${agentId}`,
    });

    voiceResponse.say(
      { voice: 'alice', language: 'en-GB' },
      'No record received. Goodbye',
    );

    voiceResponse.hangup();

    return voiceResponse.toString();
  }

  async hangup() {
    const voiceResponse = new twiml.VoiceResponse();
    voiceResponse.say(
      { voice: 'alice', language: 'en-GB' },
      'Thank you for your message. Goodbye',
    );
    voiceResponse.hangup();
    return voiceResponse.toString();
  }

  async screenCall(from) {
    const voiceResponse = new twiml.VoiceResponse();

    const gather = voiceResponse.gather({
      action: ROUTES.AGENTS.CONNECT_MESSAGE.path,
      numDigits: 1,
    });

    gather.say(from.split('').join(','));
    gather.say('Press any key to accept');

    voiceResponse.say('Sorry. Did not get your response');
    voiceResponse.hangup();

    return voiceResponse.toString();
  }

  async connectMessage() {
    const voiceResponse = new twiml.VoiceResponse();
    voiceResponse.say('Connecting you to the extraterrestrial in distress');
    return voiceResponse.toString();
  }
}
