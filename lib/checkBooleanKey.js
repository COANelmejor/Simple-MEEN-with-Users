/**
 * # checkBooleanKey
 * Sirve para determinar si un parametro boolean existe.
 * Debe usarse solo para chequear booleans.
 * 
 * @param {'Object'} Obj - Objeto del que que hará la comparación
 * @param {String} Key - String del parametro a buscar
 */
function checkBooleanKey(Obj, Key) {
    if (Obj[Key] == null) {
        return false
    } else if (typeof Obj[Key] == 'boolean') {
        return Obj[Key]
    } else if (typeof Obj[Key] == 'string') {
        if (Obj[Key].toLowerCase() == 'true') {
            return true
        } else {
            return false;
        }
    } else {
        return Obj[Key] == true
    }
}
module.exports = checkBooleanKey