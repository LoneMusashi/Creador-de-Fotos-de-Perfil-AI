
import React from 'react';
import type { GeneratedImage } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { RetryIcon } from './icons/RetryIcon';

interface GeneratedImageCardProps {
    image: GeneratedImage;
    onGenerateSimilar: (image: GeneratedImage) => void;
    isSelectedForSimilar: boolean;
}

const GeneratedImageCard: React.FC<GeneratedImageCardProps> = ({ image, onGenerateSimilar, isSelectedForSimilar }) => {
    
    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = image.src;
        link.download = `perfil-ia-${image.id.substring(0, 8)}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleGenerateSimilarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onGenerateSimilar(image);
    }
    
    const SkeletonLoader = () => (
        <div className="w-full aspect-square bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
            <SparklesIcon className="w-10 h-10 text-gray-400 animate-ping" />
        </div>
    );
    
    const ErrorState = () => (
        <div className="w-full aspect-square bg-red-100 rounded-lg flex flex-col items-center justify-center text-center text-red-600 p-2">
            <RetryIcon className="w-8 h-8 mb-2" />
            <span className="text-xs font-medium">Error al generar</span>
        </div>
    );

    const SuccessState = () => (
        <div 
            className="relative group w-full aspect-square rounded-lg overflow-hidden cursor-pointer"
            onClick={handleGenerateSimilarClick}
        >
            <img src={image.src} alt="Generated profile" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex flex-col items-center justify-center p-2">
                <div className="absolute top-2 right-2 flex space-x-2">
                     <button
                        onClick={handleDownload}
                        className="p-2 bg-white/80 text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-transform transform-gpu opacity-0 group-hover:opacity-100 duration-300"
                        title="Descargar imagen"
                    >
                        <DownloadIcon className="w-5 h-5" />
                    </button>
                </div>
                <div 
                    className="flex items-center space-x-2 px-3 py-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <SparklesIcon className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-semibold text-gray-800">Generar similares</span>
                </div>
            </div>
        </div>
    );
    
    if (isSelectedForSimilar) {
        return <SkeletonLoader />;
    }

    switch (image.status) {
        case 'loading':
            return <SkeletonLoader />;
        case 'error':
            return <ErrorState />;
        case 'success':
            return <SuccessState />;
        default:
            return null;
    }
};

export default GeneratedImageCard;
