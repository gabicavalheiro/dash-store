import { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import client from '../sanity.mjs';
import styles from './releaseSection.css'
import useSanityImage from '../hooks/useSanityImage';



const preprocessCardData = async (card, urlFor) => {
     
    const {  imagem } = card;

    const imageUrl = imagem?.asset?._ref ? urlFor(imagem.asset._ref) : null; 
    let imageUrlComplete = null;
    if (imageUrl && imageUrl.options && imageUrl.options.baseUrl && imageUrl.options.source) {
        const { baseUrl, projectId, dataset, source } = imageUrl.options;
        const imageName = source.substring(6); 
        const formattedImageName = imageName.replace('-png', '.png'); 
        imageUrlComplete = `${baseUrl}/images/${projectId}/${dataset}/${formattedImageName}`;
    }

    if (imageUrlComplete) {
        console.log('array da img', imageUrlComplete);
    }

    return {
        imageUrlComplete,
        
    };
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

                    setCardData(allCards);
                } else {
                    console.error('A resposta não contém dados válidos.');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do card no Sanity:', error);
            }
        };

        fetchCardData();
    }, []);

    return { cardData, urlFor }; 
};

export default function CardComponent() {
    const { cardData, urlFor } = useFetchCardDataAndRender(); 
    

  
    return (
        <div className="release">
            <div className="titulo">
                <h1>ÚLTIMOS LANÇAMENTOS</h1>
            </div>
            <div className="cards">
                {cardData && cardData.map(card => {
                    return (
                        <div className="block" >
                            <div className="box">
                               { imageUrlComplete && <img src={imageUrlComplete}/>}
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
                                    <p>Em </p>
                                </div>
                            </div>
                        </div>

                    );
                })}
            </div>
        </div>
    );
};



//https://cdn.sanity.io/images/459itjlh/production/533d6ebab1494826766d512e0a27c50fb34c8f73-408x612.png
//https://cdn.sanity.io/images/459itjlh/production/image-533d6ebab1494826766d512e0a27c50fb34c8f73-408x612-png