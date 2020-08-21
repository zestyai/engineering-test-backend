import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SearchParams } from '../../utils/queryParams';
import { PropertiesContainer } from '../properties/PropertiesContainer';
import { SearchBox } from './SearchBox';

type Props = {
  searchParams?: SearchParams;
  routeComponentProps: RouteComponentProps;
};

export const SearchContainer = (props: Props) => {
  let propertiesContainer: ReactElement | undefined;

  if (typeof props.searchParams !== 'undefined') {
    propertiesContainer = <PropertiesContainer searchParams={props.searchParams} />;
  }
  return (
    <div>
      <SearchBox
        searchParams={props.searchParams}
        onSearch={(lat: number, lon: number, dist: number) => handleSearch(lat, lon, dist, props.routeComponentProps)}
      />
      {propertiesContainer}
    </div>
  );
};

function handleSearch(latitude: number, longitude: number, distance: number, routeComponentProps: RouteComponentProps) {
  routeComponentProps.history.push(`/search?lat=${latitude}&lon=${longitude}&dist=${distance}`);
}
