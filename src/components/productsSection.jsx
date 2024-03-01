import './productsSection.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import client from '../sanity.mjs';
import useSanityImage from '../hooks/useSanityImage';


const getImageUrlComplete = async (card, urlFor) => {
    const { imagem } = card;

    const imageUrl = imagem?.asset?._ref ? urlFor(imagem.asset._ref) : null;
    let imageUrlComplete = null;
    if (imageUrl && imageUrl.options && imageUrl.options.baseUrl && imageUrl.options.source) {
        const { baseUrl, projectId, dataset, source } = imageUrl.options;
        const imageName = source.substring(6);
        const formattedImageName = imageName.replace('-png', '.png');
        imageUrlComplete = `${baseUrl}/images/${projectId}/${dataset}/${formattedImageName}`;
    }

    return imageUrlComplete;
};

const useFetchCardDataAndRender = () => {
    const [cardData, setCardData] = useState(null);
    const urlFor = useSanityImage();

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const query = `*[_type == "productsCatalog"][0]`;
                const response = await client.fetch(query);

                if (response && Array.isArray(response.cards)) {
                    const allCards = response.cards.flatMap(array => array);
                    const cardImageData = await Promise.all(allCards.map(async (card) => {
                        const imageUrlComplete = await getImageUrlComplete(card, urlFor);
                        return { ...card, imageUrlComplete };
                    }));

                    setCardData(cardImageData);

                } else {
                    console.error('A resposta não contém dados válidos.');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do card no Sanity:', error);
            }
        };

        fetchCardData();
    }, [urlFor]);

    return cardData;
};

export default function ProductsSection() {
    const cardData = useFetchCardDataAndRender();

    // Limitando o número de cards renderizados a 4
    const limitedCardData = cardData ? cardData.slice(0, 6) : [];

    // Função para dividir o array em pedaços de tamanho 2
    function chunkArray(arr, chunkSize) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    }

    return (
        <div className="section">
            <div className="titulo">
                NOSSOS PRODUTOS
            </div>

            {chunkArray(limitedCardData, 2).map((row, rowIndex) => (
                <div className="cards" key={rowIndex}>
                    {row.map((product, index) => (
                        <div className="card" key={index}>
                            <div className="produto">
                                <h1>{product.titulo}</h1>
                            </div>
                            <div className="imagem">
                                <img src={product.imageUrlComplete} alt={product.titulo} width="200" height="230" />
                            </div>
                            <div className="seta">
                                <i className="bi bi-arrow-right"><a href={product.link}></a></i>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            <div className="btn">
                <button>Ver mais</button>
            </div>
        </div>
    )
}