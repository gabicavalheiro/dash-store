import './mainSection.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from 'react';

import React from 'react';
import client from '../sanit.mjs';
import useSanityImage from '../hooks/useSanityImage';

async function fetchHeaderData() {
    try {
        const query = `*[_type == "header"][0]`;
        const headerData = await client.fetch(query);
        console.log('Dados do Header:', headerData); // Log dos dados do cabeçalho
        return headerData;
    } catch (error) {
        console.error('Erro ao buscar dados do Header no Sanity:', error);
        return null;
    }
}

export default function MainSection() {

    const [headerData, setHeaderData] = useState(null);

    useEffect(() => {
        fetchHeaderData().then(headerData => {
            setHeaderData(headerData);
        });
    }, []);

    const urlFor = useSanityImage();


    return (
        (headerData &&
            <div className="teste">
                <div className="img">
                    {urlFor && headerData.imagem && <img src={urlFor(headerData.imagem)} alt={headerData.alt} />}
                </div>

                <div className="body">

                    <div className="titleee">

                        <h2><div className="h2">{headerData.titulo}</div>{headerData.subtitulo}</h2>
                        <p>{headerData.paragrafo} </p>
                        <div className="b">
                            <button className='btn'> <a href={headerData.link}>{headerData.titulo_botao}</a></button>
                        </div>
                    </div>
                </div>
            </div>

        )
    
        
        
        
        )

}