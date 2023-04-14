import { IsString, IsUrl } from 'class-validator';

export class RecordingDto {
  @IsUrl()
  recordingUrl: string;
  @IsString()
  callSid: string;
}
