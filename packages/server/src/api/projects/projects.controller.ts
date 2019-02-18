import { Controller, Get } from '@nestjs/common';

import { IProject } from 'interfaces/project';
import { ProjectsService } from './projects.service';

@Controller('/api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  async getProjects(): Promise<IProject[]> {
    return this.projectsService.findAll();
  }
}
