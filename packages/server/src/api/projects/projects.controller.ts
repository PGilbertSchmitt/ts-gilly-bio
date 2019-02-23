import { Controller, Get, Param } from '@nestjs/common';

import { IProject } from '@src/interfaces/project';
import { ProjectsService } from './projects.service';

@Controller('/api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  async getProjects(): Promise<IProject[]> {
    return this.projectsService.findAll();
  }

  @Get(':slug')
  async getProject(@Param('slug') slug: string): Promise<IProject> {
    return this.projectsService.find(slug);
  }
}
