import React from 'react';
import { SearchParams } from '../../utils/queryParams';

type Props = Partial<SearchParams>;

export const SearchContainer = (props: Props) => {
  return <div>{JSON.stringify(props)}</div>;
};
