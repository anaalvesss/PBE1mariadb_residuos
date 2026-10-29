const express = require('express');
const cors = require('cors');
const rotas = require('./src/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(rotas);

app.get('/', (req, res) => {
    res.send('API de resíduos funcionando!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});