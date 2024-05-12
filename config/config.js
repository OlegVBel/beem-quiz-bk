// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'test',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mariadb',
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'test',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mariadb',
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'test',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mariadb',
  },
};
