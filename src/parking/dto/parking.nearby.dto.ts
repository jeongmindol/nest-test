import { IsNumber } from 'class-validator'; // 숫자값 검증을 위한 class-validator 임포트

export class ParkingNearbyDto {
  @IsNumber() // 숫자형 값 검증
  latitude: number;

  @IsNumber() // 숫자형 값 검증
  longitude: number;

  @IsNumber() // 숫자형 값 검증
  radius: number;
}
