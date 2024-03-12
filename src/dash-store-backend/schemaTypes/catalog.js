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
            description: 'Serão exibidos na página apenas 4 cards.',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'imagem',
                            type: 'image',
                            title: 'Imagem',
                            description: 'A imagem precisa estar em .png e com o fundo removido.'
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
                        },
                        // Adicionando a data de criação
                        {
                            name: 'createdAt',
                            type: 'datetime',
                            title: 'Criado em',
                            description: 'Data e hora de criação do card.',
                            options: {
                              dateFormat: 'YYYY-MM-DD',
                              timeFormat: 'HH:mm',
                              timeStep: 15,
                              calendarTodayLabel: 'Hoje'
                            },
                            validation: Rule => Rule.required()
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
  