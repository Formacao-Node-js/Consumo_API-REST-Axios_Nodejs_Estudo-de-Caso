const Sequelize = require("sequelize");
const dbConfig = require("../config/index");

const connection = new Sequelize(dbConfig);

module.exports = connection;
