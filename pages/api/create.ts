import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../lib/db";

type Data = {
  success: boolean;
};

type ResponseBody = {
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.body.content && typeof req.body.content === "string") {
    try {
      const sql = "INSERT INTO todo_table(content) VALUES($1)";
      const values = [...req.body.content];
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
