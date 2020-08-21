import axios, { AxiosResponse } from 'axios';
import { Property } from '../models/Property';
import { GeoJsonPoint } from '../models/GeoJson';

export async function findAllProperties(): Promise<Property[]> {
  const response: AxiosResponse<Property[]> = await axios.get('/api/property');
  return response.data;
}

export async function searchProperties(latitude: number, longitude: number, distance: number): Promise<Property[]> {
  const geoJsonPoint: GeoJsonPoint = { type: 'Point', coordinates: [latitude, longitude] };
  const response: AxiosResponse<Property[]> = await axios.get(
    `/api/property?geoJson=${JSON.stringify(geoJsonPoint)}&distance=${distance}`
  );
  return response.data;
}
