/* eslint-disable no-nested-ternary */
require('dotenv').config();

const { PORT } = process.env;
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : (process.env.NODE_ENV === 'development' ? process.env.DEV_MONGODB_URI : process.env.PROD_MONGODB_URI);

module.exports = {
  MONGODB_URI,
  PORT,
};
