import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import Catalog from '../Items/ItemListContainer';

const categories = [
    { id: 1, name: 'Carne', image: 'https://i.imgur.com/Nf9WdgN.png' },
    { id: 2, name: 'Pollo', image: 'https://i.imgur.com/Nf9WdgN.png' },
    { id: 3, name: 'Cerdo', image: 'https://i.imgur.com/Nf9WdgN.png' },
    { id: 4, name: 'Cordero', image: 'https://i.imgur.com/Nf9WdgN.png' },
];

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);

    // Efecto que escucha el scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`navbar bg-white text-primary py-4 transition-all duration-30´} }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex overflow-x-auto whitespace-nowrap py-2 space-x-4 justify-start lg:justify-center">
                    {categories.map(category => (
                        <Link
                            key={category.id}
                            to={`category-${category.id}`}
                            smooth={true}
                            className="text-center cursor-pointer hover:font-bold"
                        >
                            <div className="category-item flex-shrink-0">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-16 h-16 object-cover rounded-full"
                                />
                                <span className="block mt-2">{category.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Catalog categories={categories} />
        </div>
    );
};

export default Navbar;
