export default {
    name: 'productsCatalog',
    type: 'document',
    title: 'Seções de produtos',

    fields: [
      {
          name: 'cards',
          title: 'Cards',
          type: 'array',
          description: 'Serão exibidos na página apenas 6 cards.',
          of: [
              {
                  type: 'object',
                  fields: [
                   { name: 'titulo',
                    type: 'string',
                    title: 'Titulo'
                  },
                  {
                    name: 'imagem',
                    type: 'image',
                    title: 'Imagem',
                    description: 'A imagem precisa estar em .png com o fundo removido'
                  },
                  {
                    name: 'link',
                    type: 'text',
                    title: 'link'
                  },
                  {
                    name: 'alt',
                    type: 'string',
                    title: 'titulo da imagem'
                  }
                  
                  ] 

                }]}]}

    
      