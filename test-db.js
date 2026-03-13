const { Client } = require('pg');

async function testConnection() {
  const connectionString = 'postgresql://postgres:Li9XGciqL5PcRdyR@db.rnmcxvgjlmxkoylbczih.supabase.co:5432/postgres';
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Successfully connected to direct URL!');
    const res = await client.query('SELECT NOW()');
    console.log('Query result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Direct connection failed:', err.message);
  }
}

testConnection();
