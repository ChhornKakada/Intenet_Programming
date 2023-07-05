import { Module } from '@nestjs/common';
import { FileMngService } from './file-mng.service';

@Module({
  providers: [FileMngService],
})
export class FileMngModule {}
