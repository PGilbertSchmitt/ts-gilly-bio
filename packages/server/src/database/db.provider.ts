import mongoose, { connect } from 'mongoose';

import config from '@src/dbConfig';

export const dbToken = 'DB_CONNECTION_TOKEN';
export const dbProviders = [
  {
    provide: dbToken,
    useFactory: async (): Promise<typeof mongoose> => (
      await connect(`${config.HOST}/${config.DATABASE}`, {
        authSource: config.DATABASE,
        user: config.APP_USER,
        pass: config.APP_PASS,

        // Prevents Mongo client from using deprecated methods
        useNewUrlParser: true,
        useCreateIndex: true
      })
    ),
  },
];
