
import React from 'react';
import type { GeneratedImage } from '../types';
import GeneratedImageCard from './GeneratedImageCard';

interface GeneratedImageDisplayProps {
    images: GeneratedImage[];
    onGenerateSimilar: (image: GeneratedImage) => void;
    selectedImageId: string | null;
}

const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ images, onGenerateSimilar, selectedImageId }) => {
    if (images.length === 0) {
        return (
            <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-500 p-8 border-2 border-dashed border-gray-200 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-lg">Tus fotos aparecerán aquí</h3>
                <p className="text-sm">Sube una imagen y escribe una descripción para empezar.</p>
            </div>
        );
    }
    
    return (
        <div className="flex-grow grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map(image => (
                <GeneratedImageCard
                    key={image.id}
                    image={image}
                    onGenerateSimilar={onGenerateSimilar}
                    isSelectedForSimilar={selectedImageId === image.id}
                />
            ))}
        </div>
    );
};

export default GeneratedImageDisplay;
