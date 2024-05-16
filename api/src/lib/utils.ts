export function calculateSpeed(lat1: number, lon1: number, lat2: number, lon2: number, delta_time: number): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180; // Convert latitude to radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance between two points in meters
  const timeInSeconds = Math.abs(delta_time); // Assuming delta_time is in seconds

  const speed = distance / timeInSeconds; // Speed in meters per second

  // Convert speed to km/h
  return speed * 3.6;
}