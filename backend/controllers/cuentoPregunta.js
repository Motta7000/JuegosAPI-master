const Sequelize = require('sequelize');
const cuentoPregunta = require('../models').cuentoPregunta;
const pregunta = require('../models').pregunta

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        return cuentoPregunta
            .create({
                id: req.params.id,
                idp: req.params.idp,
                idc: req.params.idc
            })
            .then(cuentoPregunta => res.status(200).send(cuentoPregunta))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} _ 
     * @param {*} res 
     */
    list(_, res) {
        return cuentoPregunta.findAll({})
            .then(cuentoPregunta => res.status(200).send(cuentoPregunta))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    find(req, res) {
        return cuentoPregunta.findAll({
            include:[{
                model:pregunta,
              
            }],
            where: {idc: req.params.idc }
        })
            .then(cuentoPregunta => res.status(200).send(cuentoPregunta))
            .catch(error => res.status(400).send(error))
    },
};