import { Pool } from "pg";

require("dotenv").config();

export const cn = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
};

export const pool = new Pool(cn);

export default pool;
