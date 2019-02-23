import { Connection } from 'mongoose';

import { dbToken } from '@src/database/db.provider';
import { ProjectSchema, IProjectDoc } from './projects.schema';

export const projectsToken = 'PROJECT_TOKEN';
export const projectsProvider = [
  {
    provide: projectsToken,
    useFactory: (connection: Connection) => (
      connection.model<IProjectDoc>('Project', ProjectSchema, 'projects')
    ),
    inject: [dbToken],
  },
];
