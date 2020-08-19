import { QueryResult } from 'pg';
import { getDbClient } from './client';
import { Property } from '../models/Property';

const getPropertyQuery = (propertyId: string) => `
SELECT
  *
FROM
  properties
WHERE
  id='${propertyId}';
`;

const findAllPropertiesQuery = `
SELECT
  *
FROM
  properties;
`;

const findPropertiesInRadiusQuery = (lat: number, lon: number, radiusMeters: number) => `
SELECT
  *
FROM
  properties p
WHERE
  ST_DWithin('SRID=4326;POINT(${lat} ${lon})', p.geocode_geo, ${radiusMeters});
`;

export async function getProperty(propertyId: string): Promise<Property | undefined> {
  const query = getPropertyQuery(propertyId);
  const result: QueryResult = await getDbClient().query<Property>(query);
  return result.rows.length ? result.rows[0] : undefined;
}

export async function findAllProperties(): Promise<Property[]> {
  const result: QueryResult = await getDbClient().query<Property>(findAllPropertiesQuery);
  return result.rows;
}

export async function findPropertiesInRadius(lat: number, lon: number, radiusMeters: number): Promise<Property[]> {
  const query = findPropertiesInRadiusQuery(lat, lon, radiusMeters);
  const result: QueryResult = await getDbClient().query<Property>(query);
  return result.rows;
}
