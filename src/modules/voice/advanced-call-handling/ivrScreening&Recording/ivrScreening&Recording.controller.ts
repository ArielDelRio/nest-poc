import { Body, Controller, Post } from '@nestjs/common';
import { IVRScreeningAndRecordingService } from './ivrScreening&Recording.service';
import { ROUTES } from 'src/common/constants';

@Controller(ROUTES.IVR_SCREEN_AND_RECORDING.base)
export class IVRScreeningAndRecordingController {
  constructor(
    private readonly iVRScreeningAndRecording: IVRScreeningAndRecordingService,
  ) {}

  @Post(ROUTES.IVR_SCREEN_AND_RECORDING.WELCOME.base)
  welcome() {
    console.log('welcome');
    return this.iVRScreeningAndRecording.welcome();
  }

  @Post(ROUTES.IVR_SCREEN_AND_RECORDING.MENU.base)
  menu(@Body('Digits') digits: string) {
    return this.iVRScreeningAndRecording.menu(digits);
  }
}
