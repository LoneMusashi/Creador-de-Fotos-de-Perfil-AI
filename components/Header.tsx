
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
    return (
        <header className="w-full text-center py-6 bg-white border-b border-gray-200">
            <div className="flex items-center justify-center space-x-3">
                <SparklesIcon className="w-8 h-8 text-indigo-500" />
                <h1 className="text-3xl font-bold text-gray-800">
                    Creador de Fotos de Perfil AI
                </h1>
            </div>
            <p className="text-gray-500 mt-1">Genera la foto perfecta para tu LinkedIn</p>
        </header>
    );
};

export default Header;
