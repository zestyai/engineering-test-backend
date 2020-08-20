// @ts-nocheck
import { loadImage, Canvas, CanvasRenderingContext2D } from 'canvas';

export enum ImageFileType {
  jpg = 'jpg',
  png = 'png',
}

export function drawImage(ctx: CanvasRenderingContext2D, imageFile: Buffer, resolution: number): void {
  const image = loadImage(imageFile);
  ctx.drawImage(image, 0, 0, resolution, resolution);
}

export function drawOverlay(
  ctx: CanvasRenderingContext2D,
  polygonPoints: { x: number; y: number }[],
  color: string
): void {
  ctx.strokeStyle = `2px solid ${color}`;
  ctx.beginPath();
  for (const point of polygonPoints) {
    ctx.lineTo(point.x, point.y);
  }
  ctx.closePath();
  ctx.stroke();
}

export function toImageBuffer(canvas: Canvas, fileType: ImageFileType): Buffer {
  const mimeType: string = mimeTypeForFileType(fileType);
  // @ts-ignore Missing type definition for this signature
  // https://www.npmjs.com/package/canvas#createimagedata
  return canvas.toBuffer(mimeType);
}

export function mimeTypeForFileType(fileType: ImageFileType): string {
  switch (fileType) {
    case ImageFileType.jpg:
      return 'image/jpeg';
    case ImageFileType.png:
      return 'image/png';
  }
}
