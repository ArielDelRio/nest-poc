import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppConfig from 'src/config/app.config';
import { AttachmentsModule } from './modules/attachments/attachments';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TwilioModule } from './modules/twilio/twilio.module';
import { VoiceModule } from './modules/voice/voice.module';
import { AgentsModule } from './modules/agents/agents.module';
import { ExtensionModule } from './modules/extension/extension.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      isGlobal: true,
    }),
    AttachmentsModule,
    PrismaModule,
    TwilioModule,
    VoiceModule,
    AgentsModule,
    ExtensionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
