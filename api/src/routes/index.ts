import express from "express";
import metricsRouter from "./metrics";
import initRouter from "./init";

const mountRoutes = (app: express.Application) => {
  app.use("/init", initRouter); // Initialiser la base de données, créer la table des visites à partir du csv
  app.use("/metrics", metricsRouter); // Récupérer les métriques demandées
};

export default mountRoutes;
