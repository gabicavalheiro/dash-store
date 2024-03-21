import { useState, useEffect } from "react";
import client from "../../sanit.mjs";
import useSanityImage from "../../hooks/useSanityImage";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoFilterOutline, IoSwapVertical } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

import './Catalogo.css';

const useFetchCardDataAndRender = () => {
    const [cardData, setCardData] = useState(null);
    const [categorias, setCategorias] = useState(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [sortedCardData, setSortedCardData] = useState(null); // Adicionado estado para cartões ordenados
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

    // Função para obter a URL completa da imagem
    const getImageUrlComplete = async (card, urlFor) => {
        const { imagem } = card;

        const imageUrl = imagem?.asset?._ref ? urlFor(imagem.asset._ref) : null;
        let imageUrlComplete = null;
        if (imageUrl && imageUrl.options && imageUrl.options.baseUrl && imageUrl.options.source) {
            const { baseUrl, projectId, dataset, source } = imageUrl.options;
            const imageName = source.substring(6);
            const formattedImageName = imageName.replace('-png', '.png').replace('-jpg', '.jpg').replace('-jpeg', '.jpeg');
            imageUrlComplete = `${baseUrl}/images/${projectId}/${dataset}/${formattedImageName}`;
        }

        return imageUrlComplete;
    };

    // Função para ordenar os cartões por preço
    const sortCardsByPrice = (order) => {
        if (cardData) {
            const sortedCards = [...cardData];
            sortedCards.sort((a, b) => {
                const priceA = parseFloat(a.preco.replace('R$', '').replace(',', '.'));
                const priceB = parseFloat(b.preco.replace('R$', '').replace(',', '.'));
                return order === 'asc' ? priceA - priceB : priceB - priceA;
            });
            setSortedCardData(sortedCards);
        }
    };

    return { cardData: sortedCardData || cardData, categorias, categoriaSelecionada, setCategoriaSelecionada, sortCardsByPrice };
};

export default function Catalog() {
    const [searchQuery, setSearchQuery] = useState('');
    const { cardData, categorias, categoriaSelecionada, setCategoriaSelecionada, sortCardsByPrice } = useFetchCardDataAndRender();

    // Função para filtrar os resultados do cartão com base na consulta de pesquisa
    const filteredCardData = cardData ? cardData.filter(card => {
        return card.titulo.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (categoriaSelecionada === '' || card.categoriaData.categorias[0] === categoriaSelecionada);
    }) : [];

    // Renderizar os cartões filtrados
    return (
        <div>
            <div className="high">
                <div className="titulo" style={{ marginBottom: '10px' }}> NOSSO CATÁLOGO </div>
                <div className="input">
                    <div className="input-group" style={{ width: '400px', borderRadius: '50px', display: 'flex', flexDirection: 'row' }}>
                        <input
                            type="text"
                            className="form-control input-center"
                            placeholder="Pesquisar"
                            aria-label="Pesquisar"
                            aria-describedby="basic-addon2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ borderRadius: "50px", border: ' 1px solid #040F41', padding: '10px' }}
                        />
                        {/* Botão de pesquisa */}
                        <button className="search" type="button" onClick={() => { }}><IoSearch size={20} color='#040F41'  /> </button>
                    </div>

                    {/* Dropdown para selecionar categoria */}
                    <DropdownButton id="dropdown-categorias" title={<IoFilterOutline size={25} color='#040F41' />} variant="sucess" className="no-toggle" style={{ backgroundColor: 'white' }}>
                        <Dropdown.Item onClick={() => setCategoriaSelecionada('')}>Todas as categorias</Dropdown.Item>
                        {categorias && categorias.map((categoria, index) => (
                            <Dropdown.Item key={index} onClick={() => setCategoriaSelecionada(categoria)}>{categoria}</Dropdown.Item>
                        ))}
                    </DropdownButton>

                    {/* Dropdown para ordenar por preço */}
                    <DropdownButton id="dropdown-filtro" title={<IoSwapVertical size={25} color='#040F41' />} variant="sucess" className="no-toggle" style={{ backgroundColor: 'white' }}>
                        <Dropdown.Item onClick={() => sortCardsByPrice('asc')}>Menor preço</Dropdown.Item>
                        <Dropdown.Item onClick={() => sortCardsByPrice('desc')}>Maior preço</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            {/* Renderizar os cards filtrados */}
            <div className="cards-catalogo">
                {filteredCardData.map((card) => (
                    <div key={card._key} className="card-catalogo">
                        <div className="card-image">
                            <img src={card.imageUrlComplete}  />
                        </div>
                        <div className="card-titulo"> <h6> {card.titulo} </h6> </div>
                        <p>{card.preco}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
