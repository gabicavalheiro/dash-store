import { useState, useEffect, useRef } from 'react';
import client from '../sanity.mjs';
import './releaseSection.css'
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
                const query = `*[_type == "catalog"][0] `;
                const response = await client.fetch(query);
                if (response && Array.isArray(response.cards)) {
                    const allCards = response.cards.flatMap(array => array);

                    const cardImageData = await Promise.all(allCards.map(async (card) => {
                        const imageUrlComplete = await getImageUrlComplete(card, urlFor);
                        const categoriaData = await client.getDocument(card.categoria?._ref);
                        const createdAt = card.createdAt; // Extrair o campo createdAt
                        console.log("createdAT",createdAt);
                        return { ...card, imageUrlComplete, categoriaData, createdAt }; // Incluir createdAt no retorno

                        
                    }));
                    cardImageData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                    console.log("Cartões organizados:", cardImageData); 

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

export default function CardComponent() {
    const cardData = useFetchCardDataAndRender();

    // Limitando o número de cards renderizados a 4
    const limitedCardData = cardData ? cardData.slice(0, 4) : [];


    const lancamentosRef = useRef(null);

    return (
        <div className="section"  id="lancamentos" ref={lancamentosRef}>
            <div className="titulo">
                    ÚLTIMOS LANÇAMENTOS
                </div>
            <div className="release">
                

                    <div className="roww">
                        {limitedCardData.slice(0, 2).map((card) => (
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
                                        <p>Em {card.categoriaData?.categorias || 'Categoria Desconhecida'} <a href={card.LinkCat}></a></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rowww">
                        {limitedCardData.slice(2, 4).map((card) => (
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


                    <div className="btn"><button>Ver mais</button></div>
                </div>
            </div>
    );
}





//https://cdn.sanity.io/images/459itjlh/production/533d6ebab1494826766d512e0a27c50fb34c8f73-408x612.png
//https://cdn.sanity.io/images/459itjlh/production/image-533d6ebab1494826766d512e0a27c50fb34c8f73-408x612-png