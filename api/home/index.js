var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', require('./getHome'));

module.exports = router;
