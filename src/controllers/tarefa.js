const service = require("../service/tarefa");

function list(req,res){
    service.list(req.query).then((dados)=>{
        if(Object.keys(dados).length ===0){
            return res.status(400).send({
                message: "Tarefa não encontrada no banco de dados."
            })
        }else{
            return res.status(200).send({
                message: "Tarefas encontradas",
                tarefas: dados
            })
        }
    }, (error)=>{
        return res.status(500).send({
            message: "Erro",
            tarefas: error
        })
    });
};

function create(req,res){
    service.create(req.body).then((dados)=>{
        return res.status(201).send({
            message: "Tarefa criada com sucesso",
            tarefas: dados
        })
    },(error)=>{
        return res.status(500).send({
            message: "Erro",
            tarefas: error
        })
    });
};

function update(req,res){
    service.uptade(req.params.id, req.body)
        .then((dados)=>{
            return res.status(200).send({
                message:"Tarefa atualizada com sucesso",
                tarefas: dados
            })
        },(error)=>{
            return res.status(500).send({
                message:"Erro",
                tarefas: error
            })
        });
};

function remove(req,res){
    return res.status(200).send("Olá Mundo!");
};

module.exports = { list, create, update, remove };