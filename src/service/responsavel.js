const Pessoa = require("../models/responsavel");
const middlewares = require ("../middlewares/middlewares");

async function list(queryParams){
    return await Pessoa.findAll({where: queryParams});
};

async function concluido(queryParams){
    const responsaveis = await findWithoutPendete({where: queryParams});

    console.log(responsaveis);

    return responsaveis
}

async function create(dados){
    const novaPessoa = await Pessoa.create(dados);

    return novaPessoa;
};

async function uptade(idPessoa, dados){
    const editPessoa = await Pessoa.findByPk(idPessoa);

    editPessoa.nome = dados.nome ?? editPessoa.nome;
    editPessoa.dataNascimento = dados.dataNascimento ?? editPessoa.dataNascimento;

    await editPessoa.save();

    return editPessoa;
};

async function remove(idPessoa){
    const delPessoa = await Pessoa.findByPk(idPessoa);

    await delPessoa.destroy();
    
    return delPessoa;
};

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
        return pessoasSemPendente
    }catch(error){
        return error
    }
}

module.exports = { list, create, uptade, remove, concluido };