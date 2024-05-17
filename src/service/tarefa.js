const Tarefa = require("../models/tarefa");
const middleware = require("../middlewares/middlewares");
// Service de Tarefas


async function list(queryParams){
    return await Tarefa.findAll({where: queryParams});
};

async function create(body){
    const novaTarefa = await Tarefa.create(body);

    return novaTarefa;
};

async function uptade(idTarefa, body){
    const editTarefa = await Tarefa.findByPk(idTarefa);
    const resultado = middleware.checkDataUpdate(editTarefa);

    if(resultado === true && body.status){

        editTarefa.titulo = body.titulo ?? editTarefa.titulo;
        editTarefa.dataConclusao = body.dataConclusao ?? editTarefa.dataConclusao;
        editTarefa.status = body.status ?? editTarefa.status;
        editTarefa.descricao = body.descricao ?? editTarefa.descricao;
        editTarefa.pessoaId = body.pessoaId ?? editTarefa.pessoaId;

        await editTarefa.save();

        return editTarefa

    }else if(resultado === false && body.status){
        return {}
    }else{
        editTarefa.titulo = body.titulo ?? editTarefa.titulo;
        editTarefa.dataConclusao = body.dataConclusao ?? editTarefa.dataConclusao;
        editTarefa.status = body.status ?? editTarefa.status;
        editTarefa.descricao = body.descricao ?? editTarefa.descricao;
        editTarefa.pessoaId = body.pessoaId ?? editTarefa.pessoaId;

        await editTarefa.save();

        return editTarefa
    }
    
};

async function remove(idTarefa){
    const delTarefa = await Tarefa.findByPk(idTarefa);

    await delTarefa.destroy();

    return delTarefa;
};

module.exports = { list, create, uptade, remove};