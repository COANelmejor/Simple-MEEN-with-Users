// Traigo el modelo Base de datos de los usuarios.
const UserModel = require('../../models/UserModel');
// Se importa el modulo de validación de usuarios
const UserTools = require('../../lib/userTools');

// Se declara que este archivo va a exporta un modulo
// que es una funciones de lleva dos paremtors: req, res
module.exports = function (req, res) {
  // Se usa el modelo de los modelos para buscar solo un usuario
  UserModel.findOne(
  // este debe ser tipo: administrador
  {
    tipo: 'administrador'
  }, 
  // Solo se debe obtener el _id del usuario, si existe
  '_id', 
  // al consiguirlo ejecutamos un callback
  // el callback tiene dos valores
  // err si existiera
  // AdministradorCreadoAnteriormente carga el usuario encontrado
  function (err, AdministradorCreadoAnteriormente) {
    // Si hay un error
    if (err) {
      //Escribimos en consola el error.
      console.error(err);
      // Respondemos con un status 500 (Error Interno del servidor)
      res.status(500)
      // y enviamos un mensaje con el error
      .send({
        message: 'Hubo un error',
        error: err
      })
    // si no, si el AdministradorCreadoAnteriormente es nulo (no existe)
    } else if (AdministradorCreadoAnteriormente == null) {
      // debe ejecutar crearAdminNuevo con el "res" como parametro
      crearAdminNuevo(res);
    // Si no (si ya hay usuario administrador creado)
    } else {
      // Responder con un estado 404 (No encontrado)
      res.sendStatus(404);
    }
  })
}

// Se declara la función crearAdminNuevo con un parametro (res)
function crearAdminNuevo(res) {
  // Se declara una constate quie será un numero aleatorio entre 100000 y 999999 y este a su vez se convierte en un texto
  // y se guarda en la variable passwordNumber
  const passwordNumber = String(Math.floor(Math.random() * 899999) + 100000);
  
  // Se declara una constate que tendra un sal para que se usará para encriptar el password del usuario
  // usando el módulo UserTools
  const salt = UserTools.createSalt();

  // Se crea un hash que será la contraseña encriptada usando el modulo UserTools
  const hash = UserTools.createHash(passwordNumber, salt);

  // Se declara como será el nuevo usuario
  const nuevoAdmin = {
    username: "admin",
    salt,
    hash,
    displayName: "Usuario Administrador",
    tipo: "administrador",
  }
  // Se usa el modelo de usuarios para crear el nuevo usarios
  UserModel.create(nuevoAdmin,
  // Se crea un callback con el error y el usuario creado
  function (err, AdministradorCreado) {
    // Si existe un error
    if (err) {
      // se escribe en el log el error
      console.error(err)

      // Respondemos con un status 500 (Error Interno del servidor)
      res.status(500)
      // y enviamos un mensaje con el error
      .send({
        message: 'Hubo un error',
        error: err
      })
    // si no (si no hay error)
    } else {
      // Se respon un status 201 (creado)
      res.status(201)
      // y se envía un mensaje con los datos de usuario creado.
      .send({
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