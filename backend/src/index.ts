import express, { Express } from 'express';
import env from 'env-var';
import cors from 'cors';
import bodyParser from 'body-parser';
import initPropertyService from './services/property.service';
import { initServer } from './server';

const portNumber: number = env.get('PORT').required().asPortNumber();

async function initApp(): Promise<void> {
  const app: Express = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/', (req, res) => res.send('Spicy.ai API'));
  initPropertyService(app);

  await initServer(app, portNumber);
}

(async () => initApp())();
