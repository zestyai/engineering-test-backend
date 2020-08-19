// import { createCanvas } from 'canvas';
import { Property } from '../models/Property';
import { downloadFile } from '../utils/files';
// import { drawImage, drawOverlay, ImageFileType, toImageBuffer } from '../utils/images';

export async function downloadPropertyImage(property: Property): Promise<Buffer> {
  return downloadFile(property.image_url);
}

/* TODO
export function transformImage(
  property: Property,
  imageFile: Buffer,
  fileType: ImageFileType = ImageFileType.jpg,
  parcelOverlay: boolean = false,
  buildingOverlay: boolean = false,
  resolution: number = 1250
): Buffer {
  const canvas = createCanvas(resolution, resolution);
  const ctx = canvas.getContext('2d');

  drawImage(ctx, imageFile, resolution);

  if (parcelOverlay) {
    // TODO convert parcel geo coordinates to image coordinates
    const polygonPoints: { x: number; y: number }[] = [];
    drawOverlay(ctx, polygonPoints, 'red');
  }

  if (buildingOverlay) {
    // TODO convert building geo coordinates to image coordinates
    const polygonPoints: { x: number; y: number }[] = [];
    drawOverlay(ctx, polygonPoints, 'blue');
  }

  return toImageBuffer(canvas, fileType);
}
*/
