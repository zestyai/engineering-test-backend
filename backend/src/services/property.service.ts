import { Application } from 'express';
import { Property } from '../models/Property';
import { findAllProperties, getProperty } from '../db/queries';

export default function (app: Application) {
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
}
