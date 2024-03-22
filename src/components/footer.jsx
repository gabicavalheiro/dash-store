import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useRef, useState } from 'react';
import './footer.css'
import client from '../sanit.mjs';


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

    const contatosRef = useRef(null)

    const scrollToAboutSection = () => {
        const aboutSection = document.getElementById('aboutSection');
        if (aboutSection) {
          window.scrollTo({
            top: aboutSection.offsetTop,
            behavior: 'smooth',
          });
        }
      };
    const scrollToMain = () => {
        const main = document.getElementById('main');
        if (main) {
          window.scrollTo({
            top: main.offsetTop,
            behavior: 'smooth',
          });
        }
      };
    const scrollToDestaques = () => {
        const productsSection = document.getElementById('productsSection');
        if (productsSection) {
          window.scrollTo({
            top: productsSection.offsetTop,
            behavior: 'smooth',
          });
        }
      };
    const scrollToLancamentos = () => {
        const lancamentos = document.getElementById('lancamentos');
        if (lancamentos) {
          window.scrollTo({
            top: lancamentos.offsetTop,
            behavior: 'smooth',
          });
        }
      };
    const scrollToContatos = () => {
        const contatos = document.getElementById('contatos');
        if (contatos) {
          window.scrollTo({
            top: contatos.offsetTop,
            behavior: 'smooth',
          });
        }
      };

    return (

      (Data &&
        <div className="footer" id="contatos" ref={contatosRef}>
            <div className="content">
                <div className="text-f">
                    <div className="titlee-f">
                        Dash Store
                    </div>
                    <div className="ctt-f" >
                        <ul>
                            <li><a onClick={scrollToMain} className='aa'>Início</a></li>
                            <li><a onClick={scrollToAboutSection} className='aa'>Sobre</a></li>
                            <li><a  onClick={scrollToDestaques} className='aa'>Destaques</a></li>
                            <li><a  onClick={scrollToLancamentos} className='aa'>Lançamentos</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-f">
                    <div className="titlee-f">
                        Produtos
                    </div>
                    <div className="ctt-f">
                        <ul>
                            <li><a href="">Veja todos os produtos</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="text-f">
                    <div className="redes">
                    <div className="titlee-f">
                        Nos acompanhe nas redes sociais
                    </div>
                    <div className="cttt-f">
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