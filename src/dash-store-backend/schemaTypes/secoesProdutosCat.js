export default {
    name: 'prodCatSection',
    type: 'document',
    title: 'Seções categorias em "NOSSOS PRODUTOS"',

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
                   { name: 'categoria',
                    type: 'reference',
                    title: 'Categoria- titulo',
                    to: [{ type: 'categoryOptions' }],
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
                  
                  ],
                  preview: {
                    select: {
                        titulo: 'titulo',
                        categoria: 'categoria.titulo', // Assuming 'categoria' has a 'titulo' field
                    },
                    prepare(selection) {
                        const { titulo, categoria } = selection;
                        return {
                            title: titulo,
                            subtitle: `Categoria: ${categoria}`,
                        };
                    },
                }, 

                }]}]}

    
      