import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Header/Navbar';
import  Catalog from './components/Items/ItemListContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Catalog />
    </div>
  );
}

export default App;