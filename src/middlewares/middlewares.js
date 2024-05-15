function checkNomeCreate(req, res, next){
    if(!req.body.nome){
        res.status(400).send({message: "Por favor escreva o nome"});
    }else if((req.body.nome).length <3){
        res.status(400).send({message: "Os nomes devem ter mais de 3 caracteres. Envie novamente."});
    }
    return next();
};

function checkDataCreate(req, res, next){
    const dataMin = new Date('2014/12/31');
    const dataNascimento = new Date(req.body.dataNascimento)
    if(!req.body){
        res.status(400).send({message: "Por favor envie a data de nascimento."});
    }else if(dataNascimento > dataMin){
        res.status(400).send({message: "O usuário deve ter nascido no mínimo em 2014"});
    }else{
        return next();
    }
};

function checkConclusao(req, res, next){
    const dataConclusao = req.body.dataConclusao
    const hoje = new Date(req, res, next);
    //console.log(hoje);
    if(dataConclusao > hoje){
        res.status(400).send({message: "A tarefa não pode ser concluída após a data limite"});
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

module.exports = { checkNomeCreate, checkDataCreate, checkConclusao , checkUpdate}

