import { Client, QueryResult } from 'pg';
import env from 'env-var';

const databaseUrl: string = env.get('DATABASE_URL').required().asUrlString();
let dbClient: Client;

export async function initDbConnection() {
  async function testConnection(resolve: any, delaySeconds = 2) {
    try {
      dbClient = new Client(databaseUrl);
      await dbClient.connect();
      console.info('Connected to PostgreSQL database');
      resolve();
    } catch (err) {
      console.error(err.message);
      console.info(`Waiting for database... Retrying in ${delaySeconds} seconds.`);
      setTimeout(async () => testConnection(resolve, delaySeconds * 2), delaySeconds * 1000);
    }
  }

  return new Promise(async (resolve) => {
    await testConnection(resolve);
  });
}

export async function findAllProperties(): Promise<object[]> {
  const result: QueryResult = await dbClient.query<any>('SELECT * from properties');
  return result.rows;
}
