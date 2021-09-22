const Sequelize = require('sequelize');
const cuenta = require('../models').Cuenta;

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        return cuenta
            .create({
                cuenta: req.params.cuenta,
                resp1: req.params.resp1,
                resp2: req.params.resp2,
                resp_correcta:req.params.resp_correcta,
                difficultad:req.params.difficultad

              
            })
            .then(cuenta => res.status(200).send(cuenta))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} _ 
     * @param {*} res 
     */
    list(_, res) {
        return cuenta.findAll({})
            .then(cuenta => res.status(200).send(cuenta))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    find(req, res) {
        return cuenta.findAll({
            where: {
                cuenta: req.params.cuenta,
            }
        })
            .then(cuenta => res.status(200).send(cuenta))
            .catch(error => res.status(400).send(error))
    },
};