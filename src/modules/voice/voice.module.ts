import { IVRScreeningAndRecordingService } from './advanced-call-handling/ivrScreening&Recording/ivrScreening&Recording.service';
import { IVRScreeningAndRecordingController } from './advanced-call-handling/ivrScreening&Recording/ivrScreening&Recording.controller';
import { Module } from '@nestjs/common';
import { VoiceController } from './voice.controller';
import { VoiceService } from './voice.service';
import { TwilioModule } from '../twilio/twilio.module';
import { IVRPhoneTreeController } from './advanced-call-handling/ivrPhoneTree/ivrPhoneTree.controller';
import { IVRPhoneTreeService } from './advanced-call-handling/ivrPhoneTree/ivrPhoneTree.service';

@Module({
  imports: [TwilioModule],
  controllers: [
    VoiceController,
    IVRPhoneTreeController,
    IVRScreeningAndRecordingController,
  ],
  providers: [
    VoiceService,
    IVRPhoneTreeService,
    IVRScreeningAndRecordingService,
  ],
})
export class VoiceModule {}
