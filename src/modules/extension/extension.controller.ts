import { Body, Controller, Post, Query } from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { ROUTES } from 'src/common/constants';

@Controller('extension')
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) {}

  @Post(ROUTES.EXTENSION.CONNECT.base)
  connect(@Body('Digits') digits: string) {
    return this.extensionService.connect(digits);
  }

  @Post(ROUTES.EXTENSION.RECORDING.base)
  recording(@Query('agentId') agentId: string, @Body() body) {
    const { From, RecordingUrl, TranscriptionText } = body;

    const recordingOptions = {
      agentId,
      from: From,
      recordingUrl: RecordingUrl,
      transcriptionText: TranscriptionText,
    };

    return this.extensionService.recordings(recordingOptions);
  }
}
