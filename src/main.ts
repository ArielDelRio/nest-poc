import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable CORS
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port || 3000);
  console.log('server started on port', port);
}
bootstrap();
