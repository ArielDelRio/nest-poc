import { IsPhoneNumber, IsUrl } from 'class-validator';

export class MakeCallDto {
  @IsPhoneNumber('US')
  to: string;

  @IsPhoneNumber('US')
  from: string;

  @IsUrl()
  url: string;
}
