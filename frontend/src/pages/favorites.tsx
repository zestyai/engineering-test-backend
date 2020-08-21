import React from 'react';
import { PropertiesContainer } from '../components/properties/PropertiesContainer';
import { Header, Page } from '../components/Header';

export const FavoritesPage = () => (
  <div>
    <Header selectedPage={Page.favorites} />
    <PropertiesContainer filterFavorites={true} />
  </div>
);
