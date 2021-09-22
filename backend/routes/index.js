/* Controllers */

/*const usuarioController = require('../controllers').usuarios;*/
const jugadorlitController = require('../controllers').jugadorlit;
const cuenta = require('../controllers').cuenta
const cuento = require('../controllers').cuento
const desigualdad = require('../controllers').desigualdad
const jugadormate = require('../controllers').jugadormate
const palabracheckear = require('../controllers').palabracheckear
const palabracompletar = require('../controllers').palabracompletar
const pregunta = require('../controllers').pregunta
const cuentoPregunta = require('../controllers').cuentoPregunta
const usuarios = require('../controllers').usuarios
const moneda = require('../controllers').moneda

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Example project did not give you access to the api web services',
  }));

  /*  app.post('/api/usuarios/create/username/:username/status/:status', usuarioController.create);
    app.get('/api/usuarios/list', usuarioController.list);
    app.get('/api/usuarios/find/username/:username', usuarioController.find);*/
  app.get('/api/jugadorlit/find/username/:username', jugadorlitController.find)
  app.get('/api/jugadorlit/list', jugadorlitController.list)
  app.post('/api/jugadorlit/ceate/nombre/:nombre/puntaje/:puntaje', jugadorlitController.create)



  app.get('/api/cuenta/find/cuenta/:cuenta', cuenta.find)
  app.get('/api/cuenta/list', cuenta.list)
  app.post('/api/cuenta/create/cuenta/:cuenta/resp1/:resp1/resp2/:resp2/resp_correcta/:resp_correcta/difficultad/:difficultad', cuenta.create)

  app.get('/api/cuento/find/cuento/:cuento/difficultad/:difficutlad', cuento.find)
  app.get('/api/cuento/list/cuento', cuento.list)
  app.post('/api/cuento/create/cuento/:cuento/difficultad/:difficultad', cuento.create)

  app.get('/api/desigualdad/find/desigualdad/:desigualdad', desigualdad.find)
  app.get('/api/desigualdad/list', desigualdad.list)
  app.post('/api/desigualdad/create/desigualdad/:desigualdad/verdad/:verdad/difficultad/:difficultad', desigualdad.create)

  app.get('/api/moneda/find/monto/:monto', moneda.find)
  app.get('/api/moneda/list', moneda.list)
  app.post('/api/moneda/create/src/:src/monto/:monto', moneda.create)

  app.get('/api/jugadormate/find/nombre/:nombre', jugadormate.find)
  app.get('/api/jugadormate/list', jugadormate.list)
  app.post('/api/jugadormate/create/nombre/:nombre/puntaje/:puntaje', jugadormate.create)

  app.get('/api/palabracheckear/find/palabra/:palabra', palabracheckear.find)
  app.get('/api/palabracheckear/list', palabracheckear.list)
  app.post('/api/palabracheckear/create/palabra/:palabra/estaBienEscrito/:estaBienEscrito/difficultad/:difficultad', palabracheckear.create)

  app.get('/api/palabracompletar/find/palabra/:palabra', palabracompletar.find)
  app.get('/api/palabracompletar/list', palabracompletar.list)
  app.post('/api/palabracompletar/create/palabra/:palabra/letraFaltante/:letraFaltante/difficultad/:difficultad', palabracompletar.create)

  app.get('/api/pregunta/find/pregunta/:pregunta', pregunta.find)
  app.get('/api/pregunta/list', pregunta.list)
  app.post('/api/pregunta/create/pregunta/:pregunta/difficultad/:difficultad/respuesta_correcta/:respuesta_correcta/respuesta1/:respuesta1/respuesta2/:respuesta2/respuesta3/:respuesta3', pregunta.create)

  app.get('/api/cuentoPregunta/find/idc/:idc', cuentoPregunta.find)
  app.get('/api/cuentoPregunta/list', cuentoPregunta.list)
  app.post('/api/CuentoPregunta/create/id/:id/idp/:idp/idc/:idc', cuentoPregunta.create)

  app.get('/api/usuarios/find/username/:username', usuarios.find)
  app.get('/api/usuarios/list', usuarios.list)
  app.post('/api/usuarios/create/username/:username/status/:status', usuarios.create)
};