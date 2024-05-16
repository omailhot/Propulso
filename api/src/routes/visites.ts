import express from "express";
const visitesRouter = express.Router();

visitesRouter.get("/", async (req, res, next) => {
  // const result = await checkAndInsertData("../../../test.csv");
  // res.send(result);
});

export default visitesRouter;
