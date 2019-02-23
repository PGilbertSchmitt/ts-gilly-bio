import { Module } from '@nestjs/common';

import { DBModule } from '@src/database/db.module';
import { projectsProvider } from './projects.provider';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [DBModule],
  providers: [ProjectsService, ...projectsProvider],
  controllers: [ProjectsController],
})
export class ProjectsModule { }
