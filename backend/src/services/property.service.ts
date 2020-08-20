import { Application, Request, Response } from 'express';
import { Property } from '../models/Property';
import { findAllProperties, findPropertiesInRadius, getProperty } from '../db/queries';
import { downloadPropertyImage } from '../actions/property.actions';
import { GeoJsonPoint } from '../models/GeoJson';
import { isGeoJsonPointValid } from '../validations';

export default function (app: Application) {
  app.get('/property', async (req: Request, res: Response) => {
    if (hasSearchParams(req.query)) {
      let geoJsonPoint: GeoJsonPoint;
      let distance: number;
      try {
        geoJsonPoint = parseGeoJsonParam(req.query.geoJson);
        distance = parseDistanceParam(req.query.distance);
      } catch (error) {
        console.error(`Failed to parse search query params: ${error.message}`);
        res.status(400).send('Invalid property search query params');
        return;
      }
      const propertiesInRadius: Property[] = await findPropertiesInRadius(
        geoJsonPoint.coordinates[0],
        geoJsonPoint.coordinates[1],
        distance
      );
      res.json(propertiesInRadius);
      return;
    }

    const allProperties: Property[] = await findAllProperties();
    res.json(allProperties);
  });

  app.get('/property/:id', async (req: Request, res: Response) => {
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

  app.get('/property/:id/image', async (req: Request, res: Response) => {
    if (!hasIdParam(req.params)) {
      res.status(400).send('Missing `id` URL param');
      return;
    }

    // TODO call property.actions::transformImage() if Display Plus params are present

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

function hasSearchParams(params: { [key: string]: unknown }): params is { geoJson: string; distance: string } {
  return typeof params.geoJson === 'string' && typeof params.distance === 'string';
}

function parseGeoJsonParam(geoJsonParam: string): GeoJsonPoint {
  let geoJsonPoint: unknown;
  try {
    geoJsonPoint = JSON.parse(geoJsonParam);
  } catch (error) {
    throw Error('Invalid JSON object');
  }
  if (!isGeoJsonPointValid(geoJsonPoint)) {
    throw Error('Invalid GeoJSON Point object');
  }
  return geoJsonPoint;
}

function parseDistanceParam(distanceParam: string): number {
  let distance: number;
  try {
    distance = parseFloat(distanceParam);
    if (!isNaN(distance)) {
      return distance;
    }
  } catch (error) {
    console.warn(`Failed to parse distance '${distanceParam}'`);
  }
  throw Error('Invalid distance param');
}
