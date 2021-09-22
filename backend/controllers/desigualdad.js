const Sequelize = require('sequelize');
const desigualdad = require('../models').desigualdad;

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        return desigualdad
            .create({
                desigualdad: req.params.desigualdad,
                verdad: req.params.verdad,
                difficultad:req.params.difficultad
            })
            .then(desigualdad => res.status(200).send(desigualdad))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} _ 
     * @param {*} res 
     */
    list(_, res) {
        return desigualdad.findAll({})
            .then(desigualdad => res.status(200).send(desigualdad))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    find(req, res) {
        return desigualdad.findAll({
            where: {
                desigualdad: req.params.desigualdad,
            }
        })
            .then(desigualdad => res.status(200).send(desigualdad))
            .catch(error => res.status(400).send(error))
    },
};