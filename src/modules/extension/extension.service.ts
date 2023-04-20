import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { twiml } from 'twilio';
import { ROUTES } from 'src/common/constants';

@Injectable()
export class ExtensionService {
  constructor(private readonly prismaService: PrismaService) {}

  async connect(digit: string) {
    const extensions = {
      2: 'Brodo',
      3: 'Dagobah',
      4: 'Oober',
    };

    const agent = await this.prismaService.agent.findUnique({
      where: {
        extension: extensions[digit],
      },
    });

    if (!agent) {
      return this.redirectToWelcome();
    }

    const voiceResponse = new twiml.VoiceResponse();

    voiceResponse.say(
      { voice: 'alice', language: 'en-GB' },
      "You'll be connected shortly to your planet.",
    );

    const dial = voiceResponse.dial({
      action: `${ROUTES.AGENTS.CALL.path}?agentId=${agent.id}`,
      callerId: agent?.phoneNumber,
    });

    dial.number(
      {
        url: ROUTES.AGENTS.SCREEN_CALL.path,
      },
      agent?.phoneNumber,
    );

    return voiceResponse.toString();
  }

  redirectToWelcome = () => {
    const voiceResponse = new twiml.VoiceResponse();
    voiceResponse.redirect(ROUTES.IVR_SCREEN_AND_RECORDING.WELCOME.path);

    return voiceResponse.toString();
  };

  async recordings(recordingOptions) {
    const agent = await this.prismaService.agent.findUnique({
      where: {
        id: +recordingOptions.agentId,
      },
    });

    const newRecording = {
      phoneNumber: recordingOptions.from,
      transcription: recordingOptions.transcriptionText,
      url: recordingOptions.recordingUrl,
    };

    /**
     * TODO:Store recording in database
     *
     */
    // agent.recordings.push({
    //   phoneNumber: recordingOptions.from,
    //   transcription: recordingOptions.transcriptionText,
    //   url: recordingOptions.recordingUrl,
    // });

    // return this.prismaService.agent.update({
    //   where: {
    //     id: +recordingOptions.agentId,
    //   },
    //   data: {
    //     recordings: agent.recordings,
    //   },
    // });

    return 'Recording created';
  }
}
