
'use strict';

const msg = module.exports = exports = {};

msg.DocumentNotFoundError = null;

msg.general = {};
msg.general.default = 'Validación fallida para el parámetro: `{PATH}`, con valor: `{VALUE}`';
msg.general.required = 'Parametro `{PATH}` es Requerido.';

msg.Number = {};
msg.Number.min = 'El parametro `{PATH}` ({VALUE}) es menor al valor mínimo permitido ({MIN}).';
msg.Number.max = 'El parametro `{PATH}` ({VALUE}) es mayor al valor mínimo permitido ({MAX}).';

msg.Date = {};
msg.Date.min = 'Path `{PATH}` ({VALUE}) is before minimum allowed value ({MIN}).';
msg.Date.max = 'Path `{PATH}` ({VALUE}) is after maximum allowed value ({MAX}).';

msg.String = {};
msg.String.enum = '`{VALUE}` no es un valor de enumeración válido para `{PATH}`.';
msg.String.match = 'El parámetro `{PATH}` es inválido ({VALUE}).';
msg.String.minlength = 'El parámetro `{PATH}` (`{VALUE}`) es más corto que la longitud mínima permitida ({MINLENGTH}).';
msg.String.maxlength = 'El parámetro `{PATH}` (`{VALUE}`) es más largo que la longitud máxima permitida ({MAXLENGTH}).';