import express from 'express';
import * as db from '../db/index'
 
const app = express();
app.get('/:id', async (req, res, next) => {
  const result = await db.query('SELECT * FROM points WHERE propulso_id = $1', [req.params.id])
  res.send(result.rows[0])
})