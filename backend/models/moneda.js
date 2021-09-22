'use strict';
module.exports = (sequelize, DataTypes) => {
  const moneda = sequelize.define('moneda', {
    src: DataTypes.STRING,
    monto: DataTypes.FLOAT
  }, {});
  moneda.associate = function(models) {
    // associations can be defined here
  };
  return moneda;
};