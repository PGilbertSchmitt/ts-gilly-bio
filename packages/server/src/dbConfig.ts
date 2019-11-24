// tslint:disable:no-string-literal
export default {
  ROOT_USER: process.env['MONGO_INITDB_ROOT_USERNAME'],
  ROOT_PASS: process.env['MONGO_INITDB_ROOT_PASSWORD'],
  APP_USER: process.env['MONGO_INITDB_APP_USERNAME'],
  APP_PASS: process.env['MONGO_INITDB_APP_PASSWORD'],
  HOST: process.env['MONGO_HOST_URI'],
  DATABASE: process.env['MONGO_DATABASE'],
};
