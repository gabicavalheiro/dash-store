import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import './footer.css'
import client from '../sanity.mjs';


async function fetchData() {
    try {
        const query = `*[_type == "footer"][0]`;
        const Data = await client.fetch(query);
        console.log('Dados do:', Data);
        return Data;
    } catch (error) {
        console.error('Erro ao buscar dados no Sanity:', error);
        return null;
    }
}

export default function Footer() {

    const [Data, setData] = useState(null);


    useEffect(() => {
        fetchData().then(Data => {
            setData(Data);
        });
    }, []);


    return (

        (Data &&
            <div className="footer">
                <div className="content">
                    <div className="text">
                        <div className="titlee">
                            Dash Store
                        </div>
                        <div className="ctt" >
                            <ul>
                                <li><a href="">Início</a></li>
                                <li><a href="">Sobre nós</a></li>
                                <li><a href="">Destaques</a></li>
                                <li><a href="">Produtos</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="text">
                        <div className="titlee">
                            Produtos
                        </div>
                        <div className="ctt">
                            <ul>
                                <li><a href="">Veja todos os produtos</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="text">
                        <div className="redes">
                        <div className="titlee">
                            Nos acompanhe nas redes sociais
                        </div>
                        <div className="cttt">
                        <i class="bi bi-instagram"> <a href={Data.Link_i}></a></i>
                        <i class="bi bi-whatsapp"><a href={Data.Link_w}></a></i>                       
                     </div>
                     </div>
                    </div>
                </div>
            </div>
        )
    )
}