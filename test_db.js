const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    const res = await pool.query("SELECT * FROM users WHERE role = 'ADMIN'");
    console.log(res.rows);
  } catch (e) {
    console.error(e);
  }
}
test();
