const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const usuarioRoutes = require("./src/routes/usuario.routes");
const ocorrenciaRoutes = require("./src/routes/ocorrencia.routes");

app.use("/usuarios", usuarioRoutes);
app.use("/ocorrencias", ocorrenciaRoutes);

app.listen(3000, () => {
    console.log("Servidor online na porta 3000");
});
