import { Module } from '@nestjs/common';
import { BugsController } from 'api/bugs/bugs.controller';
import { BugsService } from 'api/bugs/bugs.service';

@Module({
  controllers: [BugsController],
  providers: [BugsService],
})
export class BugsModule { }
