import React from 'react';
import styled from 'styled-components';
import { PropertiesListItem } from './PropertiesListItem';
import { PropertyDisplayItem } from '../../models/Property';

const Container = styled.div`
  max-width: 700px;
  margin: auto;
  padding: 60px 0;
`;

const Label = styled.div`
  font-weight: 900;
  font-size: 18px;
  margin-bottom: 40px;
`;

type Props = {
  properties: PropertyDisplayItem[];
};

export const PropertiesList = (props: Props) => (
  <Container>
    <Label>{`${props.properties.length} properties found:`}</Label>
    {props.properties.map((property: PropertyDisplayItem) => (
      <PropertiesListItem key={property.id} property={property} />
    ))}
  </Container>
);
