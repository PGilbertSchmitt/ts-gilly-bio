import { Module } from '@nestjs/common';

import { ProjectsModule } from 'api/projects/projects.module';

@Module({
  imports: [
    ProjectsModule,
  ],
})
export class APIModule { }
