import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const categories = [
    { id: 1, name: 'Category 1', image: 'https://i.imgur.com/Nf9WdgN.png' },
    { id: 2, name: 'Category 2', image: 'https://i.imgur.com/Nf9WdgN.png' },
    { id: 3, name: 'Category 3', image: 'https://i.imgur.com/Nf9WdgN.png' },
    { id: 4, name: 'Category 4', image: 'https://i.imgur.com/Nf9WdgN.png' },
    { id: 5, name: 'Category 5', image: 'https://i.imgur.com/Nf9WdgN.png' },
    { id: 6, name: 'Category 6', image: 'https://i.imgur.com/Nf9WdgN.png' },
    { id: 7, name: 'Category 7', image: 'https://i.imgur.com/Nf9WdgN.png' },
    { id: 8, name: 'Category 8', image: 'https://i.imgur.com/Nf9WdgN.png' }, 
    // Agregar más categorías si es necesario
];

const Navbar = () => {
    // Estado para controlar si el navbar debe estar fijo
    const [isSticky, setIsSticky] = useState(false);

    // Efecto que escucha el scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) { // Cambia el valor si quieres que el navbar sea fijo antes o después
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        // Agregar el event listener para el scroll
        window.addEventListener('scroll', handleScroll);

        // Limpiar el event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`navbar bg-white text-primary py-4 transition-all duration-300 ${
                isSticky ? 'fixed top-0 left-0 right-0 shadow-lg z-50' : ''
            }`}
        >
            <div className="container mx-auto px-4">
                {/* Contenedor que permite el deslizamiento horizontal */}
                <div className="flex overflow-x-auto whitespace-nowrap py-2 space-x-4 justify-start lg:justify-center">
                    {categories.map(category => (
                        <Link
                            key={category.id}
                            to={`category-${category.id}`} // El ID de cada sección
                            smooth={true} // Scroll suave
                            duration={500} // Duración del scroll
                            className="text-center cursor-pointer hover:text-gray-400"
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
        </div>
    );
};

export default Navbar;