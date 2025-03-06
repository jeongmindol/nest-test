import { IsNumber } from 'class-validator';

export class BldgnearbyDto {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  radius: number;
}
