import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import './brandSection.css'
import useSanityImage from '../hooks/useSanityImage';
import client from '../sanity.mjs';


async function fetchData() {
    try {
        const query = `*[_type == "brand"][0]`;
        const Data = await client.fetch(query);
        console.log('Dados do:',Data); // Log dos dados do cabeçalho
        return Data;
    } catch (error) {
        console.error('Erro ao buscar dados no Sanity:', error);
        return null;
    }
}

export default function BrandSection(){

    const [Data, setData] = useState(null);

    useEffect(() => {
        fetchData().then(Data => {
            setData(Data);
        });
    }, []);

    const urlFor = useSanityImage();


    return(
        (Data &&
        <div className="brandSection">
            <div className="images">
                <div className="ca">
                {urlFor && Data.imagem && <img src={urlFor(Data.imagem)} alt={Data.alt} width='150'height='150' />}
                </div>
                <div className="ca">
                {urlFor && Data.imagem2 && <img src={urlFor(Data.imagem2)} alt={Data.alt} width='150'height='150' />}
                </div>
                <div className="ca">
                {urlFor && Data.imagem3 && <img src={urlFor(Data.imagem3)} alt={Data.alt} width='150'height='150' />}
                </div>
            </div>
        </div>
    )
    )
}