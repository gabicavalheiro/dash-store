import './productsSection.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useEffect, useState } from 'react';
import client from '../sanity.mjs';
import useSanityImage from '../hooks/useSanityImage';



async function fetchData() {
    try {
        const query = `*[_type == "productsCatalog"][0]`;
        const Data = await client.fetch(query);
        console.log('Dados do:',Data); // Log dos dados do cabeçalho
        return Data;
    } catch (error) {
        console.error('Erro ao buscar dados no Sanity:', error);
        return null;
    }
}
export default function ProductsSection() {

    const [Data, setData] = useState(null);

    useEffect(() => {
        fetchData().then(Data => {
            setData(Data);
        });
    }, []);

    const urlFor = useSanityImage();



    return (
        (Data &&
        <div className="section">
            <div className="titulo">
                NOSSOS PRODUTOS
            </div>

            <div className="cards">
                <div className="card">
                    <div className="produto">
                        <h1>{Data.titulo1}</h1>
                    </div>
                    <div className="imagem">
                    {urlFor && Data.imagem1 && <img src={urlFor(Data.imagem1)} alt={Data.alt1} width="200" height="230" />}
                    </div>
                    <div className="seta">
                        <i class="bi bi-arrow-right"><a href={Data.link1}></a></i>
                    </div>
                </div>
                <div className="card">
                    <div className="produto">
                        <h1>{Data.titulo2}</h1>
                    </div>
                    <div className="imagem">
                    {urlFor && Data.imagem2 && <img src={urlFor(Data.imagem2)} alt={Data.alt2} width="200" height="230" />}
                    </div>
                    <div className="seta">
                    <i class="bi bi-arrow-right"><a href={Data.link2}></a></i>
                    </div>
                </div>
            </div>

            <div className="cards">
                <div className="card">
                    <div className="produto">
                        <h1>{Data.titulo3}</h1>
                    </div>
                    <div className="imagem">
                    {urlFor && Data.imagem3 && <img src={urlFor(Data.imagem3)} alt={Data.alt3} width="200" height="230" />}
                    </div>
                    <div className="seta">
                    <i class="bi bi-arrow-right"><a href={Data.link3}></a></i>
                    </div>

                </div>
                <div className="card">
                    <div className="produto">
                        <h1>{Data.titulo4}</h1>
                    </div>
                    <div className="imagem">
                    {urlFor && Data.imagem4 && <img src={urlFor(Data.imagem4)} alt={Data.alt4} width="200" height="230" />}
                    </div>
                    <div className="seta">
                    <i class="bi bi-arrow-right"><a href={Data.link4}></a></i>
                    </div>

                </div>
            </div>
            <div className="btn">
                <button>Ver mais</button>
            </div>
        </div>
    ))

}