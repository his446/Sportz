import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 40,
  connectionTimeoutMillis: 8_000,
  idleTimeoutMillis: 40_000,
});

export const db = drizzle(pool);
