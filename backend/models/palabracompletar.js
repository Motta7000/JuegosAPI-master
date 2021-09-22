'use strict';
module.exports = (sequelize, DataTypes) => {
  const PalabraCompletar = sequelize.define('PalabraCompletar', {
    palabra: DataTypes.STRING,
    letraFaltante: DataTypes.STRING,
    difficultad:DataTypes.INTEGER
  }, {});
  PalabraCompletar.associate = function (models) {
    // associations can be defined here
  };
  return PalabraCompletar;
};