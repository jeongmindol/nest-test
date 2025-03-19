import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { ParkingLot } from './parking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingLot])],
  providers: [ParkingService],
  controllers: [ParkingController],
})
export class ParkingLotModule {}
