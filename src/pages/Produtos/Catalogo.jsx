import React, { useEffect, useState } from "react";
import "./Catalogo.css"
import useSanityImage from "../../hooks/useSanityImage";
import client from "../../sanity.mjs";


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


export default function Catalogo() {
    const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa
    const [searchResults, setSearchResults] = useState([]); // Estado para armazenar os resultados da pesquisa
    const cardData = useFetchCardDataAndRender(); // Obtenha os dados dos cards usando o hook personalizado

    // Função de manipulação de evento para atualizar o termo de pesquisa
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Função de manipulação de evento para realizar a pesquisa
    const handleSearch = () => {
        console.log("Pesquisando por:", searchTerm);

    // Verifica o valor atual de searchTerm
    console.log("Valor de searchTerm:", searchTerm);

    // Verifica o conteúdo dos dados dos cartões
    console.log("Dados dos cartões:", cardData);

    // Lógica de pesquisa simples para este exemplo: filtrar os dados dos cards com base no searchTerm
    const results = cardData.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()));
    console.log("Resultados encontrados:", results);
    setSearchResults(results);
    };

    return (
        <div className="input">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control input-center"
                    placeholder="Pesquisar"
                    aria-label="Pesquisar"
                    aria-describedby="basic-addon2"
                    value={searchTerm}
                    onChange={handleInputChange} // Chame a função de manipulação de evento ao alterar o input
                />
            </div>
            <div className="input-group-append">
                <button className="btn btn-outline" type="button" onClick={handleSearch}><i className="bi bi-search"></i></button>
            </div>

            {/* Exibir os resultados da pesquisa */}
            {searchResults.length > 0 && (
                <div>
                    <h2>Resultados da Pesquisa:</h2>
                    <ul>
                        {searchResults.map((result, index) => (
                            <li key={index}>{result.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
