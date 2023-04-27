import { Body, Controller, Post } from '@nestjs/common';
import { QueueCallsService } from './QueueCalls.service';
import { ReceiveCallDto } from '../../dto/ReceiveCall.dto';

@Controller('queue-calls')
export class QueueCallsController {
  constructor(private readonly queueCallsService: QueueCallsService) {}

  @Post('welcome')
  welcome(@Body() receiveCallDto: ReceiveCallDto) {
    try {
      return this.queueCallsService.welcome(receiveCallDto);
    } catch (error) {
      console.log({ error });
    }
  }

  @Post('menu')
  menu(@Body('Digits') digit: string) {
    try {
      return this.queueCallsService.menu(digit);
    } catch (error) {
      console.log({ error });
    }
  }

  @Post('call')
  call() {
    try {
      return this.queueCallsService.call();
    } catch (error) {
      console.log({ error });
    }
  }

  @Post('connect-call')
  connectCall() {
    try {
      return this.queueCallsService.connectCall();
    } catch (error) {
      console.log({ error });
    }
  }
}
