const con = require("../config/db");

const cadastrar = async (dados) => {
    const campos = ["nome","email","senha"];
    const valores = campos.map(campo => dados[campo]);

    const [resultado] = await con.query(
        "INSERT INTO `usuario` (`nome`, `email`, `senha`) VALUES (?, ?, ?)",
        valores
    );

    return { id: resultado.insertId };
};

const listar = async () => {
    const [resultado] = await con.query(
        "SELECT `id`, `nome`, `email` FROM `usuario`"
    );
    return resultado;
};

const alterar = async (dados, id) => {
    const campos = ["nome","email","senha"];
    const valores = campos.filter(campo => dados[campo] !== undefined);

    if (!valores.length) return { affectedRows: 0 };

    const set = valores.map(campo => "`" + campo + "` = ?").join(", ");
    const parametros = valores.map(campo => dados[campo]);
    parametros.push(id);

    const [resultado] = await con.query(
        "UPDATE `usuario` SET " + set + " WHERE `id` = ?",
        parametros
    );

    return resultado;
};

const excluir = async (id) => {
    const [resultado] = await con.query(
        "DELETE FROM `usuario` WHERE `id` = ?",
        [id]
    );

    return resultado;
};

module.exports = { cadastrar, listar, alterar, excluir };
