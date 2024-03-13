import { useState, useEffect } from "react";
import client from "../../sanit.mjs";
import useSanityImage from "../../hooks/useSanityImage";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './Catalogo.css'
import { IoFilterOutline } from "react-icons/io5";


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
    const [searchQuery, setSearchQuery] = useState('');
    const { cardData, categorias, setCategoriaSelecionada } = useFetchCardDataAndRender();

    // Função para filtrar os resultados do cartão com base na consulta de pesquisa
    const filteredCardData = cardData ? cardData.filter(card => {
        return card.titulo.toLowerCase().includes(searchQuery.toLowerCase());
    }) : [];

    const handleSearchClick = () => {
    }
    

    return (
        <div>
            <div className="high">
                <div className="titulo" style={{marginBottom:'10px'}}> NOSSO CATÁLOGO </div>
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
                        <div className="input-group-append">
                            <button className="btn btn-outline" type="button" onClick={handleSearchClick}><i className="bi bi-search"></i></button>
                        </div>
                    </div>

                    <DropdownButton id="dropdown-categorias" title={<IoFilterOutline size={25} color='#040F41' />} variant="sucess" className="no-toggle">
                        <Dropdown.Item onClick={() => setCategoriaSelecionada('')}>Todas as categorias</Dropdown.Item>
                        {categorias && categorias.map((categoria, index) => (
                            <Dropdown.Item key={index} onClick={() => setCategoriaSelecionada(categoria)}>{categoria}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
            </div>

            {/* Renderizar os cards filtrados */}
            <div className="cards-catalogo">
                {filteredCardData.map((card) => (
                    <div key={card._key} className="card-catalogo">
                        <div className="card-image">
                            <img src={card.imageUrlComplete} width="150" height="180" alt="" />
                        </div>
                        <div className="card-titulo"> <h6> {card.titulo} </h6> </div>
                        <p>{card.preco}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


