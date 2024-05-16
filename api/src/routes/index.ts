import express from "express";
import visitesRouter from "./visites";
import { initPoints } from "../db/points";

const appRouter = express.Router();

appRouter.get("/", async (req, res, next) => {
  const result = await initPoints();
  res.send(result);
});

const mountRoutes = (app: express.Application) => {
  app.use("/init", appRouter); // Initialiser la base de données, créer la table selon le fichier CSV reçu
  app.use("/visites", visitesRouter);
};

export default mountRoutes;
