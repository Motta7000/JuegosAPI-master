'use strict';
module.exports = (sequelize, DataTypes) => {
  const JugadorMate = sequelize.define('JugadorMate', {
    nombre: DataTypes.STRING,
    puntaje: DataTypes.INTEGER
  }, {});
  JugadorMate.associate = function (models) {
    // associations can be defined here
  };
  return JugadorMate;
};