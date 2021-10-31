import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../lib/db";

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.id) {
    try {
      const sql = "delete from todo_table where id = $1";
      const values = [req.query.id];

      const client = await pool.connect();
      const result = await client.query(sql, values);
      client.release();

      res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(200).json({ success: false });
    }
  } else {
    res.status(200).json({ success: false });
  }
}
