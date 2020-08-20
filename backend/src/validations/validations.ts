import * as yup from 'yup';
import { GeoJsonPoint } from '../models/GeoJson';

const geoJsonPointSchema: yup.ObjectSchema = yup.object().shape({
  type: yup.string().required().equals(['Point'], 'Only the Point GeoJSON geometry type is supported'),
  coordinates: yup
    .array()
    .of(yup.number())
    .required()
    .min(2, 'You must supply 2 coordinates [lat, lon]')
    .max(2, 'You must supply 2 coordinates [lat, lon]'),
});

export function isGeoJsonPointValid(geoJsonPoint: unknown): geoJsonPoint is GeoJsonPoint {
  try {
    geoJsonPointSchema.validateSync(geoJsonPoint);
    return true;
  } catch (error) {
    console.warn(`Invalid GeoJSON point: ${error.message}`);
    return false;
  }
}
