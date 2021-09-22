const Sequelize = require('sequelize');
const pregunta = require('../models').pregunta;

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        return pregunta
            .create({
                pregunta: req.params.pregunta,
                difficultad: req.params.difficultad,
                respuesta_correcta: req.params.respuesta_correcta,
                respuesta1:req.params.respuesta1,
                respuesta2:req.params.respuesta2,
                respuesta3:req.params.respuesta3
            })
            .then(pregunta => res.status(200).send(pregunta))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} _ 
     * @param {*} res 
     */
    list(_, res) {
        return pregunta.findAll({})
            .then(pregunta => res.status(200).send(pregunta))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    find(req, res) {
        return pregunta.findAll({
            where: {
                pregunta: req.params.pregunta,
            }
        })
            .then(pregunta => res.status(200).send(pregunta))
            .catch(error => res.status(400).send(error))
    },
};