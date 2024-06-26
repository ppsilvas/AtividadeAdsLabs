const service = require("../service/tarefa");
//Controller de tarefas

function list(req,res){
    service.list(req.query).then((dados)=>{
        if(Object.keys(dados).length === 0){
            return res.status(400).send({
                message: "Tarefa não encontrada no banco de dados."
            })
        }else{
            return res.status(200).send({
                tarefas: dados
            })
        }
    }, (error)=>{
        return res.status(500).send({
            message: error.message,
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
            message: error.message,
        })
    });
};

function update(req,res){
    service.uptade(req.params.id, req.body)
        .then((dados)=>{
            if(Object.keys(dados).length === 0){
                return res.status(400).send({
                    message: "A tarefa não pode ser concluída após da data limite"
                })
            }
            return res.status(200).send({
                message:"Tarefa atualizada com sucesso",
                tarefas: dados
            })
        },(error)=>{
            return res.status(500).send({
                message: error.message,
            })
        });
};

function remove(req,res){
    service.remove(req.params.id)
        .then((dados)=>{
            return res.status(200).send({
                message: "Tarefa excluida com sucesso.",
                tarefa: dados
            })
        },(error)=>{
            return res.status(500).send({
                message: error.message,
            })
        });
};

module.exports = { list, create, update, remove };