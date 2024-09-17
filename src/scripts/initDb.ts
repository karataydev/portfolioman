import { db } from "../lib/db";
import fs from "fs";
import path from "path";

async function initializeDatabase() {
  try {
    const schemaSQL = fs.readFileSync(
      path.join(__dirname, "../lib/schema.sql"),
      "utf8",
    );
    await db.none(schemaSQL);
    console.log("Database schema initialized successfully.");
  } catch (error) {
    console.error("Error initializing database schema:", error);
  } finally {
    db.$pool.end(); // Close the database connection pool
  }
}

initializeDatabase();
