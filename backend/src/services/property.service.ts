import { Application, Request, Response } from 'express';
import { Property } from '../models/Property';
import { findAllProperties, findPropertiesInRadius, getProperty } from '../db/queries';
import { downloadPropertyImage, transformImage } from '../actions/property.actions';
import { GeoJsonPoint } from '../models/GeoJson';
import {
  hasBuildingOverlayParam,
  hasFileTypeParam,
  hasIdParam,
  hasParcelOverlayParam,
  hasResolutionParam,
  hasSearchParams,
  parseDistanceParam,
  parseFileTypeParam,
  parseGeoJsonParam,
  parseOverlayParam,
  parseResolutionParam,
} from '../validations/parsing';
import { ImageFileType, mimeTypeForFileType } from '../utils/images';

export default function (app: Application): void {
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

    let fileType: ImageFileType = ImageFileType.jpg;
    let parcelOverlay: boolean = false;
    let buildingOverlay: boolean = false;
    let resolution: number = 1250;

    if (hasFileTypeParam(req.query)) {
      try {
        fileType = parseFileTypeParam(req.query.fileType);
      } catch (error) {
        console.warn(error.message);
        res.status(400).send('Invalid `fileType` query param');
        return;
      }
    }

    if (hasParcelOverlayParam(req.query)) {
      try {
        parcelOverlay = parseOverlayParam(req.query.parcelOverlay);
      } catch (error) {
        console.warn(error.message);
        res.status(400).send('Invalid `parcelOverlay` query param');
        return;
      }
    }

    if (hasBuildingOverlayParam(req.query)) {
      try {
        buildingOverlay = parseOverlayParam(req.query.buildingOverlay);
      } catch (error) {
        console.warn(error.message);
        res.status(400).send('Invalid `buildingOverlay` query param');
        return;
      }
    }

    if (hasResolutionParam(req.query)) {
      try {
        resolution = parseResolutionParam(req.query.resolution);
      } catch (error) {
        console.warn(error.message);
        res.status(400).send('Invalid `resolution` query param');
        return;
      }
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

    const transformedImage: Buffer = await transformImage(
      property,
      imageFile,
      fileType,
      parcelOverlay,
      buildingOverlay,
      resolution
    );

    const mimeType: string = mimeTypeForFileType(fileType);
    res.contentType(mimeType);
    res.setHeader('content-disposition', 'inline');
    res.send(transformedImage);
  });
}
