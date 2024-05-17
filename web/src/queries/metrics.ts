const apiURL = "http://localhost:3000";

type Data = {
  year: number;
  month: number;
  value: number;
};

export const getVisitsPerMonth = async (): Promise<Data[]> => {
  const data = await fetch(`${apiURL}/metrics/visitsPerMonth`).then(
    (response) => response.json().then((data) => data),
  );

  return data.map((row: any) => ({
    year: row.year,
    month: row.month,
    value: row.visit_count,
  }));
};

export const getVisitorsPerMonth = async (): Promise<Data[]> => {
  const data = await fetch(`${apiURL}/metrics/visitorsPerMonth`).then(
    (response) => response.json(),
  );

  return data.map((row: any) => ({
    year: row.year,
    month: row.month,
    value: row.unique_visitors,
  }));
};

export const getVisitDuration = async (): Promise<number> =>
  await fetch(`${apiURL}/metrics/visitDuration`)
    .then((response) => response.json())
    .then((data) => data[0].average_duration);

export const getMoveSpeedPerMonth = async (): Promise<Data[]> => {
  const data = await fetch(`${apiURL}/metrics/moveSpeedPerMonth`).then(
    (response) => response.json(),
  );

  return data.map((row: any) => ({
    year: row.year,
    month: row.month,
    value: row.average_speed,
  }));
};

export const getDaysBetweenVisitorsVisits = async (): Promise<number> =>
  await fetch(`${apiURL}/metrics/daysBetweenVisitorsVisits`)
    .then((response) => response.json())
    .then((data) => data[0].average_days_between_visits);
