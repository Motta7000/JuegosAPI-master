'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cuentoPregunta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     /* idc: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:'Cuentos',
          key:'id'
        }
      },*/
      idp: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:'pregunta',
          key:'id'
        }
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
    return queryInterface.dropTable('cuentoPregunta');
  }
};