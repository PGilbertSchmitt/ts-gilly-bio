import { Module } from '@nestjs/common';

import { PageModule } from './page/page.module';
import { APIModule } from './api/api.module';

@Module({
  imports: [
    PageModule,
    APIModule,
  ],
})
export class RootModule { }
