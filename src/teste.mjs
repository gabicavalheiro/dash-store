import React, { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import client from '../sanity.mjs';

const fetchCardDataAndRender = () => {
    const [cardData, setCardData] = useState(null);
    const urlFor = useSanityImage();

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const query = `*[_type == "catalog"][0]`;
                const response = await client.fetch(query);
                setCardData(response);
            } catch (error) {
                console.error('Erro ao buscar dados do card no Sanity:', error);
            }
        };

        fetchCardData();
    }, []);

}



fetchCardDataAndRender()

export default fetchCardDataAndRender;
