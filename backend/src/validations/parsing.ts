import { ImageFileType } from '../utils/images';
import { GeoJsonPoint } from '../models/GeoJson';
import { isGeoJsonPointValid } from './validations';

export function hasIdParam(params: { [key: string]: unknown }): params is { id: string } {
  return typeof params.id === 'string';
}

export function hasFileTypeParam(params: { [key: string]: unknown }): params is { fileType: string } {
  return typeof params.fileType === 'string';
}

export function hasParcelOverlayParam(params: { [key: string]: unknown }): params is { parcelOverlay: string } {
  return typeof params.parcelOverlay === 'string';
}

export function hasBuildingOverlayParam(params: { [key: string]: unknown }): params is { buildingOverlay: string } {
  return typeof params.buildingOverlay === 'string';
}

export function hasResolutionParam(params: { [key: string]: unknown }): params is { resolution: string } {
  return typeof params.resolution === 'string';
}

export function hasSearchParams(params: { [key: string]: unknown }): params is { geoJson: string; distance: string } {
  return typeof params.geoJson === 'string' && typeof params.distance === 'string';
}

export function parseFileTypeParam(fileTypeParam: string): ImageFileType {
  if (Object.keys(ImageFileType).includes(fileTypeParam)) {
    return fileTypeParam as ImageFileType;
  }
  throw Error('Invalid fileType param');
}

export function parseOverlayParam(overlayParam: string): boolean {
  if (overlayParam === 'true') return true;
  if (overlayParam === 'false') return false;
  throw Error('Invalid overlay param');
}

export function parseResolutionParam(resolutionParam: string): number {
  let resolution: number;
  try {
    resolution = parseInt(resolutionParam);
    if (!isNaN(resolution)) {
      return resolution;
    }
  } catch (error) {
    console.warn(`Failed to parse resolution '${resolutionParam}'`);
  }
  throw Error('Invalid resolution param');
}

export function parseGeoJsonParam(geoJsonParam: string): GeoJsonPoint {
  let geoJsonPoint: unknown;
  try {
    geoJsonPoint = JSON.parse(geoJsonParam);
  } catch (error) {
    throw Error('Invalid JSON object');
  }
  if (!isGeoJsonPointValid(geoJsonPoint)) {
    throw Error('Invalid GeoJSON Point object');
  }
  return geoJsonPoint;
}

export function parseDistanceParam(distanceParam: string): number {
  let distance: number;
  try {
    distance = parseFloat(distanceParam);
    if (!isNaN(distance)) {
      return distance;
    }
  } catch (error) {
    console.warn(`Failed to parse distance '${distanceParam}'`);
  }
  throw Error('Invalid distance param');
}
