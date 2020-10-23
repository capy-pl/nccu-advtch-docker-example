const { Client } = require('pg')

const PGPORT = parseInt(process.env.PGPORT) || 5432;
const PGHOST = process.env.PGHOST || 'localhost';
const PGUSER = process.env.PGUSER || 'test';
const PGPASSWORD = process.env.PGPASSWORD || 'test';
const PGDATABASE = process.env.PGDATABASE || 'todoapp';

// The configuration is based on environment variable.
const client = new Client({
  host: PGHOST,
  port: PGPORT,
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE
});

async function connect() {
  try {
    await client.connect()
    console.log('Connected to postgres database.')  
    return true;
  } catch(err) {
    console.log('Failed to connect to postgres database.')
    console.error(err);
    return false;
  }
}

exports.connect = connect;
exports.client = client;