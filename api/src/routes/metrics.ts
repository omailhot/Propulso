import express from "express";
import {
  getAverageDaysBetweenVisitorsVisits,
  getAverageMoveSpeedPerMonth,
  getAverageVisitDuration,
  getUniqueVisitorsPerMonth,
  getVisitsPerMonth,
} from "../db/queries";

const metricsRouter = express.Router();

metricsRouter.get("/visitsPerMonth", async (req, res, next) => {
  const result = await getVisitsPerMonth();
  res.send(result);
});

metricsRouter.get("/visitorsPerMonth", async (req, res, next) => {
  const result = await getUniqueVisitorsPerMonth();
  res.send(result);
});

metricsRouter.get("/visitDuration", async (req, res, next) => {
  const result = await getAverageVisitDuration();
  res.send(result);
});

metricsRouter.get("/moveSpeedPerMonth", async (req, res, next) => {
  const result = await getAverageMoveSpeedPerMonth();
  res.send(result);
});

metricsRouter.get("/daysBetweenVisitorsVisits", async (req, res, next) => {
  const result = await getAverageDaysBetweenVisitorsVisits();
  res.send(result);
});

export default metricsRouter;
