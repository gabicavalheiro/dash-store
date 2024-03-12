export default {
  name: 'categoryOptions',
  title: 'Opções de Categoria',
  type: 'document',
  fields: [
    {
      name: 'categorias',
      title: 'Categorias',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags', // Isso permite que o administrador adicione e remova categorias de forma mais intuitiva
      },
    },
  ],
};