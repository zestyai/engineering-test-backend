import { createCanvas } from 'canvas';
import { Property } from '../models/Property';
import { downloadFile } from '../utils/files';
import { drawImage, drawOverlay, ImageFileType, toImageBuffer } from '../utils/images';
import { coordinatesToPoints } from '../utils/geo';

export async function downloadPropertyImage(property: Property): Promise<Buffer> {
  return downloadFile(property.image_url);
}

export async function transformImage(
  property: Property,
  imageFile: Buffer,
  fileType: ImageFileType,
  parcelOverlay: boolean,
  buildingOverlay: boolean,
  resolution: number
): Promise<Buffer> {
  const canvas = createCanvas(resolution, resolution);
  const ctx = canvas.getContext('2d');

  await drawImage(ctx, imageFile, resolution);

  if (parcelOverlay) {
    const polygonPoints: { x: number; y: number }[] = coordinatesToPoints(
      property.parcel_geo.coordinates,
      property.image_bounds,
      resolution
    );
    drawOverlay(ctx, polygonPoints, '#ffdf3c');
  }

  if (buildingOverlay) {
    const polygonPoints: { x: number; y: number }[] = coordinatesToPoints(
      property.building_geo.coordinates,
      property.image_bounds,
      resolution
    );
    drawOverlay(ctx, polygonPoints, '#ff174e');
  }

  return toImageBuffer(canvas, fileType);
}
