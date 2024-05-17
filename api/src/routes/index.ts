import express from "express";
import { initPoints } from "../db/init";
import metricsRouter from "./metrics";

const appRouter = express.Router();

appRouter.get("/", async (req, res, next) => {
  const result = await initPoints();
  res.send(result);
});

const mountRoutes = (app: express.Application) => {
  app.use("/init", appRouter); // Initialiser la base de données, créer la table selon le fichier CSV reçu
  app.use("/metrics", metricsRouter); // Récupérer les métriques demandées (1 à 5)
};

export default mountRoutes;
