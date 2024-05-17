import * as fs from "fs";
import pool from "../pg.ts";
import { parse } from "csv-parse";
import { Point, Visit } from "../types/Point.ts";
import { calculateDistance } from "../lib/utils.ts";

var format = require("pg-format");

let totalVisits = 0;
let batchCount = 0;

let poolInUse = false;
export async function initDatabase() {
  if (poolInUse) {
    console.log("Database initialization is already in progress.");
    return {
      status: "error",
      message: "Database initialization is already in progress.",
    };
  }

  poolInUse = true;
  const client = await pool.connect();

  console.log("Initializing database");
  await client.query("DROP TABLE IF EXISTS visits");
  await client.query(
    "CREATE TABLE IF NOT EXISTS visits (id SERIAL PRIMARY KEY, propulso_id VARCHAR(255), start_time timestamp, end_time timestamp, duration integer, month integer, distance numeric)"
  );
  try {
    batchCount = 0;
    totalVisits = 0;
    const start = Date.now();
    await insertData();
    console.log("Time taken:", Date.now() - start, "ms");
    console.log("Total visits inserted:", totalVisits);
    return {
      status: "success",
      duration: (Date.now() - start) / 1000,
      totalVisits: totalVisits,
    };
  } catch (error) {
    return { status: "error" };
  } finally {
    await client.release();
    poolInUse = false;
  }
}

const insertData = async () => {
  return new Promise((resolve, reject) => {
    let visitBatch: Point[][] = [];
    let batch_size = 100; // number of unique ids processed at a time
    let currentVisit: Point[] = [];
    let lastDelta: number | null = null;
    let lastId: string | null = null;

    fs.createReadStream("../../data.csv")
      .pipe(
        parse({
          bom: true,
          columns: true,
          trim: true,
          skipEmptyLines: true,
        })
      )
      .on("data", async (point: Point) => {
        const delta_time = Number(point.delta_time);

        if (lastDelta === null || lastId === null) {
          lastDelta = delta_time;
          lastId = point.propulso_id;
          currentVisit.push(point);
          return;
        }

        const userChanged = lastId !== point.propulso_id;
        const endOfVisit = lastDelta <= 0 && delta_time > 0;
        const startOfNewVisit = lastDelta < 0 && delta_time >= 0;
        if (userChanged || endOfVisit || startOfNewVisit) {
          // Process last visit
          if (currentVisit.length > 0) {
            visitBatch.push([...currentVisit]);
            currentVisit = [];
          }
        }

        if (visitBatch.length === batch_size) {
          // On atteint le nombre de visites à traiter
          processVisit(visitBatch);
          visitBatch = [];
        }

        currentVisit.push(point);

        lastDelta = delta_time;
        lastId = point.propulso_id;
      })

      .on("error", (error) => {
        console.error("Error reading CSV file", error);
        reject("Error reading CSV file");
      })
      .on("end", async () => {
        if (currentVisit.length > 0) {
          visitBatch.push(currentVisit);
          processVisit(visitBatch); // Process the last batch
          resolve("Data inserted successfully");
        }
      });
  });
};

let visitPerBatch = 0;
const processVisit = async (visits: Point[][]) => {
  const visitBatch: Visit[] = [];
  // Process each visit
  visits.forEach((v) => {
    //On s'assure que les points soient dans l'ordre chronologique
    const sortedPoints = v.sort(
      (a, b) => Number(a.timestamp) - Number(b.timestamp)
    );

    let visitStart: Date;
    let visitEnd: Date;
    let duration = 0;
    let month = 0;
    let distance = 0; // distance
    // speed

    //Pour calculer la durée de la visite en excluant les points hors de la zone
    const pointsDansLaZone = sortedPoints.filter(
      (point) => Number(point.delta_time) === 0
    );

    // Si aucun point dans la zone, on ne traite pas la visite
    if (pointsDansLaZone.length === 0) {
      return;
    }

    // Calcul de la distance parcourue
    pointsDansLaZone.reduce((prev, current) => {
      distance += calculateDistance(
        Number(prev.lat),
        Number(prev.lon),
        Number(current.lat),
        Number(current.lon)
      );
      return current;
    });

    visitStart = new Date(Number(pointsDansLaZone[0].timestamp) * 1000);
    visitEnd = new Date(
      Number(pointsDansLaZone[pointsDansLaZone.length - 1].timestamp) * 1000
    );
    duration = (visitEnd.getTime() - visitStart.getTime()) / 1000;
    month = visitStart.getMonth() + 1;

    visitBatch.push({
      propulso_id: v[0].propulso_id,
      start_date: visitStart,
      end_date: visitEnd,
      duration,
      month,
      distance,
    });
  });

  const query = format(
    "INSERT INTO visits (propulso_id, start_time, end_time, duration, month, distance) VALUES %L",
    visitBatch.map((row: Visit) => [
      row.propulso_id,
      row.start_date,
      row.end_date,
      row.duration,
      row.month,
      row.distance,
    ])
  );

  visitPerBatch += visitBatch.length;
  totalVisits += visitBatch.length;
  batchCount++;
  if (batchCount % 1000 === 0) {
    console.log(
      batchCount + " batches of 100 visits inserted. batch size:",
      visitPerBatch
    );
    visitPerBatch = 0;
  }

  await pool.query(query);
};
