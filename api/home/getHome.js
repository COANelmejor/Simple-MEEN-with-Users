module.exports = function (req, res) {
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
}