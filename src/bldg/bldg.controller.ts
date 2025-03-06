import { Controller, Get, Query } from '@nestjs/common'; // NestJS에서 필요한 데코레이터들 임포트
import { BldgService } from './bldg.service'; // BldgService 클래스를 임포트하여 서비스 로직을 처리
import { Bldg } from './bldg.entity'; // Bldg 엔티티를 임포트하여 반환할 데이터 타입 정의
import { BldgnearbyDto } from './dto/bldg.nearby.dto'; // 요청 파라미터를 받을 DTO(Data Transfer Object)를 임포트

@Controller('bldg') // '/bldg' 엔드포인트에 대한 요청을 처리하는 컨트롤러임을 지정
export class BldgController {
  // BldgService를 주입받아 해당 서비스 내의 로직을 호출할 수 있도록 구성
  constructor(private BldgService: BldgService) {}

  // 모든 빌딩 정보를 반환하는 GET 요청 처리
  @Get() // HTTP GET 메서드에 대해 응답하는 엔드포인트
  async findAll(): Promise<Bldg[]> {
    // BldgService의 findAll 메서드를 호출하여 모든 빌딩 정보를 반환
    return this.BldgService.findAll();
  }

  // 근처 빌딩을 찾는 GET 요청 처리
  @Get('nearby') // '/bldg/nearby' 경로로 들어오는 GET 요청을 처리
  async findNearby(@Query() query: BldgnearbyDto): Promise<Bldg[]> {
    // 요청 URL의 쿼리 파라미터를 BldgnearbyDto 객체로 받음
    // query.x, query.y, query.radius를 통해 클라이언트가 요청한 좌표와 반경 값을 받음
    return this.BldgService.findNearby(query.x, query.y, query.radius);
  }
}
