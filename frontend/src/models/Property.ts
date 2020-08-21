import { GeoJsonPoint, GeoJsonPolygon } from './GeoJson';

export interface Property {
  id: string;
  geocode_geo: GeoJsonPoint;
  parcel_geo: GeoJsonPolygon;
  building_geo: GeoJsonPolygon;
  image_bounds: number[];
  image_url: string;
}
