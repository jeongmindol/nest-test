import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'jms', name: 'library' }) // 스키마명과 테이블명 설정
export class Library {
  @PrimaryGeneratedColumn()
  library_id: number;

  @Column({ type: 'varchar', length: 255 })
  library_name: string; // 도서관명

  @Column({ type: 'varchar', length: 255 })
  province_name: string; // 시도명

  @Column({ type: 'varchar', length: 255 })
  district_name: string; // 시군구명

  @Column({ type: 'varchar', length: 255 })
  library_type: string; // 도서관유형

  @Column({ type: 'varchar', length: 255 })
  closed_day: string; // 휴관일

  @Column({ type: 'time' })
  weekday_open_time: string; // 평일운영시작시각

  @Column({ type: 'time' })
  weekday_close_time: string; // 평일운영종료시각

  @Column({ type: 'time' })
  saturday_open_time: string; // 토요일운영시작시각

  @Column({ type: 'time' })
  saturday_close_time: string; // 토요일운영종료시각

  @Column({ type: 'time' })
  holiday_open_time: string; // 공휴일운영시작시각

  @Column({ type: 'time' })
  holiday_close_time: string; // 공휴일운영종료시각

  @Column({ type: 'integer' })
  seats: number; // 열람좌석수

  @Column({ type: 'integer' })
  book_count: number; // 자료수(도서)

  @Column({ type: 'integer' })
  serial_publication_count: number; // 자료수(연속간행물)

  @Column({ type: 'integer' })
  non_book_materials_count: number; // 자료수(비도서)

  @Column({ type: 'integer' })
  borrowable_books_count: number; // 대출가능권수

  @Column({ type: 'integer' })
  borrowable_days: number; // 대출가능일수

  @Column({ type: 'varchar', length: 255 })
  address: string; // 소재지도로명주소

  @Column({ type: 'varchar', length: 255 })
  operating_institution: string; // 운영기관명

  @Column({ type: 'varchar', length: 255 })
  phone_number: string; // 도서관전화번호

  @Column({ type: 'float' })
  land_area: number; // 부지면적

  @Column({ type: 'float' })
  building_area: number; // 건물면적

  @Column({ type: 'varchar', length: 255 })
  website_url: string; // 홈페이지주소

  @Column({ type: 'float' })
  latitude: number; // 위도

  @Column({ type: 'float' })
  longitude: number; // 경도

  @Column({ type: 'date' })
  data_reference_date: string; // 데이터기준일자

  @Column({ type: 'varchar', length: 255 })
  provider_code: string; // 제공기관코드

  @Column({ type: 'varchar', length: 255 })
  provider_name: string; // 제공기관명
}
