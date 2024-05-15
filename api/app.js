const express = require('express');
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite o acesso de qualquer origem
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
    next();
  });
const onePieceCharacters = require('./onePieceCharacters');

// Rota para retornar informações de um personagem aleatório
app.get('/onepiece', (req, res) => {
    const characterIds = Object.keys(onePieceCharacters);
    const randomIndex = Math.floor(Math.random() * characterIds.length);
    const randomCharacterId = characterIds[randomIndex];
    const randomCharacter = onePieceCharacters[randomCharacterId];
    res.json({ character: randomCharacter });
});

// Porta em que o servidor irá ouvir
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
