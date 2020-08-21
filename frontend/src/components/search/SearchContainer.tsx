import React from 'react';
import { SearchParams } from '../../utils/queryParams';
import { PropertiesContainer } from '../properties/PropertiesContainer';

type Props = {
  searchParams?: SearchParams;
};

export const SearchContainer = (props: Props) => {
  if (typeof props.searchParams !== 'undefined') {
    return <PropertiesContainer searchParams={props.searchParams} />;
  }
  return <div>Empty search page</div>;
};
