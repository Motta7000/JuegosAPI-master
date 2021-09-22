const Sequelize = require('sequelize');
const JugadorLit = require('../models').JugadorLit;

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        return JugadorLit
            .create({
                nombre: req.params.nombre,
                puntaje: req.params.puntaje
            })
            .then(JugadorLit => res.status(200).send(JugadorLit))
            .catch(error => res.status(400).send(error))
    },
    
    /**
     * 
     * @param {*} _ 
     * @param {*} res 
     */
    list(_, res) {
        return JugadorLit.findAll({})
            .then(JugadorLit => res.status(200).send(JugadorLit))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    find(req, res) {
        return JugadorLit.findAll({
            where: {
                nombre: req.params.nombre,
            }
        })
            .then(JugadorLit => res.status(200).send(JugadorLit))
            .catch(error => res.status(400).send(error))
    },
};