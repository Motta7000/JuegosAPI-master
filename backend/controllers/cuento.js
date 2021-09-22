const Sequelize = require('sequelize');
const cuento = require('../models').cuento;

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        return cuento
            .create({
                cuento: req.params.cuento,
                difficultad:req.params.difficultad
               
            })
            .then(cuento => res.status(200).send(cuento))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} _ 
     * @param {*} res 
     */
    list(_, res) {
        return cuento.findAll({})
            .then(cuento => res.status(200).send(cuento))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    find(req, res) {
        return cuento.findAll({
            where: {
                cuento: req.params.cuento,
                difficultad:req.params.difficultad
            }
        })
            .then(cuento => res.status(200).send(cuento))
            .catch(error => res.status(400).send(error))
    },
};