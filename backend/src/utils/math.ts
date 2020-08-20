// Normalizes value to a float between 0 and 1
export function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}
