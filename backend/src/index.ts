import express, { Express } from 'express';
import env from 'env-var';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initServer } from './server';
import { findAllProperties } from './database';

const portNumber: number = env.get('PORT').required().asPortNumber();

async function initApp(): Promise<void> {
  const app: Express = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/', (req, res) => res.send('Spicy.ai API'));

  app.get('/property', async (req, res) => {
    const properties = await findAllProperties();
    res.send(properties);
  });

  await initServer(app, portNumber);
}

(async () => initApp())();
