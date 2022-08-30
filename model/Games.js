const Sequelize = require("sequelize");
const connection = require("../database/index");

const Games = connection.define("jogos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  title: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },

  price: {
    type: Sequelize.FLOAT(15),
    allowNull: false,
  },

  year: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
});

Games.sync({ force: false }).then(() => {
  console.log('Tabela "Games" criada.');
});

module.exports = Games;
