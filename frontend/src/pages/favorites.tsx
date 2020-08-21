import React from 'react';
import { PropertiesContainer } from '../components/properties/PropertiesContainer';

export const FavoritesPage = () => (
  <div>
    Favorites
    <PropertiesContainer filterFavorites={true} />
  </div>
);
