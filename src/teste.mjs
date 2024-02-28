import React, { useEffect, useState } from 'react';
import client from "./sanity.mjs";

async function fetchHeaderData() {
    try {
        const query = `*[_type == "header"][0]`;
        const headerData = await client.fetch(query);
        console.log('Dados do Header:', headerData); // Log dos dados do cabeçalho
        return headerData;
    } catch (error) {
        console.error('Erro ao buscar dados do Header no Sanity:', error);
        return null;
    }
}

function MyComponent() {
    const [headerData, setHeaderData] = useState(null);

    useEffect(() => {
        // Chama a função para buscar os dados do cabeçalho
        fetchHeaderData().then(headerData => {
            // Atualiza o estado com os dados recebidos
            setHeaderData(headerData);
        });
    }, []);

    // Renderiza o componente com os dados do cabeçalho, se disponíveis
    return (
        <div>
            {headerData && (
                <div>
                    <h1>{headerData.titulo}</h1>
                    <p>{headerData.subtitulo}</p>
                    {/* Renderize mais informações do cabeçalho aqui, conforme necessário */}
                </div>
            )}
        </div>
    );
}

export default MyComponent;
