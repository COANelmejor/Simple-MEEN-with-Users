const UserModel = require('../../models/UserModel');
const UserTools = require('../../lib/userTools');

module.exports = function (req, res) {
  UserModel.findOne({
    tipo: 'administrador'
  }, '_id', function (err, AdministradorCreadoAnteriormente) {
    if (err) {
      console.error(err);
      res.status(500).send({
        message: 'Hubo un error',
        error: err
      })
    } else if (AdministradorCreadoAnteriormente == null) {
      crearAdminNuevo(res);
    } else {
      res.sendStatus(404);
    }
  })
}

function crearAdminNuevo(res) {
  const passwordNumber = String(Math.floor(Math.random() * 899999) + 100000);
  const salt = UserTools.createSalt();
  const hash = UserTools.createHash(passwordNumber, salt);

  const nuevoAdmin = {
    username: "admin",
    salt,
    hash,
    displayName: "Usuario Administrador",
    tipo: "administrador",
  }
  UserModel.create(nuevoAdmin, function (err, AdministradorCreado) {
    if (err) {
      console.error(err)
      res.status(500).send({
        message: 'Hubo un error',
        error: err
      })
    } else {
      res.status(201).send({
        message: 'Usuario Administrador Creado',
        usuario: {
          username: AdministradorCreado.username,
          password: passwordNumber,
          displayName: AdministradorCreado.displayName
        }
      })
    }
  })
}