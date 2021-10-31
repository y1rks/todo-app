import { Pool } from "pg";

// create table todo_table (id integer generated always as identity, content text, primary key (id))

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
