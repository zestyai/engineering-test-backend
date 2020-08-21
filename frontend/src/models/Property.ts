import { GeoJsonPoint, GeoJsonPolygon } from './GeoJson';
import { RiskLevel } from './Risk';
import { imageUrl } from '../utils/image';
import { generateName, generateRiskLevel } from '../utils/generators';

export interface Property {
  id: string;
  geocode_geo: GeoJsonPoint;
  parcel_geo: GeoJsonPolygon;
  building_geo: GeoJsonPolygon;
  image_bounds: number[];
  image_url: string;
}

export class PropertyDisplayItem {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  overlayImageUrl: string;
  riskLevel: RiskLevel;
  isFavorite: boolean;

  constructor(
    id: string,
    name: string,
    latitude: number,
    longitude: number,
    overlayImageUrl: string,
    riskLevel: RiskLevel,
    isFavorite: boolean
  ) {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.overlayImageUrl = overlayImageUrl;
    this.riskLevel = riskLevel;
    this.isFavorite = isFavorite;
  }

  public static fromProperty = (property: Property): PropertyDisplayItem => {
    const { id, geocode_geo } = property;
    const name: string = generateName(id);
    const latitude: number = geocode_geo.coordinates[0];
    const longitude: number = geocode_geo.coordinates[1];
    const overlayImageUrl: string = imageUrl(id);
    const riskLevel: RiskLevel = generateRiskLevel(id);
    const isFavorite: boolean = false;
    return new PropertyDisplayItem(id, name, latitude, longitude, overlayImageUrl, riskLevel, isFavorite);
  };
}
