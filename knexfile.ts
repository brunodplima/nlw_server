import path from "path";
require('dotenv').config()

const directory = path.resolve(__dirname, 'src', 'database')

module.exports = {
  client: 'mysql2',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
  },
  migrations: {
    directory: path.resolve(directory, 'migrations')
  },
  seeds: {
    directory: path.resolve(directory, 'seeds')
  },
};
