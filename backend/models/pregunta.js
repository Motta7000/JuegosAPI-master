'use strict';
module.exports = (sequelize, DataTypes) => {
  const pregunta = sequelize.define('pregunta', {
    pregunta: DataTypes.STRING,
    difficultad: DataTypes.INTEGER,
    respuesta_correcta: DataTypes.INTEGER,
    respuesta1:DataTypes.STRING,
    respuesta2:DataTypes.STRING,
    respuesta3:DataTypes.STRING
    

  }, {});
  pregunta.associate = function (models) {
    // associations can be defined here
  /*  Pregunta.belongsTo(models.Respuesta,
      {
        as: 'respuesta',
        foreignKey: 'respuesta_id',
      }
    );*/
    
  };
  return pregunta;
};