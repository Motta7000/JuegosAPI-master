'use strict';
module.exports = (sequelize, DataTypes) => {
  const PalabraCheckear = sequelize.define('PalabraCheckear', {
    palabra: DataTypes.STRING,
    estaBienEscrito: DataTypes.TINYINT,
    difficultad: DataTypes.INTEGER
   
  }, {});
  PalabraCheckear.associate = function (models) {
    // associations can be defined here
  };
  return PalabraCheckear;
};