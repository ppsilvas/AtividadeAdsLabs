function checkNome(req, res, next){
    if(!req.body){
        res.status(400).send({message: "Por favor escreva o nome"});
    }else if(req.body){
        res.status(400).send({message: "Os nomes devem ter mais de 3 caracteres. Envie novamente."});
    }
    return next();
};

function checkData(req, res, next){
    const dataMin = new Date(2014,12,31);
    if(!req.body){
        res.status(400).send({message: "Por favor envie a data de nascimento."});
    }else if(req.body >= dataMin){
        res.status().send({message: "O usuário deve ter nascido no mínimo em 2014"});
    }
    return next();
};

function checkConclusao(req, res, next){
    const hoje = new Date(req, res, next);
    //console.log(hoje);
    if(req.body > hoje){
        res.status(400).send({message: "A tarefa não pode ser concluída após a data limite"});
    }
    return next();
};

module.exports = { checkNome, checkData, checkConclusao }

