import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bldg } from './bldg.entity'; // Bldg 엔티티를 임포트합니다.
import { Repository } from 'typeorm'; // TypeORM의 Repository를 임포트합니다.

@Injectable() // NestJS에서 이 클래스가 서비스로 주입될 수 있도록 데코레이터 추가
export class BldgService {
  // 생성자에서 @InjectRepository를 사용하여 Repository 주입
  constructor(
    @InjectRepository(Bldg) // Bldg 엔티티에 대한 Repository를 주입
    private bldgRepository: Repository<Bldg>, // Repository를 클래스의 private 변수로 선언
  ) {}

  // 모든 빌딩 데이터를 반환하는 메서드
  async findAll(): Promise<Bldg[]> {
    return this.bldgRepository.find(); // Repository에서 제공하는 find 메서드를 사용하여 모든 빌딩을 반환
  }

  // 근처 빌딩들을 찾는 메서드 (특정 좌표와 반경을 기반으로)
  async findNearby(x: number, y: number, radius: number): Promise<Bldg[]> {
    // createQueryBuilder를 사용하여 직접 SQL 쿼리를 작성
    return this.bldgRepository
      .createQueryBuilder('bldg') // 'bldg'라는 별칭을 사용하여 쿼리 작성
      .where(
        // ST_Distance 함수를 사용하여 두 지점 간의 거리 계산
        `ST_Distance(
          ST_SetSRID(ST_MakePoint(:x, :y), 4326)::geography,
          bldg.bldg_geom::geography
        ) <= :radius`, // 두 지점 간의 거리가 지정된 반경 이하인 경우만 필터링
        { x, y, radius }, // x, y, radius 값을 파라미터로 전달
      )
      .getMany(); // 쿼리를 실행하고 결과를 여러 개의 엔티티로 반환
  }
}
