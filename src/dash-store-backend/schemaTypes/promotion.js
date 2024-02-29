export default {
    name: 'promotion',
    type: 'document',
    title: 'Promoção',
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
        name: 'textoBotao',
        type: 'text',
        title: 'Texto do Botão'
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