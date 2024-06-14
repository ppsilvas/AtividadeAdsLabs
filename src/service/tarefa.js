const Tarefa = require("../models/tarefa");
const Pessoa = require("../models/responsavel")
const middleware = require("../middlewares/middlewares");
// Service de Tarefas


async function list(queryParams){
    return await Tarefa.findAll({where: queryParams});
};

async function create(body){
    if(!Pessoa.findByPk(body.idTarefa)){
        return new Error("A pessoa responsável não existe no banco");
    }
    const novaTarefa = await Tarefa.create(body);

    return novaTarefa;
};

async function uptade(idTarefa, body){
    const editTarefa = await Tarefa.findByPk(idTarefa);
    console.log(editTarefa.dataConclusao);

    if(!Pessoa.findByPk(body.pessoaId) && body.pessoaId!=null){
        return new Error("Pessoa não existe");
    }

    if(editTarefa){
        if(!middleware.checkDataUpdate(editTarefa)){
            return null;
        }
        editTarefa.titulo = body.titulo ?? editTarefa.titulo;
        editTarefa.dataConclusao = body.dataConclusao ?? editTarefa.dataConclusao;
        editTarefa.status = body.status ?? editTarefa.status;
        editTarefa.descricao = body.descricao ?? editTarefa.descricao;
        editTarefa.pessoaId = body.pessoaId ?? editTarefa.pessoaId;
        
        await editTarefa.save();
    }

    return editTarefa
};

async function remove(idTarefa){
    const delTarefa = await Tarefa.findByPk(idTarefa);

    await delTarefa.destroy();

    return delTarefa;
};

module.exports = { list, create, uptade, remove};