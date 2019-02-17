import { Module } from '@nestjs/common';
import { PageController } from 'page/page.controller';
import { PageService } from 'page/page.service';

@Module({
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule { }
