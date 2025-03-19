import { Controller, Get, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { Library } from './library.entity';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post('import')
  async importCsv() {
    const filePath = 'library.csv'; // 실제 경로에 맞게 수정

    // CSV 파일을 데이터베이스에 삽입
    await this.libraryService.importCsvToDatabase(filePath);

    return { message: 'CSV data import started.' };
  }

  @Get()
  async findAll(): Promise<Library[]> {
    return this.libraryService.findAll();
  }
}
