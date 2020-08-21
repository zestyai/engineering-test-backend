import { normalize } from './math';

// Converts absolute lat/lon coordinates inside `bounds` to relative x/y coordinates ranging from 0 to `multiplier`
export function coordinatesToPoints(
  coordinates: number[][][],
  bounds: number[],
  multiplier: number
): { x: number; y: number }[] {
  if (coordinates.length !== 1 || coordinates[0].length === 0) {
    throw Error('Invalid polygon coordinates');
  }

  const [minLat, minLon, maxLat, maxLon] = bounds;

  return coordinates[0].map(([lat, lon]) => {
    const x: number = normalize(lat, minLat, maxLat) * multiplier;
    // Y axis is flipped since <canvas> uses a different coordinates system
    const y: number = multiplier - normalize(lon, minLon, maxLon) * multiplier;
    return { x, y };
  });
}
