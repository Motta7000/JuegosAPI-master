'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cuenta = sequelize.define('Cuenta', {
    cuenta: DataTypes.STRING,
    resp1: DataTypes.INTEGER,
    resp2: DataTypes.INTEGER,
    resp_correcta:DataTypes.INTEGER,
    difficultad:DataTypes.INTEGER

  }, {});
  Cuenta.associate = function (models) {
    // associations can be defined here
  };
  return Cuenta;
};