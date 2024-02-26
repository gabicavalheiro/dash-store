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


        </>
    );
}
