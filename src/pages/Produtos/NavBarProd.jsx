import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useRef } from 'react';
import './nav.css';
import { Dropdown, Button } from 'react-bootstrap'; // Importe os componentes do react-bootstrap

export default function NavBar() {
  const mainRef = useRef(null);

  // Obtenha o caminho base da imagem com base na URL atual
  const getLogoImagePath = () => {
    const basePath = process.env.PUBLIC_URL; // Obtenha o caminho base do diretório public
    const currentPath = window.location.pathname; // Obtenha a URL atual da página

    // Determine o caminho da imagem com base na URL atual
    if (currentPath === '/produtos/categoria') {
      return `${basePath}/logoAzul.png`; // Caminho da imagem para a rota '/produtos/categoria'
    } else {
      return `${basePath}/logoAzul.png`; // Caminho da imagem padrão para outras rotas
    }
  };

  return (
    <>
      <div className="cabecalho-prod" id='main' ref={mainRef}>
        <div className="logo-prod">
          <a href="/">
            <img src={getLogoImagePath()} alt="logo" className="titulo" />
          </a>
        </div>

        <div className="head-prod">
          <nav className="navbar"> {/* Certifique-se de que a classe "navbar" está aplicada aqui */}
            <a href="/"><i className="bi bi-arrow-left-circle-fill"></i></a>
          </nav>
        </div>

      </div>

      <div className="cabecalho-mobile-prod">
        <div className="logo-mobile-prod">
          <a href="/"></a>
          <img src={getLogoImagePath()} alt="" width="70" height="70" />
        </div>

        <div className="head-mobile-prod">
          <nav className="navbar"> {/* Certifique-se de que a classe "navbar" está aplicada aqui */}
            <a href="/"><i className="bi bi-arrow-left-circle-fill"></i></a>
          </nav>
        </div>
      </div>
    </>
  );
}
