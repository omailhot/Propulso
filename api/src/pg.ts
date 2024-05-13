import pg from "pg";
import { Point } from "./type";

const { Client } = pg;
const client = new Client();

export const getPoints = async (): Promise<Point[]> => {
  await client.connect();

  client.connect((err) => {
    client.query("SELECT * FROM points", (err, res) => {
      console.log(err ? err.stack : res.rows[0].message); // Hello World!
      client.end();
			if (res)
      return res.rows;
    });
  });

  return [];
};
