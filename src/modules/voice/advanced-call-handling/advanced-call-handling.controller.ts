import { AdvancedCallHandlingService } from './advanced-call-handling.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('ivr')
export class AdvancedCallHandlingController {
  constructor(
    private readonly advancedCallHandlingService: AdvancedCallHandlingService,
  ) {}

  @Get('welcome')
  welcome() {
    return this.advancedCallHandlingService.welcome();
  }

  @Post('menu')
  menu(@Body('Digits') digit: string) {
    return this.advancedCallHandlingService.menu(digit);
  }

  @Post('planets')
  planets(@Body('Digits') digit: string) {
    return this.advancedCallHandlingService.planets(digit);
  }
}
