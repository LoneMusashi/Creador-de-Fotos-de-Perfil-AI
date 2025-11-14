
import React, { useCallback } from 'react';
import { fileToBase64 } from '../utils/imageUtils';
import type { UploadedImage } from '../types';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
    onImageUpload: (image: UploadedImage) => void;
    uploadedImage: UploadedImage | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImage }) => {
    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64 = await fileToBase64(file);
                onImageUpload({ file, base64 });
            } catch (error) {
                console.error("Error al convertir archivo a base64:", error);
            }
        }
    }, [onImageUpload]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center">
             <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Sube tu foto</h2>
            <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
            />
            <label
                htmlFor="imageUpload"
                className="w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors p-4"
            >
                {uploadedImage ? (
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                           <img
                            src={URL.createObjectURL(uploadedImage.file)}
                            alt="Vista previa"
                            className="w-full h-full object-cover"
                           />
                        </div>
                        <span className="text-indigo-600 font-medium bg-indigo-100 px-3 py-1 rounded-full text-sm">
                            ¡Imagen cargada! Clic para cambiar.
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-2 text-gray-500">
                        <UploadIcon className="w-12 h-12 text-gray-400" />
                        <span className="font-medium">Haz clic para subir una imagen</span>
                        <span className="text-sm">PNG, JPG, o WEBP</span>
                    </div>
                )}
            </label>
        </div>
    );
};

export default ImageUploader;
