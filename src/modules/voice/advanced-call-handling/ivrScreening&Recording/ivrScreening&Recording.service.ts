import { Injectable } from '@nestjs/common';
import { ROUTES } from 'src/common/constants';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { twiml } from 'twilio';

@Injectable()
export class IVRScreeningAndRecordingService {
  constructor(private readonly prismaService: PrismaService) {}

  // WELCOME
  welcome() {
    const voiceResponse = new twiml.VoiceResponse();
    const gather = voiceResponse.gather({
      action: ROUTES.IVR_SCREEN_AND_RECORDING.MENU.path,
      numDigits: 1,
    });

    gather.play(
      { loop: 3 },
      'https://can-tasty-8188.twil.io/assets/et-phone.mp3',
    );

    return voiceResponse.toString();
  }

  // MENU
  menu(digits) {
    const optionActions = {
      1: this.returnInstructions,
      2: this.planets,
    };

    const action = optionActions[digits] || this.redirectWelcome;
    return action().toString();
  }

  returnInstructions = function () {
    const voiceResponse = new twiml.VoiceResponse();
    voiceResponse.say(
      { voice: 'alice', language: 'en-GB' },
      'To get to your extraction point, get on your bike and go down ' +
        'the street. Then Left down an alley. Avoid the police cars.' +
        ' Turn left into an unfinished housing development. Fly over ' +
        'the roadblock. Go passed the moon. Soon after you will see ' +
        'your mother ship.',
    );
    voiceResponse.say(
      'Thank you for calling the ET Phone Home Service - the ' +
        "adventurous alien's first choice in intergalactic travel",
    );
    voiceResponse.hangup();

    return voiceResponse;
  };

  planets = () => {
    const voiceResponse = new twiml.VoiceResponse();
    const gather = voiceResponse.gather({
      action: ROUTES.EXTENSION.CONNECT.path,
      numDigits: 1,
    });

    gather.say(
      { voice: 'alice', language: 'en-GB', loop: 3 },
      'To call the planet Broh doe As O G, press 2. To call the ' +
        'planet DuhGo bah, press 3. To call an oober asteroid to your ' +
        'location, press 4. To go back to the main menu, press ' +
        'the star key ',
    );

    return voiceResponse.toString();
  };

  redirectWelcome() {
    const voiceResponse = new twiml.VoiceResponse();
    voiceResponse.redirect(ROUTES.IVR_PHONE_TREE.WELCOME.path);
    return voiceResponse.toString();
  }
}
