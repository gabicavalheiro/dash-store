import { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import client from '../sanit.mjs';

const useSanityImage = () => {
    const [builder, setBuilder] = useState(null);

    useEffect(() => {
        // Configurar o construtor de URLs de imagem com o cliente Sanity
        const imageUrl = imageUrlBuilder(client);
        setBuilder(imageUrl);
    }, []);

    const urlFor = (assetRef) => {
        // Verificar se o construtor de URLs de imagem está disponível
        if (!builder) {
            console.error('O construtor de URLs de imagem do Sanity ainda não está configurado.');
            return null;
        }

        // Construir e retornar a URL da imagem
        return builder.image(assetRef);
    };

    return urlFor;
};

export default useSanityImage;
