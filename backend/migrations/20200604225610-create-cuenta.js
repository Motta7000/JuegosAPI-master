'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cuenta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cuenta: {
        type: Sequelize.STRING
      },
      resp1: {
        type: Sequelize.INTEGER
      },
      resp2: {
        type: Sequelize.INTEGER
      },
      resp_correcta:{
        type:Sequelize.INTEGER
      },
      difficultad:
      {
        type:Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cuenta');
  }
};