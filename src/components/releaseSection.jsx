import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './releaseSection.css'

import React from 'react';

export default function ReleaseSection() {
    return (
        <div className="release">
            <div className="titulo">
                <h1>ÚLTIMOS LANÇAMENTOS</h1>
            </div>

            <div className="cards">

                <div className="block">
                    <div className="box">
                        <img src="" alt="" />
                    </div>
                    <div className="tit">
                        <div className="produto">
                            produto
                        </div>
                        <div className="preco">
                            preço
                        </div>
                    </div>
                    <div className="categoria">
                        <p>categoria</p>
                    </div>
                </div>

                <div className="block">
                    <div className="box">
                        <img src="" alt="" />
                    </div>
                    <div className="tit">
                        <div className="produto">
                            produto
                        </div>
                        <div className="preco">
                            preço
                        </div>
                    </div>
                    <div className="categoria">
                        <p>categoria</p>
                    </div>

                </div>

            </div>

            <div className="cards">

                <div className="block">
                    <div className="box">
                        <img src="" alt="" />
                    </div>
                    <div className="tit">
                        <div className="produto">
                            produto
                        </div>
                        <div className="preco">
                            preço
                        </div>
                    </div>
                    <div className="categoria">
                        <p>categoria</p>
                    </div>
                </div>

                <div className="block">
                    <div className="box">
                        <img src="" alt="" />
                    </div>
                    <div className="tit">
                        <div className="produto">
                            produto
                        </div>
                        <div className="preco">
                            preço
                        </div>
                    </div>
                    <div className="categoria">
                        <p>categoria</p>
                    </div>

                </div>
                
            </div>

            <div className="btn">
                <button>Ver mais </button>
            </div>

        </div>
    )
}