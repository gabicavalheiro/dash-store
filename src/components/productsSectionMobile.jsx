import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"; // Importe os ícones de seta
import client from "../sanity.mjs";
import useSanityImage from "../hooks/useSanityImage";
import './productsSectionMobile.css'; // Importe o arquivo de estilos CSS

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

export default function ProductsSectionMobile() {
    const cardData = useFetchCardDataAndRender();
    const sliderRef = useRef();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const goToNextSlide = () => {
        sliderRef.current.slickNext();
    };

    const goToPrevSlide = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <>

            <div className="productsMobile">
                <div className="titul">
                    NOSSOS PRODUTOS
                </div>

                <div>
                    {cardData && (
                        <Slider {...settings} ref={sliderRef}>
                            {cardData.map((card, index) => (
                                <div key={index} className="card-carrossel">
                                    <div className="cardb">
                                    <h3>{card.titulo}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                        <img src={card.imageUrlComplete} alt={card.alt} style={{ maxWidth: '150px', maxHeight: '200px', backgroundColor:'#F5F5F5', padding:'20px 30px', borderRadius:'15px' }} />
                                    </div>
                                    <div> <a href={card.link}>Ver </a></div> {/* Troque o <p> por <div> */}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    )}
                    <button className="arrow-button" onClick={goToNextSlide}><BsArrowRight /></button>
                </div>
            </div>
        </>
    );
}


//
// <button className="arrow-button" onClick={goToNextSlide}><BsArrowRight /></button>