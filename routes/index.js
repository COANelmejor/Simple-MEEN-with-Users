module.exports = function (app) {
  app.use('/', require('./home'))
  app.use('/login', require('./login'))
}
