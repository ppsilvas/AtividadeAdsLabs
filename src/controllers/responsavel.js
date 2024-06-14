const service = require("../service/responsavel");
const middlewares = require("../middlewares/middlewares");

function list(req,res){
    service.list(req.query)
        .then((dados)=>{
            if(Object.keys(dados).length === 0){
                return res.status(200).send({message: "Parametro não encontrado"})
            }else{
                return res.status(200).send({pessoa: dados})
            }
        },(error)=>{
            return res.status(500).send({
                message: error.message,
            })
        })
};

function concluido(req,res){
    service.concluido(req.query)
        .then((dados)=>{
            return res.status(200).send({
                message: "Pessoas sem tarefas pendentes.",
                pessoa: dados
            })
        }, (error)=>{
            return res.status(500).send({
                message: error.message,
            })
        });
}

function create(req,res){
    service.create(req.body)
        .then((pessoaCriada)=>{
            return res.status(201).send({
                message: "Pessoa Criada com sucesso.",
                pessoa: pessoaCriada
            })
        },(error)=>{
            return res.status(500).send({
                message: error.message,
            })
        })
};

function update(req,res){
    service.uptade(req.params.id, req.body)
        .then((editPessoa)=>{
            return res.status(200).send({
                message: "Pessoa editada com sucesso.",
                pessoa: editPessoa
            })
        }, (error)=> {
            return res.status(500).send({
                message: error.message,
            })
        })
};

function remove(req,res){
    service.remove(req.params.id)
        .then((delPessoa)=>{
            return res.status(200).send({
                message: "Pessoa removida com sucesso",
                pessoa: delPessoa
            })
        },(error)=>{
            return res.status(500).send({
                message: "Erro",
                pessoa: error
            })
        })
};

module.exports = { list, create, update, remove, concluido };