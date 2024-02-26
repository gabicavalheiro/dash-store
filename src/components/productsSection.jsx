import './productsSection.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react';

export default function ProductsSection() {
    return (
        <div className="section">
            <div className="titulo">
                NOSSOS PRODUTOS
            </div>

            <div className="cards">
                <div className="card">
                    <div className="produto">
                        <h1>texto</h1>
                    </div>
                    <div className="imagem">
                        <img src="./camisetaAzul.png" alt="" width="200" height="230" />
                    </div>
                    <div className="seta">
                        <i class="bi bi-arrow-right"></i>
                    </div>
                </div>
                <div className="card">
                    <div className="produto">
                        <h1>texto</h1>
                    </div>
                    <div className="imagem">
                        <img src="./camisetaAzul.png" alt="" width="200" height="230" />
                    </div>
                    <div className="seta">
                        <i class="bi bi-arrow-right"></i>
                    </div>
                </div>
            </div>

            <div className="cards">
                <div className="card">
                    <div className="produto">
                        <h1>texto</h1>
                    </div>
                    <div className="imagem">
                        <img src="./camisetaAzul.png" alt="" width="200" height="230" />
                    </div>
                    <div className="seta">
                        <i class="bi bi-arrow-right"></i>
                    </div>

                </div>
                <div className="card">
                    <div className="produto">
                        <h1>texto</h1>
                    </div>
                    <div className="imagem">
                        <img src="./camisetaAzul.png" alt="" width="200" height="230" />
                    </div>
                    <div className="seta">
                        <i class="bi bi-arrow-right"></i>
                    </div>

                </div>
            </div>
            <div className="btn">
                <button>Ver mais</button>
            </div>
        </div>
    );

}