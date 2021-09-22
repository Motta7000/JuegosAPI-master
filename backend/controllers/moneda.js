const Sequelize = require('sequelize');
const moneda = require('../models').moneda;

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        return moneda
            .create({
                src: req.params.src,
                monto: req.params.monto
            })
            .then(moneda => res.status(200).send(moneda))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} _ 
     * @param {*} res 
     */
    list(_, res) {
        return moneda.findAll({})
            .then(moneda => res.status(200).send(moneda))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    find(req, res) {
        return moneda.findAll({
            where: {
                monto: req.params.monto,
            }
        })
            .then(moneda => res.status(200).send(moneda))
            .catch(error => res.status(400).send(error))
    },
};