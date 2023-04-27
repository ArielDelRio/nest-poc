import { IVRScreeningAndRecordingService } from './advanced-call-handling/ivrScreening&Recording/ivrScreening&Recording.service';
import { IVRScreeningAndRecordingController } from './advanced-call-handling/ivrScreening&Recording/ivrScreening&Recording.controller';
import { Module } from '@nestjs/common';
import { VoiceController } from './voice.controller';
import { VoiceService } from './voice.service';
import { TwilioModule } from '../twilio/twilio.module';
import { IVRPhoneTreeController } from './advanced-call-handling/ivrPhoneTree/ivrPhoneTree.controller';
import { IVRPhoneTreeService } from './advanced-call-handling/ivrPhoneTree/ivrPhoneTree.service';
import { QueueCallsService } from './advanced-call-handling/queueCalls/QueueCalls.service';
import { QueueCallsController } from './advanced-call-handling/queueCalls/QueueCalls.controller';
import { TaskRouterController } from './advanced-call-handling/taskRouter/TaskRouter.controller';
import { TaskRouterService } from './advanced-call-handling/taskRouter/TaskRouter.service';

@Module({
  imports: [TwilioModule],
  controllers: [
    VoiceController,
    IVRPhoneTreeController,
    IVRScreeningAndRecordingController,
    QueueCallsController,
    TaskRouterController,
  ],
  providers: [
    VoiceService,
    IVRPhoneTreeService,
    IVRScreeningAndRecordingService,
    QueueCallsService,
    TaskRouterService,
  ],
})
export class VoiceModule {}
