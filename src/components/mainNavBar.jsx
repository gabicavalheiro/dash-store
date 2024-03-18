import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useRef } from 'react';
import './mainNavBar.css';
import { Dropdown, Button } from 'react-bootstrap'; // Importe os componentes do react-bootstrap

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
      <div className="cabecalho" id='main' ref={mainRef}>
        <div className="logo">
          <a href="#">
            <img src="./logoAzul.png" alt="logo" className="titulo" />
          </a>
        </div>

        <div className="head">
          <nav className="navbar"> {/* Certifique-se de que a classe "navbar" está aplicada aqui */}
            <div className="nav">
              <div className="container">
                <a onClick={scrollToAboutSection} className='aa'>SOBRE</a>
                <a onClick={scrollToDestaques} className='aa'>DESTAQUES</a>
                <a onClick={scrollToLancamentos} className='aa'>LANÇAMENTOS</a>
                <a onClick={scrollToContatos} className='aa'>CONTATOS</a>

              </div>
            </div>
          </nav>
        </div>

        <div className="icons"> </div>
      </div>

      <div className="cabecalho-mobile">
        <div className="logo-mobile">
          <a href="#"></a>
          <img src="./icone_dashAzul.png" alt="" width="70" height="70" />
        </div>

        <div className="head-mobile">
          <nav className="navbar"> {/* Certifique-se de que a classe "navbar" está aplicada aqui */}
            <div className="nav-mobile">
              <Dropdown onSelect={(eventKey) => handleDropdownSelection(eventKey)}>
                <Dropdown.Toggle className='dropdown' variant="secondary">
                  <i className="bi bi-list"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu >
                  <Dropdown.Item eventKey="about">Sobre</Dropdown.Item>
                  <Dropdown.Item eventKey="destaques">Destaques</Dropdown.Item>
                  <Dropdown.Item eventKey="lancamentos">Lançamentos</Dropdown.Item>
                  <Dropdown.Item eventKey="contatos">Contatos</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
