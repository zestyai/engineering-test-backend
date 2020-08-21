import express, { Express, Request, Response, Router } from 'express';
import env from 'env-var';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import expressStaticGzip from 'express-static-gzip';
import appRootPath from 'app-root-path';
import initPropertyService from './services/property.service';
import { initServer } from './server';

const portNumber: number = env.get('PORT').required().asPortNumber();
const frontendBuildPath: string = path.join(appRootPath.path, 'frontend/build');

async function initApp(): Promise<void> {
  const app: Express = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const router = Router();
  router.get('/', (req: Request, res: Response) => res.send('Spicy.ai API'));
  initPropertyService(router);

  app.use('/api', router);
  app.use('/', expressStaticGzip(frontendBuildPath, {}));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(frontendBuildPath, 'index.html'));
  });

  await initServer(app, portNumber);
}

(async () => initApp())();
