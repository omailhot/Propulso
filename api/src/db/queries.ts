import { pool } from "../pg.ts";
export async function getVisitsPerMonth() {
  const query = `
    SELECT
      EXTRACT(YEAR FROM start_time) AS year,
      EXTRACT(MONTH FROM start_time) AS month,
      COUNT(*) AS visit_count
    FROM
      visits
    GROUP BY
      EXTRACT(YEAR FROM start_time),
      EXTRACT(MONTH FROM start_time)
    ORDER BY
      year,
      month;
  `;
  const res = await pool.query(query);
  return res.rows;
}

export async function getUniqueVisitorsPerMonth() {
  const query = `
    SELECT
      EXTRACT(YEAR FROM start_time) AS year,
      EXTRACT(MONTH FROM start_time) AS month,
      COUNT(DISTINCT propulso_id) AS unique_visitors
    FROM
      visits
    GROUP BY
      EXTRACT(YEAR FROM start_time),
      EXTRACT(MONTH FROM start_time)
    ORDER BY
      year,
      month;
  `;
  const res = await pool.query(query);
  return res.rows;
}

export async function getAverageVisitDuration() {
  const query = `
    SELECT
      AVG(duration) AS average_duration
    FROM
      visits
  `;
  const res = await pool.query(query);
  return res.rows;
}

export async function getAverageDaysBetweenVisitorsVisits() {
  const query = `
  WITH numbered_visits AS (
    SELECT
        propulso_id,
        start_time,
        LAG(start_time) OVER (PARTITION BY propulso_id ORDER BY start_time) AS previous_visit_time
    FROM
        visits
    ),
    days_between_visits AS (
        SELECT
            propulso_id,
            start_time,
            previous_visit_time,
            EXTRACT(EPOCH FROM (start_time - previous_visit_time)) / 86400 AS days_between
        FROM
            numbered_visits
    )
    SELECT
        AVG(days_between) AS average_days_between_visits
    FROM
        days_between_visits;
  `;
  const res = await pool.query(query);
  return res.rows;
}

export async function getAverageMoveSpeedPerMonth() {
  const query = `
    SELECT
      EXTRACT(YEAR FROM start_time) AS year,
      EXTRACT(MONTH FROM start_time) AS month,
      AVG(distance * 1000 / duration) AS average_speed
    FROM
      visits
    WHERE duration > 0
    GROUP BY
      EXTRACT(YEAR FROM start_time),
      EXTRACT(MONTH FROM start_time)
    ORDER BY
      year,
      month;
  `;
  const res = await pool.query(query);
  return res.rows;
}
