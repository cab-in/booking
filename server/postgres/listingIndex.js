const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'ec2-3-15-38-128.us-east-2.compute.amazonaws.com',
  database: 'listing',
  password: 'rajit',
  port: 5432,
});

module.exports.pool = pool;
