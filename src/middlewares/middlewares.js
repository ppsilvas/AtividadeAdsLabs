const Pessoa = require("../models/responsavel");
const Tarefa = require("../models/tarefa");
const Sequelize = require("sequelize");
const Op = Sequelize.Op

function checkNomeCreate(req, res, next){
    if(!req.body.nome){
        return res.status(400).send({message: "Por favor escreva o nome"});
    }else if((req.body.nome).length <3){
        return res.status(400).send({message: "Os nomes devem ter mais de 3 caracteres. Envie novamente."});
    }


    return next();
};

function checkDataCreate(req, res, next){
    const dataMin = new Date('2014/12/31');
    const dataNascimento = new Date(req.body.dataNascimento)
    if(!req.body.dataNascimento){
        return res.status(400).send({message: "Por favor envie a data de nascimento."});
    }else if(dataNascimento > dataMin){
        return res.status(400).send({message: "O usuário deve ter nascido no mínimo em 2014"});
    }else{
        return next();
    }
};

function checkConclusao(req, res, next){
    if(!req.body.dataConclusao){
        return res.status(400).send({
            message: "Inclua a data de conclusão da tarefa."
        })
    }

    if(!req.body.titulo){
        return res.status(400).send({
            message: "Inclua o titulo da tarefa."
        })
    }

    if(!req.body.status){
        return res.status(400).send({
            message: "Inclua o status de conclusão da tarefa."
        })
    }

    const data = new Date(req.body.dataConclusao);
    const hoje =  new Date();
    hoje.setDate(0,0,0,0)
    if(data<hoje){
        console.log(hoje);
        return res.status(400).send({
            message: "Data de Conclusão é anterior que a data da atualização."
        })
    }
    return next();
};

function checkUpdate(req, res, next){
    const Nome = req.body.nome
    const dataMin = new Date('2014/12/31');
    const dataNascimento = new Date(req.body.dataNascimento);
    
    if(Nome != null){
        if(Nome.length > 0){
            if(Nome.length < 3){
                return res.status(400).send({
                    message: "O nome deve ter pelo menos 3 caracteres."
                })
            }
        }
    }

    if (dataNascimento != null){
        if(dataNascimento > dataMin){
            return res.status(400).send({
                message: "A pessoa deve ter nascido no mínimo até 2014"
            })
        }
    }
    
    return next();
}

function checkDataUpdate(req){
    const {dataConclusao} = req
    const dataAtual = new Date();
    const dataLimite = new Date(dataConclusao)
    dataAtual.setHours(0,0,0,0);
    console.log(dataAtual);
    
    if(dataLimite < dataAtual){
        return false
    }else{
        console.log("Data conclusão dentro do prazo")
        return true
    }
}

function checkPessoaId(req){
    const pessoaId = req.pessoaId;

    if(pessoaId === null){
        console.log("Passei aqui")
        return false
    }else{
        return true
    }
}

async function findWithoutPendete(){
    try{
        const pessoasSemPendente = await Pessoa.findAll({
            include:[{
                model: Tarefa,
                as:'tarefas',
                where:{
                    status: 'pendente',
                },
                required: false
            }],
            where:{
                '$tarefas.id$':{
                    [Op.eq]:null
                }
            }
        })
        console.log("Aqui 1")
        return pessoasSemPendente
    }catch(error){
        console.log("Aqui 2")
        return error
    }
}

module.exports = { checkNomeCreate, checkDataCreate, checkConclusao , checkUpdate, checkDataUpdate, checkPessoaId, findWithoutPendete }

