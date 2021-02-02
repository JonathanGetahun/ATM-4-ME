const { Pool } = require('pg');

const pool = new Pool();

//value - cb f(x)
module.exports = {
  query: (text, params) => pool.query(text, params),
}