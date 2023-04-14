import { IsPhoneNumber, IsString } from 'class-validator';

export class MakeCallDto {
  @IsPhoneNumber('US')
  to: string;

  @IsPhoneNumber('US')
  from: string;

  @IsString()
  message: string;
}
