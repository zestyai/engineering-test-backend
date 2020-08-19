import { Express } from 'express';
import { initDbConnection } from './db/client';

export async function initServer(app: Express, port: number): Promise<void> {
  try {
    await initDbConnection();
  } catch (error) {
    console.error(`Failed to connect to PostgreSQL database: ${error.message}`);
  }

  try {
    app.listen(port, () => {
      console.info(`Spicy API listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error.message);
  }
}
