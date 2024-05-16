import * as fs from "fs";
import pool from "../pg.ts";
import { parse } from "csv-parse";

var format = require("pg-format");

export async function initPoints() {
  const client = await pool.connect();
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS points (propulso_id VARCHAR(255), lat numeric, lon numeric, delta_time integer, timestamp numeric, FOREIGN KEY(visitId integer)"
    );
    await client.query(
      "CREATE TABLE IF NOT EXISTS visits (PRIMARY KEY (visitId integer), propulso_id VARCHAR(255), start numeric, end numeric, duration numeric)"
    );
    const start = Date.now();
    const res = await insertData();
    console.log("Data inserted successfully");
    console.log("Time taken:", Date.now() - start, "ms");
    return res;
  } catch (error) {
    console.error("Error initializing database", error);
  } finally {
    await client.release();
  }
}

type Point = {
  propulso_id: string;
  lat: number;
  lon: number;
  delta_time: number;
  timestamp: Date;
  visitId: number;
};

const insertData = async () => {
  return new Promise((resolve, reject) => {
    let batch: Point[] = [];
    let i = 0;
    const batch_size = 100000;
    let visit: Point[] = [];
    let lastDelta: number | null = null;
    let lastId: string | null = null;

    fs.createReadStream("../../data.csv")
      .pipe(
        parse({
          bom: true,
          columns: true,
          trim: true,
          skipEmptyLines: true,
        }).on("data", async (point: Point) => {
          // ++i;
          // batch.push(point);
          // if (batch.length === batch_size) {
          //   insertBatch(batch);
          //   batch = [];
          // }
          // if (i % 1000000 === 0 && i !== 0) {
          //   console.log("Batch inserted:", i);
          // }
          if (lastDelta !== null && lastId !== null) {
            if (lastDelta > point.delta_time || lastId !== point.propulso_id) {
              processVisit(visit);
              visit = [];
            }
          }
          visit.push(point);
          lastDelta = point.delta_time;
          lastId = point.propulso_id;
        })
      )
      .on("error", (error) => {
        console.error("Error reading CSV file", error);
        reject("Error reading CSV file");
      })
      .on("end", async () => {
        // if (batch.length > 0) {
        //   insertBatch(batch);
        //   console.log("Last Batch inserted:", batch.length);
        // }
        resolve("Data inserted successfully");
      });
  });
};

const insertBatch = async (batch: Point[]) => {
  const points = batch.map((row: Point) => [
    row.propulso_id,
    row.lat,
    row.lon,
    row.delta_time,
    row.timestamp,
  ]);

  const query = format(
    "INSERT INTO points (propulso_id, lat, lon, delta_time, timestamp) VALUES %L",
    points
  );

  await pool.query(query);

  console.log("Batch inserted:", batch.length);
};

let visitId = 0;
const processVisit = (points: Point[]) => {
  
  ++visitId;
  console.log(points);

};
