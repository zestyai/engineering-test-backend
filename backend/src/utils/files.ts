import axios, { AxiosResponse } from 'axios';

export async function downloadFile(url: string): Promise<Buffer> {
  const response: AxiosResponse<ArrayBuffer> = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  return Buffer.from(response.data);
}
