import './aboutSection.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useEffect, useState } from 'react';
import client from '../sanity.mjs';



async function fetchData() {
    try {
        const query = `*[_type == "about"][0]`;
        const Data = await client.fetch(query);
        console.log('Dados do:',Data); // Log dos dados do cabeçalho
        return Data;
    } catch (error) {
        console.error('Erro ao buscar dados no Sanity:', error);
        return null;
    }
}

export default function AboutSection() {

    const [Data, setData] = useState(null);

    useEffect(() => {
        fetchData().then(Data => {
            setData(Data);
        });
    }, []);

    return (
        (Data &&
        <div className='about'>
            <div className="titulo">
                SOBRE NÓS           
            </div>
            <div className="texto">
                {Data.texto}
            </div>
        </div>
        )
    )
}