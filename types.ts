
export interface UploadedImage {
    file: File;
    base64: string;
}

export interface GeneratedImage {
    id: string;
    src: string;
    status: 'loading' | 'success' | 'error';
    prompt: string;
    originalImageBase64: string;
    mimeType: string;
}
