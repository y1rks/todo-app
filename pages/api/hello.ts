// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// create table todo_table (id integer, content text);
// insert into todo_table values (1, 'Test todo');
// insert into todo_table values (2, 'Just do it!');

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

type Data = {
  items: Item[];
};

type Item = {
  id: number;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // DB connection
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM test_table");
    const results = { results: result ? result.rows : null };
    console.log(results);
    client.release();
  } catch (err) {
    console.error(err);
  }

  res.status(200).json({
    items: [
      { id: 1, content: "This is test content." },
      { id: 2, content: "Just do it!" },
    ],
  });
}
