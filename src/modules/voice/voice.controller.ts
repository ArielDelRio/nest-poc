import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MakeCallDto } from './dto/MakeCall.dto';
import { VoiceService } from './voice.service';

@Controller('voice')
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async makeCall(@Body() makeCallDto: MakeCallDto) {
    const callSid = await this.voiceService.makeCall(
      makeCallDto.to,
      makeCallDto.from,
      makeCallDto.url,
    );
    return { callSid };
  }

  @Post('hold-call')
  async holdCall() {
    return this.voiceService.holdCall();
  }
}
