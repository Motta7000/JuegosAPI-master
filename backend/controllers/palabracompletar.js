const Sequelize = require('sequelize');
const PalabraCompletar = require('../models').PalabraCompletar;

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        return PalabraCompletar
            .create({
                palabra: req.params.palabra,
                letraFaltante: req.params.letraFaltante,
                difficultad:req.params.difficultad
            })
            .then(PalabraCompletar => res.status(200).send(PalabraCompletar))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} _ 
     * @param {*} res 
     */
    list(_, res) {
        return PalabraCompletar.findAll({})
            .then(PalabraCompletar => res.status(200).send(PalabraCompletar))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    find(req, res) {
        return PalabraCompletar.findAll({
            where: {
                palabra: req.params.palabra,
            }
        })
            .then(PalabraCompletar => res.status(200).send(PalabraCompletar))
            .catch(error => res.status(400).send(error))
    },
};