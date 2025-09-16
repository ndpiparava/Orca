import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

//DB config 
const pool = new Pool({
  host: "db", // Docker container name
  port: 5432, 
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
});

export const db = drizzle(pool);
