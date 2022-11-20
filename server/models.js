const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.PG_URI;
const PG_PASS = process.env.PG_PASS;
// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
  password: PG_PASS,
  port: 3000,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
