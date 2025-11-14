
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("La variable de entorno API_KEY no está configurada.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateImage(base64Image: string, mimeType: string, prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData) {
            const base64ImageData = imagePart.inlineData.data;
            return `data:${imagePart.inlineData.mimeType};base64,${base64ImageData}`;
        } else {
            throw new Error("No se encontró contenido de imagen en la respuesta de la API.");
        }
    } catch (error) {
        console.error("Error al generar imagen con Gemini:", error);
        throw new Error("Falló la llamada a la API de Gemini. Revisa la consola para más detalles.");
    }
}
