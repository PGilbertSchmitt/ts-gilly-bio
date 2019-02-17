import { Module } from '@nestjs/common';
import { PageModule } from 'page/page.module';
import { BugsModule } from 'api/bugs/bugs.module';

@Module({
  imports: [PageModule, BugsModule],
})
export class AppModule { }
