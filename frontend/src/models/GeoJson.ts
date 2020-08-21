export interface GeoJsonPoint {
  type: 'Point';
  coordinates: number[];
}

export interface GeoJsonPolygon {
  type: 'Polygon';
  coordinates: number[][][];
}
