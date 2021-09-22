'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pregunta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pregunta: {
        type: Sequelize.STRING
      },
      difficultad: {
        type: Sequelize.INTEGER
      },
      respuesta_correcta: {
        type: Sequelize.INTEGER
      },
      respuesta1:{
        type: Sequelize.STRING
      },
      respuesta2:{
        type:Sequelize.STRING
      },
      respuesta3:{
        type:Sequelize.STRING
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
    return queryInterface.dropTable('Pregunta');
  }
};