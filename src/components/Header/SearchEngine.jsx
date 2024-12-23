import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const SearchEngine = () => {
  const [queryText, setQueryText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Obtener todos los productos de Firebase al cargar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsRef);

        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos según el texto ingresado
  const handleSearch = (searchTerm) => {
    setQueryText(searchTerm);
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    if (lowerCaseSearchTerm.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm)
    );

    setFilteredProducts(results);
  };

  const toggleSearchBar = () => {
    setIsVisible(!isVisible);
    setFilteredProducts([]); // Limpiar resultados al cerrar el buscador
    setQueryText('');       // Limpiar el texto del input
  };

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faSearch}
        className="text-primary text-xl cursor-pointer"
        onClick={toggleSearchBar}
      />
      <div
        className={`absolute top-10 left-0 right-0 bg-white border rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
          isVisible ? 'transform scale-y-100' : 'transform scale-y-0'
        } origin-top`}
      >
        <input
          type="text"
          placeholder="Buscar productos..."
          value={queryText}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-2 border-b border-gray-300 focus:outline-none"
        />
        <ul className="max-h-48 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                {product.name}
              </li>
            ))
          ) : (
            queryText && <li className="p-2 text-gray-500">No se encontraron productos</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchEngine;
