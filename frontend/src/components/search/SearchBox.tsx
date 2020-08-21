import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchParams } from '../../utils/queryParams';
import { Field, FieldType } from './Field';

const DEFAULT_LATITUDE = -80.0823;
const DEFAULT_LONGITUDE = 26.3868;
const DEFAULT_DISTANCE = 10000;

const Container = styled.div`
  margin: -90px auto 0;
  width: 540px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 15px 30px 0 #0002;
  padding: 35px 45px 25px;
  box-sizing: border-box;
`;

const Button = styled.button`
  display: block;
  appearance: none;
  margin: 35px auto 0;
  padding: 14px 18px;
  border: 0;
  border-radius: 7px;
  background: #ea5a46;
  text-align: center;
  font-family: 'Circular Std', sans-serif;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
  transition: box-shadow 100ms;
  letter-spacing: 0.5px;

  &:hover {
    box-shadow: 0 4px 7px 0 #0006;
  }
`;

type Props = {
  searchParams?: SearchParams;
  onSearch: (lat: number, lon: number, dist: number) => void;
};

export const SearchBox = (props: Props) => {
  const [latitude, setLatitude] = useState<number>(props.searchParams?.lat ?? DEFAULT_LATITUDE);
  const [longitude, setLongitude] = useState<number>(props.searchParams?.lon ?? DEFAULT_LONGITUDE);
  const [distance, setDistance] = useState<number>(props.searchParams?.dist ?? DEFAULT_DISTANCE);

  return (
    <Container>
      <div>
        <Field
          fieldType={FieldType.coordinate}
          key='lat'
          id='lat'
          label='Latitude (deg)'
          value={latitude}
          onChange={(value: number) => setLatitude(value)}
        />
        <Field
          fieldType={FieldType.coordinate}
          key='lon'
          id='lon'
          label='Longitude (deg)'
          value={longitude}
          onChange={(value: number) => setLongitude(value)}
        />
        <Field
          fieldType={FieldType.distance}
          key='dist'
          id='dist'
          label='Distance (m)'
          value={distance}
          onChange={(value: number) => setDistance(value)}
        />
      </div>
      <Button onClick={() => props.onSearch(latitude, longitude, distance)}>Search</Button>
    </Container>
  );
};
