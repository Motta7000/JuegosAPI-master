'use strict';
module.exports = (sequelize, DataTypes) => {
  const desigualdad = sequelize.define('desigualdad', {
    desigualdad: DataTypes.STRING,
    verdad: DataTypes.TINYINT,
    difficultad:DataTypes.INTEGER
  }, {});
  desigualdad.associate = function (models) {
    // associations can be defined here
  };
  return desigualdad;
};