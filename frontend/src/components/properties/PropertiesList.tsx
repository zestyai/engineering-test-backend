import React from 'react';
import { PropertiesListItem } from './PropertiesListItem';
import { Property } from '../../models/Property';

type Props = {
  properties: Property[];
};

export const PropertiesList = (props: Props) => (
  <div>
    {props.properties.map((property: Property, index: number) => (
      <PropertiesListItem key={index} />
    ))}
  </div>
);
