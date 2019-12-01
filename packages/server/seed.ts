import mongoose from 'mongoose';
import config from './src/dbConfig';

import { ProjectSchema } from './src/api/projects/projects.schema';
import { projects } from './seeds/projects';

(async () => {
  console.log('Connecting...');

  try {
    await mongoose.connect(`${config.HOST}/${config.DATABASE}`, {
      authSource: config.DATABASE,
      useNewUrlParser: true,
      useCreateIndex: true,
      user: config.APP_USER,
      pass: config.APP_PASS,
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }

  console.log('Connected.');

  const projectModel = mongoose.model('Project', ProjectSchema);

  console.log('Deleting projects...');
  await projectModel.deleteMany({}).exec();
  console.log('Projects deleted');

  console.log('Reseeding projects...');
  for (const proj of projects) {
    await projectModel.create(proj);
    console.log('Seeded project ' + proj.title);
  }
  console.log('Projects reseeded');

  mongoose.disconnect();
})();
