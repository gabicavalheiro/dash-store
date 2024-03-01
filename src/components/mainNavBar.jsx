import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react';
import './mainNavBar.css';

export default function MainNavBar() {
    return (
        <>
            <div className="cabecalho">
                <div className="logo">
                    <a href="#">
                        <img src="./logoAzul.png" alt="logo" className="titulo" />
                    </a>
                </div>

                <div className="head">
                    <nav className="navbar"> {/* Certifique-se de que a classe "navbar" está aplicada aqui */}
                        <div className="nav">
                            <div className="container">
                                <a href="#"> Início </a>
                                <a href="#"> Destaques </a>
                                <a href="#"> Produtos </a>
                                <a href="#"> Contato </a>
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
                                <button class="btn dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-list">    </i>
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






