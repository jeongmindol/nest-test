import { Controller, Get, Query } from '@nestjs/common'; // NestJS에서 필요한 데코레이터들 임포트
import { ParkingService } from './parking.service'; // ParkingService 클래스를 임포트하여 서비스 로직을 처리
import { ParkingLot } from './parking.entity'; // ParkingLot 엔티티를 임포트하여 반환할 데이터 타입 정의
import { ParkingNearbyDto } from './dto/parking.nearby.dto'; // 요청 파라미터를 받을 DTO(Data Transfer Object)를 임포트

@Controller('parking-lots') // '/parking-lots' 엔드포인트에 대한 요청을 처리하는 컨트롤러임을 지정
export class ParkingController {
  constructor(private parkingService: ParkingService) {}

  // 모든 주차장 정보를 반환하는 GET 요청 처리
  @Get() // HTTP GET 메서드에 대해 응답하는 엔드포인트
  async findAll(): Promise<ParkingLot[]> {
    return this.parkingService.findAll();
  }

  // 근처 주차장을 찾는 GET 요청 처리
  @Get('nearby') // '/parking-lots/nearby' 경로로 들어오는 GET 요청을 처리
  async findNearby(@Query() query: ParkingNearbyDto): Promise<ParkingLot[]> {
    return this.parkingService.findNearby(
      query.latitude,
      query.longitude,
      query.radius,
    );
  }
}
