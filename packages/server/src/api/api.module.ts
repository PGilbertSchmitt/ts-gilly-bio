import { Module } from '@nestjs/common';

import { BugsModule } from 'api/bugs/bugs.module';
import { ProjectsModule } from 'api/projects/projects.module';

@Module({
  imports: [
    BugsModule,
    ProjectsModule,
  ],
})
export class APIModule { }
