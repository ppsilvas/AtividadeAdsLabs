require('dotenv').config({path: "./.env"});
require("./database/database");
const express = require("express");
const pessoaRouter = require("./routers/pessoa");
const tarefaRouter = require("./routers/tarefa");

const app = express();
app.use(express.json());
app.use("/pessoa", pessoaRouter);
app.use("/tarefa", tarefaRouter);

app.listen(process.env.PORT,console.log(`Escutando na porta ${process.env.PORT}`));

module.exports = app;