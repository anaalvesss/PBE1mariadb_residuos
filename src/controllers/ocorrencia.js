const db = require('../db');

function listar(req, res) {
    db.query('SELECT * FROM ocorrencia', (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
}

function buscar(req, res) {
    db.query('SELECT * FROM ocorrencia WHERE id = ?', [req.params.id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        if (resultado.length === 0) return res.status(404).json({ mensagem: 'Ocorrência não encontrada' });
        res.json(resultado[0]);
    });
}

function criar(req, res) {
    const { usuarioId, local, tipoResiduo, nivelRisco, data, status } = req.body;

    db.query(
        'INSERT INTO ocorrencia (usuarioId, local, tipoResiduo, nivelRisco, data, status) VALUES (?, ?, ?, ?, COALESCE(?, CURDATE()), COALESCE(?, "Novo"))',
        [usuarioId, local, tipoResiduo, nivelRisco || 'Medio', data || null, status || null],
        (erro, resultado) => {
            if (erro) return res.status(500).json(erro);
            res.status(201).json({ mensagem: 'Ocorrência cadastrada', id: resultado.insertId });
        }
    );
}

function atualizar(req, res) {
    const { usuarioId, local, tipoResiduo, nivelRisco, data, status } = req.body;

    db.query(
        'UPDATE ocorrencia SET usuarioId = ?, local = ?, tipoResiduo = ?, nivelRisco = ?, data = ?, status = ? WHERE id = ?',
        [usuarioId, local, tipoResiduo, nivelRisco, data, status, req.params.id],
        (erro, resultado) => {
            if (erro) return res.status(500).json(erro);
            if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Ocorrência não encontrada' });
            res.json({ mensagem: 'Ocorrência atualizada' });
        }
    );
}

function excluir(req, res) {
    db.query('DELETE FROM ocorrencia WHERE id = ?', [req.params.id], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Ocorrência não encontrada' });
        res.json({ mensagem: 'Ocorrência excluída' });
    });
}

function resumo(req, res) {
    db.query("SELECT COUNT(*) AS totalTratados FROM ocorrencia WHERE status = 'Tratado'", (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado[0]);
    });
}

module.exports = { listar, buscar, criar, atualizar, excluir, resumo };