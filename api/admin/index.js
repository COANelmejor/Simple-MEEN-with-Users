var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/create-user-admin', require('./postCreateUserAdmin'));

module.exports = router;
