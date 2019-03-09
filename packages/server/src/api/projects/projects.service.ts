import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import pick from 'lodash/pick';

import { IProject } from '@src/interfaces/project';
import { projectsToken } from './projects.provider';
import { IProjectDoc } from './projects.schema';

/* JSON filtering explanation:
 *
 * In Rails, I had jbuilder to structure my api's json payloads to convert my full database output into a
 * returnable json payload, leaving out all the unnecessary data like row id or columns unrelated to the
 * endpoint. The best method I could find to accomplish this in Nest was just to create an array of the
 * desired keys, then using a pick function to filter out only those attributes.
 */

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(projectsToken) private readonly projectModel: Model<IProjectDoc>,
  ) { }

  private readonly FIND_ALL_KEYS = [
    'title',
    'desc',
    'slug',
    'thumbnail_path',
  ];

  async findAll(): Promise<IProject[]> {
    const projectDocs = await this.projectModel.find().exec();
    return projectDocs.map((doc) => (
      this.filterByKeys(doc, this.FIND_ALL_KEYS)
    ));
  }

  private readonly SLUG_KEYS = [
    'title',
    'desc',
    'slug',
    'stack',
    'thumbnail_path',
    'header_image_path',
    'urls',
  ];

  async find(slug: string): Promise<IProject> {
    const projectDoc = await this.projectModel.findOne({ slug }).exec();
    return this.filterByKeys(projectDoc, this.SLUG_KEYS);
  }

  filterByKeys(doc: IProjectDoc, keys: string[]): IProject {
    // This could be unsafe, but I will not be doing any weird modifications to the data, so it should be fine.
    return pick(doc, keys) as IProject;
  }
}
