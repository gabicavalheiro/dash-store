import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useRef } from 'react';
import './nav.css';
import { Dropdown, Button } from 'react-bootstrap';

export default function NavBar() {
  const mainRef = useRef(null);

  const getLogoImagePath = (isMobile) => {
    const basePath = process.env.PUBLIC_URL;
    const currentPath = window.location.pathname;

    if (currentPath === '/produtos/categoria' || currentPath === '/produtos') {
      if (isMobile) {
        return `${basePath}/icone_dashAzul.png`; // Caminho da imagem para o cabeçalho móvel
      } else {
        return `${basePath}/logoAzul.png`; // Caminho da imagem para o cabeçalho normal
      }
    } else {
      return `${basePath}/icone_dashAzul.png`; // Caminho da imagem padrão para outras rotas
    }
  };

  return (
    <>
      <div className="cabecalho-prod" id='main' ref={mainRef}>
        <div className="logo-prod">
          <a href="/">
            <img src={getLogoImagePath(false)} alt="logo" className="titulo" style={{ maxWidth: '836px' }} />
          </a>
        </div>

        <div className="head-prod">
          <nav className="navbar">
            <a href="/"><i className="bi bi-arrow-left-circle-fill"></i></a>
          </nav>
        </div>
      </div>

      <div className="cabecalho-mobile-prod">
        <div className="logo-mobile-prod">
          <a href="/"></a>
          <img src={getLogoImagePath(true)} alt="" width="70" height="70" style={{ maxWidth: '836px' }} />
        </div>

        <div className="head-mobile-prod">
          <nav className="navbar">
            <a href="/"><i className="bi bi-arrow-left-circle-fill"></i></a>
          </nav>
        </div>
      </div>
    </>
  );
}
