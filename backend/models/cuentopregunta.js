'use strict';
module.exports = (sequelize, DataTypes) => {
  const cuentoPregunta = sequelize.define('cuentoPregunta', {
    idc: DataTypes.INTEGER,
    idp: DataTypes.INTEGER
  }, {});
  cuentoPregunta.associate = function(models) {
    // associations can be defined here
    cuentoPregunta.belongsTo(models.cuento,
      {
        foreignKey:'idc'
      })
      cuentoPregunta.belongsTo(models.pregunta,
        {
          foreignKey:'idp'
        } 
        )
  };
  return cuentoPregunta;
};