import { useState, useEffect } from "react";
import client from "../../sanit.mjs";
import useSanityImage from "../../hooks/useSanityImage";

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

    return imageUrlComplete;};

const useFetchCardDataAndRender = () => {
    const [cardData, setCardData] = useState(null);
    const [categorias, setCategorias] = useState(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
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
                    const categoriasUnicas = [...new Set(cardImageData.map(card => card.categoriaData.categorias[0]))];
                    setCategorias(categoriasUnicas);
                } else {
                    console.error('A resposta não contém dados válidos.');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do card no Sanity:', error);
            }
        };
        fetchCardData();
    }, [urlFor]);

    const cardsFiltradosPorCategoria = categoriaSelecionada ? cardData.filter(card => card.categoriaData.categorias.includes(categoriaSelecionada)) : cardData;

    return { cardData: cardsFiltradosPorCategoria, categorias, setCategoriaSelecionada };
};

export default function Catalog() {
    const { cardData, categorias, setCategoriaSelecionada } = useFetchCardDataAndRender();

    return (
        <div>
            {/* Seleção de categoria */}
            <select value={setCategoriaSelecionada} onChange={(e) => setCategoriaSelecionada(e.target.value)}>
                <option value="">Todas as categorias</option>
                {categorias && categorias.map((categoria, index) => (  // Check if categorias is not null
                    <option key={index} value={categoria}>{categoria}</option>
                ))}
            </select>

            {/* Renderizar os cards filtrados */}
            {cardData && cardData.map((card) => (
                <div key={card._key}>
                    <h3>{card.titulo}</h3>
                    <p>{card.preco}</p>
                    <p>{card.createdAt}</p>
                    {/* Adicione outras informações que você deseja renderizar */}
                </div>
            ))}
        </div>
    );
}

