import './aboutSection.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { SiWhatsapp } from "react-icons/si";


import React, { useEffect, useRef, useState } from 'react';
import client from '../sanit.mjs';



async function fetchData() {
    try {
        const query = `*[_type == "about"][0]`;
        const Data = await client.fetch(query);
        console.log('Dados do:', Data); // Log dos dados do cabeçalho
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

    const aboutSectionRef = useRef(null);


    return (
        (Data &&
            <section id="aboutSection" ref={aboutSectionRef}>
                <div className='about'>
                    <div className="titulooo">
                        SOBRE NÓS
                    </div>
                    <div className="texto">
                        {Data.texto}
                    </div>
                    <div className="btw">
                        <a href={Data.linkWhats}><SiWhatsapp className='siwpp' size={50} style={{color:'#040F41'}}/></a>
                        
                    </div>
                </div>
            </section>
        )
    )
}