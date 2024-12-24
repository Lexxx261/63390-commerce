import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const Catalog = ({ categories = [] }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'Products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    navigate(`/item/${product.id}`, { state: { product } });
  };

  if (!Array.isArray(categories)) {
    console.error('Error de Array');
  }

  return (
    <div className="catalog mt-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : (

        categories.length > 0 &&
        categories.map((category) => {
          const categoryProducts = products.filter((product) => product.category === category.id);

          return (
            <div key={category.id} id={`category-${category.id}`} className="category-section py-8">
              <h2 className="text-2xl font-bold text-center mb-4">{category.name}</h2>

              <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-lg">
                  {categoryProducts.map((product) => (
                    <div key={product.id} className="product-card p-4 border">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover mb-4 rounded-md"
                      />
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-800">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold mt-2">${product.price}</p>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className=""
                        >
                          <FontAwesomeIcon icon={faCartPlus} className="mr-2 size-7 hover:text-secondary" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Catalog;
