import dotenv from 'dotenv';

dotenv.config({ path: '../../db.env' });

// tslint:disable:no-string-literal
export default {
  APP_USER: process.env.MONGO_INITDB_APP_USERNAME,
  APP_PASS: process.env.MONGO_INITDB_APP_PASSWORD,
  HOST: process.env.MONGO_HOST_URI,
  DATABASE: process.env.MONGO_DATABASE,
};
