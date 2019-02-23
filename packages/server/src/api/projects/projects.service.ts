import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import { projectsToken } from './projects.provider';
import { IProjectDoc } from './projects.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(projectsToken) private readonly projectModel: Model<IProjectDoc>,
  ) { }

  async findAll(): Promise<IProjectDoc[]> {
    return await this.projectModel.find().exec();
  }

  async find(slug: string): Promise<IProjectDoc> {
    return await this.projectModel.findOne({ slug });
  }
}
