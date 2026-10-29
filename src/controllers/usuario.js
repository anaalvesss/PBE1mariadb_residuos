const db = require('../db');

function listar(req, res) {
    db.query('SELECT id, nome, email FROM usuario', (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
}

function buscar(req, res) {
    db.query('SELECT id, nome, email FROM usuario WHERE id = ?', [req.params.id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        if (resultado.length === 0) return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        res.json(resultado[0]);
    });
}

function criar(req, res) {
    const { nome, email, senha } = req.body;

    db.query('INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.status(201).json({ mensagem: 'Usuário cadastrado', id: resultado.insertId });
    });
}

function atualizar(req, res) {
    const { nome, email, senha } = req.body;

    db.query('UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?', [nome, email, senha, req.params.id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        res.json({ mensagem: 'Usuário atualizado' });
    });
}

function excluir(req, res) {
    db.query('DELETE FROM usuario WHERE id = ?', [req.params.id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        res.json({ mensagem: 'Usuário excluído' });
    });
}

function login(req, res) {
    const { email, senha } = req.body;

    db.query('SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?', [email, senha], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        if (resultado.length === 0) return res.status(401).json({ mensagem: 'Email ou senha incorretos' });
        res.json({ mensagem: 'Login realizado', usuario: resultado[0] });
    });
}

module.exports = { listar, buscar, criar, atualizar, excluir, login };