import React, { useState, useEffect } from 'react';
import client from '../sanity.mjs';
import './releaseSection.css'
import useSanityImage from '../hooks/useSanityImage';
import './releaeSectionMobile.css'

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
                const query = `*[_type == "catalog"][0]`;
                const response = await client.fetch(query);

                if (response && Array.isArray(response.cards)) {
                    const allCards = response.cards.flatMap(array => array);

                    const cardImageData = await Promise.all(allCards.map(async (card) => {
                        const imageUrlComplete = await getImageUrlComplete(card, urlFor);
                        const categoriaData = await client.getDocument(card.categoria?._ref);
                        return { ...card, imageUrlComplete, categoriaData };
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

export default function ReleaseSectionMobile() {
    const cardData = useFetchCardDataAndRender();

    // Limitando o número de cards renderizados a 2
    const limitedCardData = cardData ? cardData.slice(0, 2) : [];

    return (
        <div className="section">
            <div className="titulo">
                ÚLTIMOS LANÇAMENTOS
            </div>
            <div className="release">
                <div className="column">
                    {limitedCardData.map((card) => (
                        <div className="block" key={card._key}>
                            <div className="box">
                                {card.imageUrlComplete && <img src={card.imageUrlComplete} alt={card.titulo} className='image' />}
                            </div>
                            <div className="tit">
                                <div className="line">
                                    <div className="produto">
                                        {card.titulo}
                                    </div>
                                    <div className="preco">
                                        {card.preco}
                                    </div>
                                </div>
                                <div className="categoria">
                                    <p>Em {card.categoriaData?.categorias || 'Categoria Desconhecida'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="btn-btn"><button>Ver mais</button></div>
            </div>
        </div>
    );
}
