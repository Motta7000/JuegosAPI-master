const Sequelize = require('sequelize');
const JugadorMate = require('../models').JugadorMate;

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        return JugadorMate
            .create({
                nombre: req.params.nombre,
                puntaje: req.params.puntaje
            })
            .then(JugadorMate => res.status(200).send(JugadorMate))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} _ 
     * @param {*} res 
     */
    list(_, res) {
        return JugadorMate.findAll({})
            .then(JugadorMate => res.status(200).send(JugadorMate))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    find(req, res) {
        return JugadorMate.findAll({
            where: {
                nombre: req.params.nombre,
            }
        })
            .then(JugadorMate => res.status(200).send(JugadorMate))
            .catch(error => res.status(400).send(error))
    },
};