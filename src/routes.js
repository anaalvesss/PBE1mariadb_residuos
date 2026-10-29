const express = require('express');
const router = express.Router();

const usuario = require('./controllers/usuario');
const ocorrencia = require('./controllers/ocorrencia');

router.get('/usuarios', usuario.listar);
router.get('/usuarios/:id', usuario.buscar);
router.post('/usuarios', usuario.criar);
router.put('/usuarios/:id', usuario.atualizar);
router.delete('/usuarios/:id', usuario.excluir);

router.post('/login', usuario.login);

router.get('/ocorrencias', ocorrencia.listar);
router.get('/ocorrencias/resumo', ocorrencia.resumo);
router.get('/ocorrencias/:id', ocorrencia.buscar);
router.post('/ocorrencias', ocorrencia.criar);
router.put('/ocorrencias/:id', ocorrencia.atualizar);
router.delete('/ocorrencias/:id', ocorrencia.excluir);

module.exports = router;