import mongoose from 'mongoose';
import config from './db.config.json';

import { ProjectSchema } from '@src/api/projects/projects.schema';
import { projects } from './seeds/projects';

(async () => {
  console.log('Connecting...');

  await mongoose.connect(`${config.host}/${config.database}`, {
    user: config.username,
    pass: config.password,

    useNewUrlParser: true,
    useCreateIndex: true,
  });

  console.log('Connected.');

  const projectModel = mongoose.model('Project', ProjectSchema);

  console.log('Deleting projects...');

  await projectModel.deleteMany({}).exec();

  console.log('Projects deleted, reseeding...');

  for (const proj of projects) {
    await projectModel.create(proj);
    console.log('Seeded project ' + proj.title);
  }

  console.log('Projects reseeded');

  mongoose.disconnect();
})();
