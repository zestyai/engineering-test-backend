import express, { Express } from 'express';
import env from 'env-var';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initServer } from './server';
import { findAllProperties, getProperty } from './db/queries';
import { Property } from './models/Property';

const portNumber: number = env.get('PORT').required().asPortNumber();

async function initApp(): Promise<void> {
  const app: Express = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/', (req, res) => res.send('Spicy.ai API'));

  app.get('/property', async (req, res) => {
    const properties: Property[] = await findAllProperties();
    res.json(properties);
  });

  app.get('/property/:id', async (req, res) => {
    const requestParams: { [key: string]: unknown } = req.params;
    if (typeof requestParams.id !== 'string') {
      res.status(400).send('Missing `id` URL param');
      return;
    }

    const property: Property | undefined = await getProperty(requestParams.id);
    if (typeof property === 'undefined') {
      res.status(404).send(`Property '${requestParams.id}' not found`);
      return;
    }

    res.send(property);
  });

  await initServer(app, portNumber);
}

(async () => initApp())();
