
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { GeneratedImage, UploadedImage } from './types';
import { generateImage } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptBuilder from './components/PromptBuilder';
import GeneratedImageDisplay from './components/GeneratedImageDisplay';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
    const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
    const [prompt, setPrompt] = useState<string>('Foto de perfil profesional para LinkedIn, fondo de oficina moderno, expresión segura, luz natural suave');
    const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGeneration = useCallback(async (
        base64: string,
        mimeType: string,
        currentPrompt: string,
        count: number
    ) => {
        setIsGenerating(true);
        setError(null);

        const newImagePlaceholders: GeneratedImage[] = Array(count).fill(null).map(() => ({
            id: uuidv4(),
            src: '',
            status: 'loading',
            prompt: currentPrompt,
            originalImageBase64: base64,
            mimeType: mimeType,
        }));

        setGeneratedImages(prev => count === 3 ? newImagePlaceholders : [...prev.filter(img => img.id !== selectedImageId), ...newImagePlaceholders]);
        setSelectedImageId(null);

        const generationPromises = newImagePlaceholders.map(placeholder =>
            generateImage(base64, mimeType, currentPrompt)
                .then(newImageSrc => {
                    setGeneratedImages(prev => prev.map(img =>
                        img.id === placeholder.id ? { ...img, src: newImageSrc, status: 'success' } : img
                    ));
                })
                .catch(err => {
                    console.error('Error en la generación de imagen:', err);
                    setGeneratedImages(prev => prev.map(img =>
                        img.id === placeholder.id ? { ...img, status: 'error' } : img
                    ));
                    setError('Hubo un error al generar una imagen. Por favor, inténtalo de nuevo.');
                })
        );

        await Promise.allSettled(generationPromises);
        setIsGenerating(false);

    }, [selectedImageId]);
    
    const handleInitialGeneration = () => {
        if (!uploadedImage) return;
        setGeneratedImages([]);
        handleGeneration(uploadedImage.base64, uploadedImage.file.type, prompt, 3);
    };

    const handleGenerateSimilar = (image: GeneratedImage) => {
        if (isGenerating) return;
        setSelectedImageId(image.id);
        handleGeneration(image.originalImageBase64, image.mimeType, image.prompt, 2);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            <Header />
            <main className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col space-y-6">
                        <ImageUploader onImageUpload={setUploadedImage} uploadedImage={uploadedImage} />
                        <PromptBuilder 
                            prompt={prompt} 
                            setPrompt={setPrompt}
                            onGenerate={handleInitialGeneration}
                            isGenerating={isGenerating}
                            isImageUploaded={!!uploadedImage}
                        />
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
                        <div className="flex items-center space-x-2 mb-4">
                            <SparklesIcon className="w-6 h-6 text-indigo-500" />
                            <h2 className="text-xl font-semibold text-gray-800">Resultados Generados</h2>
                        </div>
                         {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}
                        <GeneratedImageDisplay
                            images={generatedImages}
                            onGenerateSimilar={handleGenerateSimilar}
                            selectedImageId={selectedImageId}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
