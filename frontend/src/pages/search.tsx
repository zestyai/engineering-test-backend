import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import { hasSearchQueryParams, parseSearchQueryParams, SearchParams } from '../utils/queryParams';
import { SearchContainer } from '../components/search/SearchContainer';
import { BannerSize, Header, Page } from '../components/Header';

const SearchPage = (props: RouteComponentProps) => {
  const queryParams: ParsedQuery = queryString.parse(props.location.search);
  let searchParams: SearchParams | undefined;

  if (hasSearchQueryParams(queryParams)) {
    try {
      searchParams = parseSearchQueryParams(queryParams);
    } catch (error) {
      console.warn('Invalid search query params', queryParams);
    }
  }
  return (
    <div>
      <Header selectedPage={Page.search} bannerSize={BannerSize.tall} />
      <SearchContainer searchParams={searchParams} routeComponentProps={props} />
    </div>
  );
};

export const SearchPageWithRouter = withRouter(SearchPage);
