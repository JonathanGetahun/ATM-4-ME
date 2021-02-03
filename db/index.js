const { Pool } = require('pg');

//don't need to add obj w/ env var inside Pool
const pool = new Pool();

//value - cb f(x)
module.exports = {
  query: (text, params) => pool.query(text, params),
}