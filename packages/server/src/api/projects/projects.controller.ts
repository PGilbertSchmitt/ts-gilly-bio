import { Controller, Get, Param } from '@nestjs/common';

import { ProjectsService } from './projects.service';

@Controller('/api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  async getProjects() {
    return await this.projectsService.findAll();
  }

  @Get(':slug')
  async getProject(@Param('slug') slug: string) {
    return await this.projectsService.find(slug);
  }
}
