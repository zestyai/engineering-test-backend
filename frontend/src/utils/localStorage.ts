import { get, set } from 'local-storage';

const FAVORITE_PROPERTY_IDS_KEY = 'favorite_property_ids';

export function readFavoriteProperties(): Set<string> {
  return new Set(get<string[]>(FAVORITE_PROPERTY_IDS_KEY) ?? []);
}

export function setFavoriteProperty(propertyId: string): Set<string> {
  const favoriteIds: Set<string> = readFavoriteProperties();
  favoriteIds.add(propertyId);
  set<string[]>(FAVORITE_PROPERTY_IDS_KEY, Array.from(favoriteIds));
  return favoriteIds;
}

export function unsetFavoriteProperty(propertyId: string): Set<string> {
  const favoriteIds: Set<string> = readFavoriteProperties();
  favoriteIds.delete(propertyId);
  set<string[]>(FAVORITE_PROPERTY_IDS_KEY, Array.from(favoriteIds));
  return favoriteIds;
}
