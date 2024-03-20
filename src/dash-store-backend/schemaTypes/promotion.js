export default {
    name: 'promotion',
    type: 'document',
    title: 'Destaques',
    fields: [
      {
        name: 'subtitulo',
        type: 'text',
        title: 'Subtitulo'
      },
      {
        name: 'titulo',
        type: 'text',
        title: 'Titulo'
      },
      {
        name: 'imagem',
        type: 'image',
        title: 'Imagem'
      },
      {
        name:'alt',
        type:'string',
        title:'Titulo da imagem'
      }
    ]
}