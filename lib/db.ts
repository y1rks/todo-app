import { Pool } from "pg";

// create table todo_table (id integer, content text);
// insert into todo_table values (1, 'Test todo');
// insert into todo_table values (2, 'Just do it!');

// const { Pool } = require("pg");
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
