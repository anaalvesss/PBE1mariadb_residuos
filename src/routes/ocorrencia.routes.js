const express = require("express");
const routes = express.Router();

const { cadastrar, listar, alterar } = require("../controllers/ocorrencia.controller");

routes.post("/cadastrar", cadastrar);
routes.get("/listar", listar);
routes.put("/alterar/:id", alterar);

module.exports = routes;
