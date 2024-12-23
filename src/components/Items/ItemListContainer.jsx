import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const categories = [1, 2, 3, 4];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'Products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    // Redirigir a ItemDetail.jsx con el id del producto
    navigate(`/item/${product.id}`, { state: { product } });
  };

  return (
    <div className="catalog mt-8">
      {categories.map((categoryId) => {
        const categoryProducts = products.filter(product => product.category === categoryId);

        return (
          <div key={categoryId} id={`category-${categoryId}`} className="category-section py-8">
            <h2 className="text-2xl font-bold text-center mb-4">Category {categoryId}</h2>

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
                    <div className='flex'>
                      <p className="text-lg font-bold mt-2">${product.price}</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-primary font-bold py-2 px-4 rounded flex items-center"
                      >
                        <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Catalog;
