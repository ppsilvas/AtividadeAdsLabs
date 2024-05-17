const Sequelize = require("sequelize");

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = database;

require("../models/responsavel");
require("../models/tarefa");

database.sync();