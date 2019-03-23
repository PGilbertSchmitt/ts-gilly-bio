import { Module } from '@nestjs/common';

import { APIModule } from './api/api.module';
import { StaticModule } from './static/static.module';

@Module({
  imports: [
    APIModule,
    StaticModule,
  ],
})
export class RootModule { }
