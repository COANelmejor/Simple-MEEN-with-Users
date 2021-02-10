const ck = require('./checkBooleanKey');

/**
 * # checkPermission
 * Función que sirve par verificar si un permiso está asignado a un usuario, o si este usuario es 'admin' 
 * 
 * @param {'Object'} rPath - Path del del request
 * @param {String} tPath - Texto del Path a comparar
 * @param {'Object'} rMethod - Method del request
 * @param {String} tMethod - Texto del Metodo a comparar
 * @param {'Object'} rUser - Objeto que tien los datos del usuario
 * @param {String} pUser - Texto del permiso que se quiere averiguar
 */
function cP(rPath, tPath, rMethod, tMethod, rUser, pUser) {
    if ((rPath == tPath && rMethod == tMethod) && (ck(rUser, pUser) || ck(rUser, 'admin'))) {
        return true;
    } else {
        return false;
    }
}

module.exports = cP;