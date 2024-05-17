export type Point = {
  propulso_id: string;
  lat: string;
  lon: string;
  delta_time: string;
  timestamp: string;
};

export type Visit = {
  propulso_id: string;
  start_date: Date;
  end_date: Date;
  duration: number;
  month: number;
  distance: number;
};
