require('dotenv').config({path: "./.env"});
const express = require("express");

const pessoaRouter = require("./routers/pessoa");

const app = express();
app.use(express.json());
app.use("/pessoa", pessoaRouter);

app.listen(process.env.PORT,console.log(`Escutando na porta ${process.env.PORT}`));

module.exports = app;