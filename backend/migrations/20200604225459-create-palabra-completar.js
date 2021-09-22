'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PalabraCompletars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      palabra: {
        type: Sequelize.STRING
      },
      letraFaltante: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      difficultad:{
      type:Sequelize.INTEGER
      }
      
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PalabraCompletars');
  }
};