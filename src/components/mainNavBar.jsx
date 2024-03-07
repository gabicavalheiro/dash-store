import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useRef } from 'react';
import './mainNavBar.css';

export default function MainNavBar() {
    const scrollToAboutSection = () => {
        const aboutSection = document.getElementById('aboutSection');
        if (aboutSection) {
          window.scrollTo({
            top: aboutSection.offsetTop,
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

      const mainRef = useRef(null)


    return (
        <>
            <div className="cabecalho"  id='main' ref={mainRef}>
                <div className="logo">
                    <a href="#">
                        <img src="./logoAzul.png" alt="logo" className="titulo" />
                    </a>
                </div>

                <div className="head">
                    <nav className="navbar"> {/* Certifique-se de que a classe "navbar" está aplicada aqui */}
                        <div className="nav">
                            <div className="container">
                                <a onClick={scrollToAboutSection} className='aa'>Sobre</a>
                                <a  onClick={scrollToDestaques} className='aa'>Destaques</a>
                                <a  onClick={scrollToLancamentos} className='aa'>Lançamentos</a>
                                <a  onClick={scrollToContatos} className='aa'>Contatos</a>
                               
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="icons"> </div>
            </div>

            <div className="cabecalho-mobile">
                <div className="logo-mobile">
                    <a href="#"></a>
                    <img src="./icone-dash-branco.png" alt="" width="70" height="70" />
                </div>

                <div className="head-mobile">
                    <nav className="navbar"> {/* Certifique-se de que a classe "navbar" está aplicada aqui */}
                        <div className="nav-mobile">
                            <div class="dropdown">
                                <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-list"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Início</a></li>
                                    <li><a class="dropdown-item" href="#">Destaques</a></li>
                                    <li><a class="dropdown-item" href="#">Produtos</a></li>
                                    <li><a class="dropdown-item" href="#">Contato</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
