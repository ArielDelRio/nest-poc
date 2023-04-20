import { Injectable } from '@nestjs/common';
import { twiml } from 'twilio';

@Injectable()
export class IVRPhoneTreeService {
  private _callId: string;

  public get callId(): string {
    return this._callId;
  }

  public set callId(v: string) {
    this._callId = v;
  }

  welcome() {
    const voiceResponse = new twiml.VoiceResponse();

    const gather = voiceResponse.gather({
      action: '/ivr/menu',
      numDigits: 1,
      method: 'POST',
    });

    gather.say(
      { loop: 3 },
      `Thanks for calling the E T Phone Home Service. Please press 1 for directions. Press 2 for a list of planets to call.`,
    );

    return voiceResponse.toString();
  }

  menu(digit: string) {
    const optionActions = {
      '1': this.giveExtractionPointInstructions,
      '2': this.listPlanets,
    };

    return optionActions[digit]
      ? optionActions[digit]()
      : this.redirectWelcome();
  }

  planets(digit: string) {
    const optionActions = {
      '2': '+19295566487',
      '3': '+17262043675',
      '4': '+16513582243',
    };

    if (optionActions[digit]) {
      const voiceResponse = new twiml.VoiceResponse();
      voiceResponse.dial(optionActions[digit]);
      return voiceResponse.toString();
    }

    return this.redirectWelcome();
  }

  // ivr options
  giveExtractionPointInstructions() {
    const voiceResponse = new twiml.VoiceResponse();

    voiceResponse.say(
      { voice: 'alice', language: 'en-GB' },
      `To get to your extraction point, get on your bike and go down the street. Then Left down an alley. Avoid the police cars. Turn left into an unfinished housing development. Fly over the roadblock. Go passed the moon. Soon after you will see your mother ship.`,
    );

    voiceResponse.say(
      `Thank you for calling the ET Phone Home Service - the adventurous alien's first choice in intergalactic travel`,
    );

    voiceResponse.hangup();

    return voiceResponse.toString();
  }

  listPlanets() {
    const voiceResponse = new twiml.VoiceResponse();

    const gather = voiceResponse.gather({
      action: '/ivr/planets',
      numDigits: 1,
      method: 'POST',
    });

    gather.say(
      { voice: 'alice', language: 'en-GB', loop: 3 },
      `To call the planet Broh doe As O G, press 2. To call the planet DuhGo bah, press 3. To call an oober asteroid to your location, press 4. To go back to the main menu, press the star key`,
    );

    return voiceResponse.toString();
  }

  redirectWelcome() {
    const voiceResponse = new twiml.VoiceResponse();

    voiceResponse.say(
      {
        voice: 'alice',
        language: 'en-GB',
      },
      `Returning to the main menu`,
    );

    voiceResponse.redirect({ method: 'GET' }, '/ivr/welcome');

    return voiceResponse.toString();
  }
}
