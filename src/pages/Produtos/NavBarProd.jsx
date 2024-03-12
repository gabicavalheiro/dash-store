import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useRef } from 'react';
import './nav.css';
import { Dropdown, Button } from 'react-bootstrap'; // Importe os componentes do react-bootstrap

export default function NavBar() {
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

  const handleDropdownSelection = (eventKey) => {
    switch (eventKey) {
      case 'about':
        scrollToAboutSection();
        break;
      case 'destaques':
        scrollToDestaques();
        break;
      case 'lancamentos':
        scrollToLancamentos();
        break;
      case 'contatos':
        scrollToContatos();
        break;
      default:
        break;
    }
  };



  return (
    <>
      <div className="cabecalho-prod" id='main' ref={mainRef}>
        <div className="logo-prod">
          <a href="#">
            <img src="./logoAzul.png" alt="logo" className="titulo" />
          </a>
        </div>

        <div className="head-prod">
          <nav className="navbar"> {/* Certifique-se de que a classe "navbar" está aplicada aqui */}
           
          <i class="bi bi-arrow-left-circle-fill"></i>
          </nav>
        </div>

      </div>

      <div className="cabecalho-mobile-prod">
        <div className="logo-mobile-prod">
          <a href="#"></a>
          <img src="./icone_dashAzul.png" alt="" width="70" height="70" />
        </div>

        <div className="head-mobile-prod">
          <nav className="navbar"> {/* Certifique-se de que a classe "navbar" está aplicada aqui */}
           
           <i class="bi bi-arrow-left-circle-fill"></i>
          </nav>
        </div>
      </div>
    </>
  );
}
