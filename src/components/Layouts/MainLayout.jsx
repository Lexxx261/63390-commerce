import React from 'react';
import Header from '../Header/Header';
import Navbar from '../Header/Navbar';

const MainLayout = ({ children }) => (
  <>
    <Header />
    <Navbar />
    <main>{children}</main>
  </>
);

export default MainLayout;
