import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';

const Container = styled.div`
  padding-top: 20px;
  width: 100%;
  background-color: white;
`;

const Banner = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ea5a46;
`;

const Logo = styled.img`
  display: block;
  margin: auto;
  width: 164px;
`;

const Items = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 15px;

  & a {
    text-decoration: none !important;
  }
`;

const Item = styled.div<{ selected?: boolean }>`
  width: 180px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 15px;
  color: ${(props) => (props.selected ? '#ea5a46' : 'black')};
  transition: color 100ms;

  :hover {
    color: #ea5a46;
  }
`;

type Props = {
  selectedPage?: Page;
};

export enum Page {
  index = 'index',
  search = 'search',
  favorites = 'favorites',
}

export const Header = (props: Props) => (
  <Container>
    <Logo src={logo} alt='Spicy.ai' />
    <Items>
      {props.selectedPage === Page.index ? (
        <Item selected>All properties</Item>
      ) : (
        <Link to='/'>
          <Item>All properties</Item>
        </Link>
      )}
      {props.selectedPage === Page.search ? (
        <Item selected>Search</Item>
      ) : (
        <Link to='/search'>
          <Item>Search</Item>
        </Link>
      )}
      {props.selectedPage === Page.favorites ? (
        <Item selected>Favorites</Item>
      ) : (
        <Link to='/favorites'>
          <Item>Favorites</Item>
        </Link>
      )}
    </Items>
    <Banner />
  </Container>
);
