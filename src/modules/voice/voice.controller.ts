import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { MakeCallDto } from './dto/MakeCall.dto';
import { VoiceService } from './voice.service';
import { TwilioEventsInterceptor } from 'src/interceptor/twilio-events.interceptor';
import { GatherDto } from './dto/Gather.dto';
import { RecordingDto } from './dto/Recording.dto';

@UseInterceptors(TwilioEventsInterceptor)
@Controller('voice')
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Post()
  async makeCall(@Body() makeCallDto: MakeCallDto) {
    const call = await this.voiceService.makeCall(makeCallDto);

    this.voiceService.callId = call.sid;

    return { call };
  }

  @Post('hold-call')
  async holdCall() {
    return this.voiceService.holdCall();
  }

  @Post('receive-call')
  async receiveCall() {
    // return this.voiceService.receiveCall();
    // return this.voiceService.createModeratedConference(body.From);
    return this.interactiveVoiceResponse();
  }

  @Post('handler-fail')
  async handlerFail() {
    console.log();
  }

  @Post('status-changes')
  async statusChanges() {
    console.log();
  }

  @Post('terminate-call')
  async terminateCall() {
    const terminateCall = await this.voiceService.terminateCall();
    console.log({ terminateCall });
    return terminateCall;
  }

  @Post('handle-recording')
  async handleRecording(@Body() recordingDto: RecordingDto): Promise<string> {
    const { recordingUrl, callSid } = recordingDto;
    console.log({ recordingUrl, callSid });
    return recordingUrl;
  }

  @Post('interactive-voice-response')
  async interactiveVoiceResponse() {
    return this.voiceService.interactiveVoiceResponse();
  }

  @Post('gather')
  async gather(@Body() gatherDto: GatherDto) {
    return this.voiceService.gather(gatherDto?.Digits);
  }
}
