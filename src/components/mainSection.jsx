import './mainSection.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react';

export default function MainSection(){
    return(
        <div className="teste">

        <div className="img">
                <img src="./camisetaAzul.png" alt=""  className='camiseta'/>
            </div>

        <div className="body">
            
            <div className="titleee">
                
                <h2><div className="h2">NOVOS MODELOS</div>PARA HOMENS</h2>
                <p>Novas cores, agora também disponíveis nos <p className='st'>tamanhos masculinos.</p> </p>
                <div className="b">
                <button className='btn'> Confira já!</button>
                </div>
            </div>
        </div>
        </div>
);
    
}