import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'jms', name: 'parking_lots' }) // schema: 스키마명, name: 테이블명
export class ParkingLot {
  @PrimaryGeneratedColumn()
  parking_lot_id: number; // Primary key가 자동 증가하도록 설정

  @Column({ type: 'varchar', length: 50, nullable: false })
  parking_lot_management_number: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  parking_lot_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parking_lot_type: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parking_lot_category: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  road_address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  land_address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  parking_spot_count: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  grade_category: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  sub_regulation_category: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  operation_days: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  weekday_operation_start_time: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  weekday_operation_end_time: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  saturday_operation_start_time: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  saturday_operation_end_time: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  holiday_operation_start_time: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  holiday_operation_end_time: string;

  @Column({ type: 'text', nullable: true })
  fee_info: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  parking_basic_time: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  parking_basic_fee: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  additional_unit_time: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  additional_unit_fee: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  one_day_parking_fee_apply_time: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  one_day_parking_fee: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  monthly_parking_fee: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  payment_method: string;

  @Column({ type: 'text', nullable: true })
  special_remarks: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  managing_agency_name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  latitude: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  longitude: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  disabled_parking_spot_availability: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  data_reference_date: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  providing_agency_code: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  providing_agency_name: string;

  @Column({ type: 'geometry', nullable: true })
  geom: string;
}
