import React from 'react';
import { PropertiesList } from './PropertiesList';
import { SearchParams } from '../../utils/queryParams';

type Props = {
  filterFavorites?: boolean;
  searchParams?: SearchParams;
};

export const PropertiesContainer = (props: Props) => {
  // todo fetch data
  console.log('Properties!');

  return <PropertiesList properties={[]} />;
};
