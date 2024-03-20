import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './promotionSection.css'

import React, { useEffect, useState } from 'react';
import client from '../sanit.mjs';
import useSanityImage from '../hooks/useSanityImage';


async function fetchData() {
    try {
        const query = `*[_type == "promotion"][0]`;
        const Data = await client.fetch(query);
        console.log('Dados do:',Data); 
        return Data;
    } catch (error) {
        console.error('Erro ao buscar dados no Sanity:', error);
        return null;
    }
}


export default function PromotionSection() {

    const [Data, setData] = useState(null);

    useEffect(() => {
        fetchData().then(Data => {
            setData(Data);
        });
    }, []);

    const urlFor = useSanityImage();


    return (
        (Data &&
        <div className="promotion">
            <div className="text">
                <div className="paragrafooo">
                    <p>{Data.subtitulo}</p>
                </div>

                <div className="tituloo">
                    {Data.titulo}
                </div>

            </div>

            <div className="img">
            {urlFor && Data.imagem && <img src={urlFor(Data.imagem)} alt={Data.alt} width="300"  />}

            </div>
        </div>
    )  )
} 

