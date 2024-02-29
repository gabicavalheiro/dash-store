// catalogSchema.js

export default {
  name: 'catalog',
  type: 'document',
  title: 'Ultimos Lançamentos',
  fields: [
      {
          name: 'cards',
          title: 'Cards',
          type: 'array',
          of: [
              {
                  type: 'object',
                  fields: [
                      {
                          name: 'imagem',
                          type: 'image',
                          title: 'Imagem',
                      },
                      {
                          name: 'titulo',
                          type: 'string',
                          title: 'Titulo'
                      },
                      {
                          name: 'categoria',
                          type: 'reference',
                          title: 'Categoria',
                          to: [{ type: 'categoryOptions' }],
                      },
                      {
                          name: 'preco',
                          type: 'string',
                          title: 'Preço',
                          description: 'Insira o R$'
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
              }
          ]
      }
  ]
};
