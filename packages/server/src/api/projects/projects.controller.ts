import { Controller, Get, Param } from '@nestjs/common';
import pick from 'lodash/pick';

import { IProject } from '@src/interfaces/project';
import { ProjectsService } from './projects.service';
import { Error } from '@src/interfaces/error';

@Controller('/api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Get()
  async getProjects(): Promise<IProject[]> {
    return await this.projectsService.findAll();
  }

  @Get(':slug')
  async getProject(@Param('slug') slug: string): Promise<IProject | Error> {
    return await this.projectsService.find(slug);
  }
}
