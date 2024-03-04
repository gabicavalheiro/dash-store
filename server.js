const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
  // Configurando o cookie
  res.cookie('sanitySession', 'valor-do-cookie', {
    sameSite: 'none',
    secure: true,
    // Outras opções, se necessário
  });
  res.send('Cookie configurado com sucesso!');
});

app.get('/obter-cookie', (req, res) => {
  // Acessando o valor do cookie
  const cookieValue = req.cookies['sanitySession'];
  res.send('Valor do cookie: ' + cookieValue);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
