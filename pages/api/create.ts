import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../lib/db";

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // DB connection
  try {
    // const client = await pool.connect();
    // const result = await client.query(
    //   "insert into todo_table values (3, 'Test todo3')"
    // );
    // const results = { results: result ? result.rows : null };
    // console.log(results);
    // client.release();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }
}
