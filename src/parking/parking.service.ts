import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingLot } from './parking.entity'; // ParkingLot 엔티티를 임포트합니다.
import { Repository } from 'typeorm'; // TypeORM의 Repository를 임포트합니다.

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(ParkingLot) // ParkingLot 엔티티에 대한 Repository를 주입
    private parkingLotRepository: Repository<ParkingLot>, // Repository를 클래스의 private 변수로 선언
  ) {}

  // 모든 주차장 데이터를 반환하는 메서드
  async findAll(): Promise<ParkingLot[]> {
    return this.parkingLotRepository.find(); // Repository에서 제공하는 find 메서드를 사용하여 모든 주차장을 반환
  }

  // 근처 주차장을 찾는 메서드 (특정 좌표와 반경을 기반으로)
  async findNearby(
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<ParkingLot[]> {
    return this.parkingLotRepository
      .createQueryBuilder('parking_lot') // 'parking_lot'이라는 별칭을 사용하여 쿼리 작성
      .where(
        `ST_Distance(
          ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
          parking_lot.geom::geography
        ) <= :radius`, // 두 지점 간의 거리가 지정된 반경 이하인 경우만 필터링
        { latitude, longitude, radius }, // latitude, longitude, radius 값을 파라미터로 전달
      )
      .getMany(); // 쿼리를 실행하고 결과를 여러 개의 엔티티로 반환
  }
}
