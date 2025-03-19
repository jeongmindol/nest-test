import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BldgModule } from './bldg/bldg.module';
import { BooksModule } from './books/books.module';
import { LibraryService } from './library/library.service';
import { LibraryController } from './library/library.controller';
import { LibraryModule } from './library/library.module';
import { ParkingLotModule } from './parking/parking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: parseInt(process.env.CLOUDSQL_PORT!),
      host:
        // process.env.CLOUDSQL_HOST ||
        // `/cloudsql/${process.env.CLOUDSQL_CONNECTION_NAME}` ||
        '34.64.248.193',
      // username: process.env.CLOUDSQL_USER,
      username: 'codelab',
      // password: process.env.CLOUDSQL_PASS,
      password: 'codelab1234',
      // database: process.env.CLOUDSQL_DB,
      database: 'codelab-nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BldgModule,
    BooksModule,
    LibraryModule,
    ParkingLotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
