import { Module } from '@nestjs/common';
import { VoiceController } from './voice.controller';
import { VoiceService } from './voice.service';
import { TwilioModule } from '../twilio/twilio.module';
import { AdvancedCallHandlingController } from './advanced-call-handling/advanced-call-handling.controller';
import { AdvancedCallHandlingService } from './advanced-call-handling/advanced-call-handling.service';

@Module({
  imports: [TwilioModule],
  controllers: [VoiceController, AdvancedCallHandlingController],
  providers: [VoiceService, AdvancedCallHandlingService],
})
export class VoiceModule {}
