import sharp from 'sharp';
import { loadImage, Canvas, CanvasRenderingContext2D } from 'canvas';

export enum ImageFileType {
  jpg = 'jpg',
  png = 'png',
}

export async function drawImage(ctx: CanvasRenderingContext2D, imageFile: Buffer, resolution: number): Promise<void> {
  const resizedBuffer: Buffer = await sharp(imageFile).resize(resolution, resolution).jpeg().toBuffer();
  const image = await loadImage(resizedBuffer);
  ctx.drawImage(image, 0, 0, resolution, resolution);
}

export function drawOverlay(
  ctx: CanvasRenderingContext2D,
  polygonPoints: { x: number; y: number }[],
  color: string
): void {
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.fillStyle = `${color}50`;
  ctx.beginPath();
  for (const point of polygonPoints) {
    ctx.lineTo(point.x, point.y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

export function toImageBuffer(canvas: Canvas, fileType: ImageFileType): Buffer {
  const mimeType: string = mimeTypeForFileType(fileType);
  // @ts-ignore TypeScript is unable to resolve signature with variable mimeType at transpile time
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
