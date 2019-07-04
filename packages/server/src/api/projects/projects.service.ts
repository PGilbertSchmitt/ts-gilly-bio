import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import {
  APIProjectIndexItem,
  pickProjectIndexItem,
  APIProjectItem,
  pickProjectItem,
} from '@gilly/common';
import { projectsToken } from './projects.provider';
import { IProjectDoc } from './projects.schema';
import { Error } from '@gilly/common';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(projectsToken) private readonly projectModel: Model<IProjectDoc>,
  ) { }

  async findAll(): Promise<APIProjectIndexItem[]> {
    const projectDocs = await this.projectModel.find().exec();
    return projectDocs.map((doc) => (
      pickProjectIndexItem(doc)
    ));
  }

  async find(slug: string): Promise<APIProjectItem | Error> {
    const projectDoc = await this.projectModel.findOne({ slug }).exec();
    if (!!projectDoc) {
      return pickProjectItem(projectDoc);
    }
    return ({
      message: `Oy mate, didn't find project ${slug}`,
    });
  }
}
