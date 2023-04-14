import { IsString } from 'class-validator';

export class GatherDto {
  @IsString()
  Digits: string;
}
