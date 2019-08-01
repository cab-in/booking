const { Pool } = require('pg');

const pool = new Pool({
  user: 'christopherchan',
  host: 'localhost',
  database: 'booking',
  password: '',
  port: 5432,
});

module.exports.pool = pool;
