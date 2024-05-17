require('dotenv').config({path: "./.env"});
require("./database/database");
const express = require("express");
const pessoaRouter = require("./routers/responsavel");
const tarefaRouter = require("./routers/tarefa");

const app = express();
app.use(express.json());
app.use("/responsavel", pessoaRouter);
app.use("/tarefa", tarefaRouter);

app.listen(process.env.PORT,console.log(`Escutando na porta ${process.env.PORT}`));

module.exports = app;