import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import { IProject } from 'interfaces/project';
import { projectsToken } from './projects.provider';
import { IProjectModel } from './projects.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(projectsToken) private readonly projectModel: Model<IProjectModel>,
  ) { }

  async findAll(): Promise<IProject[]> {
    return await this.projectModel.find().exec();
  }
}
