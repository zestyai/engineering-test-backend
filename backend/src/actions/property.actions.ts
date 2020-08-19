import { Property } from '../models/Property';
import { downloadFile } from '../utils/files';

export async function downloadPropertyImage(property: Property): Promise<Buffer> {
  return downloadFile(property.image_url);
}
