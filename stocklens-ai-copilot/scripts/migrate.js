require("dotenv").config();

const { closeDatabase, ensureSchema } = require("../db");

async function main() {
  try {
    await ensureSchema();
    console.log("Neon schema is ready.");
  } finally {
    await closeDatabase();
  }
}

main().catch((error) => {
  console.error("Database migration failed:", error.message);
  process.exitCode = 1;
});
