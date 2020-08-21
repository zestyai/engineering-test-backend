type SearchQueryParams = {
  lat: string;
  lon: string;
  dist: string;
};

export type SearchParams = {
  lat: number;
  lon: number;
  dist: number;
};

export function hasSearchQueryParams(params: unknown): params is SearchQueryParams {
  if (typeof params !== 'object' || params == null) return false;
  const { lat, lon, dist } = params as any;
  return typeof lat === 'string' && typeof lon === 'string' && typeof dist === 'string';
}

export function parseSearchQueryParams(params: SearchQueryParams): SearchParams {
  const lat = parseFloat(params.lat);
  const lon = parseFloat(params.lon);
  const dist = parseFloat(params.dist);

  if (isNaN(lat) || isNaN(lon) || isNaN(dist)) {
    throw Error('Unable to parse search query params');
  }

  return { lat, lon, dist };
}
