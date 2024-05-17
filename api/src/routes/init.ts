import express from "express";
import { initDatabase } from "../db/init";

const initRouter = express.Router();

initRouter.post("/", async (req, res, next) => {
  const result = await initDatabase();
	console.log(result);
  res.send(result);
});

export default initRouter;
