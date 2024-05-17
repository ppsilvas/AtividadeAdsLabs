const database = require("../database/database");
const Sequelize = require("sequelize");
const Pessoa = require("./pessoa");

const Tarefa = database.define("tarefas",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    dataConclusao:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status:{
        type: Sequelize.ENUM('pendente', 'concluido'),
        allowNull:false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull:true
    },
    pessoaId:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
},{
    timestamp: true
});

Pessoa.hasMany(Tarefa,{foreignKey: 'pessoaId'})
Tarefa.belongsTo(Pessoa,{foreignKey: 'pessoaId'})

module.exports = Tarefa