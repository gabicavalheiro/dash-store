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
      validation: Rule => Rule.custom(categorias => {
        if (!categorias) {
          return true; // Permitir valor nulo
        }
        for (const categoria of categorias) {
          if (categoria !== categoria.toUpperCase()) {
            return 'As categorias devem estar em maiúsculas.';
          }
        }
        return true;
      })
    },
  ],
};
