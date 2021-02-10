var express = require('express');
var router = express.Router();
const isLogged = require('../../middleware/isLogged');

/* GET home page. */
router.get('/create-user-admin', require('./postCreateUserAdmin'));

module.exports = router;
