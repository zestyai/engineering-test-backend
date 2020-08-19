import { Application } from 'express';
import { Property } from '../models/Property';
import { findAllProperties, getProperty } from '../db/queries';
import { downloadPropertyImage } from '../actions/property.actions';

export default function (app: Application) {
  app.get('/property', async (req, res) => {
    const properties: Property[] = await findAllProperties();
    res.json(properties);
  });

  app.get('/property/:id', async (req, res) => {
    if (!hasIdParam(req.params)) {
      res.status(400).send('Missing `id` URL param');
      return;
    }

    const property: Property | undefined = await getProperty(req.params.id);
    if (typeof property === 'undefined') {
      res.status(404).send(`Property '${req.params.id}' not found`);
      return;
    }

    res.send(property);
  });

  app.get('/property/:id/image', async (req, res) => {
    if (!hasIdParam(req.params)) {
      res.status(400).send('Missing `id` URL param');
      return;
    }

    const property: Property | undefined = await getProperty(req.params.id);
    if (typeof property === 'undefined') {
      res.status(404).send(`Property '${req.params.id}' not found`);
      return;
    }

    let imageFile: Buffer;
    try {
      imageFile = await downloadPropertyImage(property);
    } catch (error) {
      console.error(error);
      res.status(503).send(`Failed to download image of property '${property.id}'`);
      return;
    }

    res.contentType('image/tiff');
    res.setHeader('content-disposition', 'inline');
    res.send(imageFile);
  });
}

function hasIdParam(params: { [key: string]: unknown }): params is { id: string } {
  return typeof params.id === 'string';
}
