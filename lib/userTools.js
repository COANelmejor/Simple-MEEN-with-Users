const crypto = require('crypto');

/**
 * ## createSalt
 * Retorna un string con valores hexadecimales aleatorios.
 * 
 * Se utiliza [crypto.randomBytes](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) para la generación de este string.
 * 
 * ### Más Info
 * 
 * #### crypto.randomBytes
 * https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
 * 
 * @returns String
 */
function createSalt (){
    return crypto.randomBytes(16).toString('hex');
}

/**
 * ## createHash
 * Retorna un string hexadecimal con el password encriptado usando un salt.
 * 
 * Se uiliza el proceso[crypto.pbkdf2Sync (Password - Based Key Derivation Function 2)](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest) para generar este string
 * y se utiliza el argoritmo [SHA-2](https://es.wikipedia.org/wiki/SHA-2) en su variante SHA512.
 * 
 * ### Más Info
 * 
 * #### crypto.pbkdf2Sync
 * https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest
 * 
 * #### SHA-2
 * https://es.wikipedia.org/wiki/SHA-2
 * 
 * @param {String} pass - String con el password que se quiere encriptar 
 * @param {String} salt - String Hexadecimal usado para la emcriptación 
 * @returns String
 */
function createHash(pass, salt){
    return crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex');
}

 /**
  * ## checkPassword(password, user)
  * 
  * Función para corroborar si el password enviado por el usuario es el correcto.
  * 
  * Se usa el salt proveído en el objeto del usuario para hacer la conversión
  * y luego se compara con el hash del mismo para validar
  * 
  * @param {String} password - String con el password enviado desde el cliente
  * @param {'Object'} user - Objeto con el usuario
  * @returns String
  */
function checkPassword(password, user) {
    if (user == null) {
        return false
    } else {
        var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`);
        return hash === user.hash;
    }
};

module.exports = {
    createSalt, createHash, checkPassword
}