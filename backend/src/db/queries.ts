import { QueryResult } from 'pg';
import { getDbClient } from './client';
import { Property } from '../models/Property';

const getPropertyQuery = (propertyId: string) => `
SELECT
  *
FROM
  properties
WHERE
  id='${propertyId}'
`;

const findAllPropertiesQuery = `
SELECT
  *
FROM
  properties
`;

const findPropertiesInRadiusQuery = (lat: number, lon: number, radiusMeters: number) => `
SELECT
  *
FROM
  properties
`;

export async function getProperty(propertyId: string): Promise<Property | undefined> {
  const result: QueryResult = await getDbClient().query<Property>(getPropertyQuery(propertyId));
  return result.rows.length ? result.rows[0] : undefined;
}

export async function findAllProperties(): Promise<Property[]> {
  const result: QueryResult = await getDbClient().query<Property>(findAllPropertiesQuery);
  return result.rows;
}

export async function findPropertiesInRadius(lat: number, lon: number, radiusMeters: number): Promise<Property[]> {
  const result: QueryResult = await getDbClient().query<Property>(findPropertiesInRadiusQuery(lat, lon, radiusMeters));
  return result.rows;
}
