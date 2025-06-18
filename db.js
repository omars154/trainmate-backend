const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pgclient = new pg.Client(process.env.DATABASE_URL);

module.exports = pgclient;
