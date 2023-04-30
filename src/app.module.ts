import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppConfig from 'src/config/app.config';
import TwilioConfig from './config/twilio.config';
import { AttachmentsModule } from './modules/attachments/attachments';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TwilioModule } from './modules/twilio/twilio.module';
import { VoiceModule } from './modules/voice/voice.module';
import { AgentsModule } from './modules/agents/agents.module';
import { ExtensionModule } from './modules/extension/extension.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'twilio-react', 'dist'),
    }),
    ConfigModule.forRoot({
      load: [AppConfig, TwilioConfig],
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
