import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PropertiesList } from './PropertiesList';
import { SearchParams } from '../../utils/queryParams';
import { Property, PropertyDisplayItem } from '../../models/Property';
import { findAllProperties } from '../../utils/apiClient';
import PuffLoader from 'react-spinners/PuffLoader';

const Loader = styled(PuffLoader)`
  margin: auto;
`;

type Props = {
  filterFavorites?: boolean;
  searchParams?: SearchParams;
};

export const PropertiesContainer = (props: Props) => {
  const [properties, setProperties] = useState<Property[]>();

  useEffect(() => {
    (async () => {
      try {
        const fetchedProperties: Property[] = await findAllProperties();
        setProperties(fetchedProperties);
      } catch (error) {
        console.error(`Failed to fetch properties: ${error.message}`);
      }
    })();
  }, []);

  if (!properties) {
    return <Loader color='#ea5a46' />;
  }

  const propertyDisplayItems: PropertyDisplayItem[] = properties.map(PropertyDisplayItem.fromProperty);
  return <PropertiesList properties={propertyDisplayItems} />;
};
