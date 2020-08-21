import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

type Props = {
  selectedPage: Page;
};

export enum Page {
  index = 'index',
  search = 'search',
  favorites = 'favorites',
}

export const Header = (props: Props) => (
  <div>
    <img src={logo} alt='Spicy.ai' />
    <Link to='/'>Index</Link>
    <Link to='/search'>Search</Link>
    <Link to='/favorites'>Favorites</Link>
  </div>
);
