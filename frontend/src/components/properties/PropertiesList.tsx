import React from 'react';
import styled from 'styled-components';
import { PropertiesListItem } from './PropertiesListItem';
import { PropertyDisplayItem } from '../../models/Property';

const Container = styled.div`
  max-width: 700px;
  margin: auto;
  padding: 40px 0;
`;

type Props = {
  properties: PropertyDisplayItem[];
};

export const PropertiesList = (props: Props) => (
  <Container>
    <div>{`${props.properties.length} properties found:`}</div>
    {props.properties.map((property: PropertyDisplayItem) => (
      <PropertiesListItem key={property.id} property={property} />
    ))}
  </Container>
);
