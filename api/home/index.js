var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.send({
      message: "Bienvenido"
    })
  } else {
    res.send({
      message: "Bienvenido",
      user: req.user
    })
  }
});

module.exports = router;
