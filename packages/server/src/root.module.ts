import { Module } from '@nestjs/common';

import { APIModule } from './api/api.module';

@Module({
  imports: [
    APIModule,
  ],
})
export class RootModule { }
