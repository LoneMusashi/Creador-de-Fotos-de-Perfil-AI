
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptBuilderProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onGenerate: () => void;
    isGenerating: boolean;
    isImageUploaded: boolean;
}

const suggestionTags = [
    'Fondo de oficina moderno', 'Fondo desenfocado', 'Fondo de ciudad', 'Librería de fondo',
    'Sonrisa profesional', 'Expresión segura', 'Mirada amigable',
    'Luz natural suave', 'Iluminación de estudio',
    'Blazer oscuro', 'Camisa blanca', 'Atuendo casual de negocios', 'Hiperrealista', 'Estilo fotográfico',
];

const PromptBuilder: React.FC<PromptBuilderProps> = ({ prompt, setPrompt, onGenerate, isGenerating, isImageUploaded }) => {
    
    const handleTagClick = (tag: string) => {
        if (!prompt.includes(tag)) {
            setPrompt(prev => prev ? `${prev}, ${tag}` : tag);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">2. Describe tu foto ideal</h2>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: Foto profesional para LinkedIn, fondo de oficina, sonriendo..."
                className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                rows={4}
            />
            <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Sugerencias (clic para añadir):</h3>
                <div className="flex flex-wrap gap-2">
                    {suggestionTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            <button
                onClick={onGenerate}
                disabled={isGenerating || !isImageUploaded}
                className="w-full flex items-center justify-center bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
            >
                {isGenerating ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generando...
                    </>
                ) : (
                    <>
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        Generar 3 Opciones
                    </>
                )}
            </button>
        </div>
    );
};

export default PromptBuilder;
