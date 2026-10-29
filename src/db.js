const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestao_residuos'
});

conexao.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar:', erro.message);
        return;
    }

    console.log('Banco de dados conectado!');
});

module.exports = conexao;