import { Connection } from 'mongoose';

import { dbToken } from 'database/db.provider';
import { ProjectSchema, IProjectModel } from './projects.schema';

export const projectsToken = 'PROJECT_TOKEN';
export const projectsProvider = [
  {
    provide: projectsToken,
    useFactory: (connection: Connection) => (
      connection.model<IProjectModel>('Project', ProjectSchema, 'projects')
    ),
    inject: [dbToken],
  },
];
