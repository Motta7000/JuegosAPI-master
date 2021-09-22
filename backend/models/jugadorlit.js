'use strict';
module.exports = (sequelize, DataTypes) => {
  const JugadorLit = sequelize.define('JugadorLit', {
    nombre: DataTypes.STRING,
    puntaje: DataTypes.INTEGER
  }, {});
  JugadorLit.associate = function (models) {
    // associations can be defined here
  };
  return JugadorLit;
};