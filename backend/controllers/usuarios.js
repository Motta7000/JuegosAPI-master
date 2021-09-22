const Sequelize = require('sequelize');
const usuarios = require('../models').usuarios;

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    create(req, res) {
        return usuarios
            .create({
                username: req.params.username,
                status: req.params.status
            })
            .then(usuarios => res.status(200).send(usuarios))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} _ 
     * @param {*} res 
     */
    list(_, res) {
        return usuarios.findAll({})
            .then(usuarios => res.status(200).send(usuarios))
            .catch(error => res.status(400).send(error))
    },
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    find(req, res) {
        return usuarios.findAll({
            where: {
                username: req.params.username,
            }
        })
            .then(usuarios => res.status(200).send(usuarios))
            .catch(error => res.status(400).send(error))
    },
};