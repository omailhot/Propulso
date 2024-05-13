import express from "express";
import { getPoints } from "./pg";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
	res.send(getPoints());
});

app.listen(port, () => {
  console.log(`Example apps listening at http://localhost:${port}`);
});


