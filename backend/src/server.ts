import { Express } from 'express';

export async function initServer(app: Express, port: number): Promise<void> {
  try {
    app.listen(port, () => {
      console.info(`Spicy API listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}
