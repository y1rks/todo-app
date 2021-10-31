import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../lib/db";

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const sql = "INSERT INTO todo_table(content) VALUES($1)";
    const values = ["Test task!"];

    const client = await pool.connect();
    const result = await client.query(sql, values);
    console.log(result.rows[0]);
    client.release();

    // const results = { results: result ? result.rows : null };
    // console.log(results);
    //
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }
}
