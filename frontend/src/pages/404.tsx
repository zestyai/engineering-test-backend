import React from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';

const Label = styled.div`
  width: 200px;
  text-align: center;
  margin: 50px auto;
`;

export const FourOFourPage = () => (
  <div>
    <Header />
    <Label>404 - Page not found</Label>
  </div>
);
