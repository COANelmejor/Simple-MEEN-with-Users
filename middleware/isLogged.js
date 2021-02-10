module.exports = function(req, res, next) {
  if (req.user != null) {
    next();
  } else {
    res.status(401).send({
      message: "Es necesario iniciar sesión para acceder a estar URI."
    })
  }
}