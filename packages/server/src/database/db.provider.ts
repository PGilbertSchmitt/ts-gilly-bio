import mongoose, { connect } from 'mongoose';

import config from '@root/db.config';

export const dbToken = 'DB_CONNECTION_TOKEN';
export const dbProviders = [
  {
    provide: dbToken,
    useFactory: async (): Promise<typeof mongoose> => (
      await connect(`${config.host}/${config.database}`, {
        // user: config.username,
        // pass: config.password,

        // Prevents Mongo client from using deprecated methods
        useNewUrlParser: true,
        useCreateIndex: true,
      })
    ),
  },
];
