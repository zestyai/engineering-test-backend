import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import { hasSearchQueryParams, parseSearchQueryParams, SearchParams } from '../utils/queryParams';
import { SearchContainer } from '../components/search/SearchContainer';

const SearchPage = (props: RouteComponentProps) => {
  const queryParams: ParsedQuery = queryString.parse(props.location.search);
  if (hasSearchQueryParams(queryParams)) {
    try {
      const searchParams: SearchParams = parseSearchQueryParams(queryParams);
      return <SearchContainer searchParams={searchParams} />;
    } catch (error) {
      console.warn('Invalid search query params', queryParams);
    }
  }
  return <SearchContainer />;
};

export const SearchPageWithRouter = withRouter(SearchPage);
