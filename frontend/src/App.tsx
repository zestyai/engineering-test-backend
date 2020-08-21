import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SearchPageWithRouter } from './pages/search';
import { FavoritesPage } from './pages/favorites';
import { IndexPage } from './pages';
import { FourOFourPage } from './pages/404';

export const App = () => (
  <Router>
    <Switch>
      <Route path='/search' component={SearchPageWithRouter} />
      <Route path='/favorites' exact component={FavoritesPage} />
      <Route path='/' exact component={IndexPage} />
      <Route path='/' component={FourOFourPage} />
    </Switch>
  </Router>
);
