const Sequelize = require('sequelize');
const PalabraCheckear = require('../models').PalabraCheckear;

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        return PalabraCheckear
            .create({
                palabra: req.params.palabra,
                estaBienEscrito: req.params.estaBienEscrito,
                difficultad:req.params.difficultad
            })
            .then(PalabraCheckear => res.status(200).send(PalabraCheckear))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} _ 
     * @param {*} res 
     */
    list(_, res) {
        return PalabraCheckear.findAll({})
            .then(PalabraCheckear => res.status(200).send(PalabraCheckear))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    find(req, res) {
        return PalabraCheckear.findAll({
            where: {
                palabra: req.params.palabra
            }
        })
            .then(PalabraCheckear => res.status(200).send(PalabraCheckear))
            .catch(error => res.status(400).send(error))
    },
};