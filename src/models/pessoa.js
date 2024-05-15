const database = require("../database/database");
const Sequelize = require("sequelize");

const Pessoa = database.define("pessoa",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento:{
        type: Sequelize.DATEONLY,
        allowNull: false
    }
},{
    timestamp: true
});


module.exports = Pessoa;