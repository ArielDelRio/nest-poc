import { ROUTES } from 'src/common/constants';
import { IVRPhoneTreeService } from './ivrPhoneTree.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller(ROUTES.IVR_PHONE_TREE.base)
export class IVRPhoneTreeController {
  constructor(private readonly iVRPhoneTreeService: IVRPhoneTreeService) {}

  @Get(ROUTES.IVR_PHONE_TREE.WELCOME.base)
  welcome() {
    return this.iVRPhoneTreeService.welcome();
  }

  @Post(ROUTES.IVR_PHONE_TREE.MENU.base)
  menu(@Body('Digits') digit: string) {
    return this.iVRPhoneTreeService.menu(digit);
  }

  @Post(ROUTES.IVR_PHONE_TREE.PLANETS.base)
  planets(@Body('Digits') digit: string) {
    return this.iVRPhoneTreeService.planets(digit);
  }
}
