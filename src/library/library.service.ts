import * as path from 'path';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from './library.entity';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private libraryRepository: Repository<Library>,
  ) {}

  async findAll(): Promise<Library[]> {
    return this.libraryRepository.find();
  }

  async importCsvToDatabase(filePath: string): Promise<void> {
    const absoluteFilePath = path.resolve(
      __dirname,
      '../../public/csv',
      filePath,
    );

    if (!fs.existsSync(absoluteFilePath)) {
      throw new Error(`File not found: ${absoluteFilePath}`);
    }

    const libraries: Library[] = [];
    let rowCount = 0;

    // 첫 번째로 가장 큰 library_id를 확인해서, 그 값을 기준으로 3517 이후로 삽입하지 않도록 한다.
    const maxLibraryId = await this.libraryRepository
      .createQueryBuilder('library')
      .select('MAX(library_id)', 'max')
      .getRawOne();

    // 중복 데이터를 추적하기 위한 Set
    const existingLibrariesSet = new Set<string>();

    return new Promise((resolve, reject) => {
      fs.createReadStream(absoluteFilePath)
        .pipe(csv())
        .on('headers', (headers) => {
          // CSV 파일에서 실제로 읽은 컬럼명을 로그로 출력
          console.log('CSV 파일 컬럼명:', headers);
        })
        .on('data', async (row) => {
          // library_id가 3517 이상이면 추가하지 않고 종료
          if (maxLibraryId.max >= 3517) {
            console.log('Library ID exceeds 3517, stopping insertion.');
            return;
          }

          if (rowCount >= 3517) return; // rowCount가 3517 이상일 때 처리하지 않음

          const library = new Library();

          // 각 컬럼명이 정확하게 일치하는지 확인하면서 값을 할당합니다.
          library.library_name = row['library_name']
            ? row['library_name'].trim().toLowerCase()
            : '';
          library.province_name = row['province_name']
            ? row['province_name'].trim()
            : '';
          library.district_name = row['district_name']
            ? row['district_name'].trim()
            : '';
          library.library_type = row['library_type']
            ? row['library_type'].trim()
            : '';
          library.closed_day = row['closed_day']
            ? row['closed_day'].trim()
            : '';
          library.weekday_open_time = row['weekday_open_time']
            ? row['weekday_open_time'].trim()
            : '';
          library.weekday_close_time = row['weekday_close_time']
            ? row['weekday_close_time'].trim()
            : '';
          library.saturday_open_time = row['saturday_open_time']
            ? row['saturday_open_time'].trim()
            : '';
          library.saturday_close_time = row['saturday_close_time']
            ? row['saturday_close_time'].trim()
            : '';
          library.holiday_open_time = row['holiday_open_time']
            ? row['holiday_open_time'].trim()
            : '';
          library.holiday_close_time = row['holiday_close_time']
            ? row['holiday_close_time'].trim()
            : '';
          library.seats = row['seats'] ? Number(row['seats']) : 0;
          library.book_count = row['book_count']
            ? Number(row['book_count'])
            : 0;
          library.serial_publication_count = row['serial_publication_count']
            ? Number(row['serial_publication_count'])
            : 0;
          library.non_book_materials_count = row['non_book_materials_count']
            ? Number(row['non_book_materials_count'])
            : 0;
          library.borrowable_books_count = row['borrowable_books_count']
            ? Number(row['borrowable_books_count'])
            : 0;
          library.borrowable_days = row['borrowable_days']
            ? Number(row['borrowable_days'])
            : 0;
          library.address = row['address'] ? row['address'].trim() : '';
          library.operating_institution = row['operating_institution']
            ? row['operating_institution'].trim()
            : '';
          library.phone_number = row['phone_number']
            ? row['phone_number'].trim()
            : '';
          library.land_area = row['land_area']
            ? parseFloat(row['land_area'])
            : 0;
          library.building_area = row['building_area']
            ? parseFloat(row['building_area'])
            : 0;
          library.website_url = row['website_url']
            ? row['website_url'].trim()
            : '';
          library.latitude = row['latitude'] ? parseFloat(row['latitude']) : 0;
          library.longitude = row['longitude']
            ? parseFloat(row['longitude'])
            : 0;
          library.data_reference_date = row['data_reference_date']
            ? row['data_reference_date'].trim()
            : '';
          library.provider_code = row['provider_code']
            ? row['provider_code'].trim()
            : '';
          library.provider_name = row['provider_name']
            ? row['provider_name'].trim()
            : '';

          // 중복 체크: library_name과 address를 기준으로 중복을 판단
          const uniqueKey = `${library.library_name}_${library.address}`;
          if (!existingLibrariesSet.has(uniqueKey)) {
            existingLibrariesSet.add(uniqueKey); // 중복이 아니면 Set에 추가
            libraries.push(library); // 중복이 없으면 배열에 추가
          }

          rowCount++;

          // 일정량의 데이터가 쌓였을 때 배치로 저장
          if (libraries.length >= 50) {
            // 배치 크기를 더 줄여서 50개씩 저장
            try {
              await this.libraryRepository.save(libraries);
              libraries.length = 0; // 배열을 비워줍니다.
            } catch (err) {
              console.error('Error saving batch:', err);
              reject(err);
            }
          }
        })
        .on('end', async () => {
          // 마지막 남은 데이터를 저장
          if (libraries.length > 0) {
            try {
              await this.libraryRepository.save(libraries);
            } catch (err) {
              console.error('Error saving remaining data:', err);
              reject(err);
            }
          }
          console.log('CSV data has been imported successfully!');
          resolve();
        })
        .on('error', (err) => {
          console.error('Error reading CSV file:', err);
          reject(err);
        });
    });
  }
}
