'use strict';
module.exports = (sequelize, DataTypes) => {
  const cuento = sequelize.define('cuento', {
    cuento: DataTypes.STRING,
    difficultad:DataTypes.INTEGER
   
  }, {});
  cuento.associate = function (models) {
    // associations can be defined here


  }
  return cuento;
};