import React from 'react';
import Header from '../Header/Header';

const SimpleLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);

export default SimpleLayout;
