const fs = require("node:fs");
const path = require("node:path");
const { Pool } = require("pg");

let pool;
let schemaPromise;

function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

function getPool() {
  if (!databaseConfigured()) {
    throw new Error("DATABASE_URL is not configured");
  }
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000
    });
  }
  return pool;
}

async function ensureSchema() {
  if (!schemaPromise) {
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
    schemaPromise = getPool().query(schema).catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  await schemaPromise;
}

async function query(text, values = []) {
  return getPool().query(text, values);
}

async function closeDatabase() {
  if (!pool) return;
  const currentPool = pool;
  pool = null;
  schemaPromise = null;
  await currentPool.end();
}

module.exports = { closeDatabase, databaseConfigured, ensureSchema, getPool, query };
