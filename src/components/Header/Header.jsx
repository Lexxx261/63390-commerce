import React from 'react';
import CartWidget from './CartWidget';
import SearchEngine from './SearchEngine';
import logo from '../../assets/logo-emm.png';

const Header = () => {
  const handleSearch = (query) => {
    console.log('Buscando:', query);
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Company Logo" className="h-16 w-16 object-contain mr-4" />
          <h1 className="text-primary text-2xl">Estudio Burger</h1>
        </div>
        <div className="flex items-center gap-4">
          <SearchEngine onSearch={handleSearch} />
          <CartWidget />
        </div>
      </div>
    </header>
  );
};

export default Header;
