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

export async function getProperty(propertyId: string): Promise<Property | undefined> {
  const result: QueryResult = await getDbClient().query<Property>(getPropertyQuery(propertyId));
  return result.rows.length ? result.rows[0] : undefined;
}

export async function findAllProperties(): Promise<Property[]> {
  const result: QueryResult = await getDbClient().query<Property>('SELECT * from properties');
  return result.rows;
}
