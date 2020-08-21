import React from 'react';
import styled from 'styled-components';
import { PropertiesListItem } from './PropertiesListItem';
import { Property } from '../../models/Property';

const Container = styled.div`
  max-width: 700px;
  margin: auto;
  padding: 40px 0;
`;

type Props = {
  properties: Property[];
};

export const PropertiesList = (props: Props) => (
  <Container>
    <div>{`${props.properties.length} properties found:`}</div>
    {props.properties.map((property: Property, index: number) => (
      <PropertiesListItem key={index} />
    ))}
  </Container>
);
