import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './promotionSection.css'

import React from 'react';

export default function PromotionSection() {
    return (
        <div className="promotion">
            <div className="text">
                <div className="paragrafo">
                    <p>subtitulo</p>
                </div>

                <div className="tituloo">
                    titulo
                </div>

                <div className="botao">
                    <button className="botaoa">Confira já!</button>
                </div>
            </div>

            <div className="img">
                <img src="./camisetaAzul.png" alt=""  width="300"/>
            </div>
        </div>
    )
}

