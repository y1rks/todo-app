// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../lib/db";

type Data = {
  results: Item[];
};

type Item = {
  id: number;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM todo_table");
    const results = { results: result ? result.rows : null } as Data;
    client.release();
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
  }
}
