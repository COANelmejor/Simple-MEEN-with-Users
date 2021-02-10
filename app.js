const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors')
const path = require('path');

var userTools = require('./lib/userTools');

var app = express();

const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose');
var UserModel = require('./models/UserModel');
var autoIncrement = require('mongoose-auto-increment');

mongoose.connect(`${process.env.MONGOSERVER}/${process.env.DB}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection
autoIncrement.initialize(db);

passport.use(new Strategy(
  function (username, password, callback) {
    UserModel.findOne({
      username: username.toLowerCase()
    }, function (err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        return callback(null, false);
      } else if (!userTools.checkPassword(password, user)) {
        return callback(null, false);
      } else {
        return callback(null, user);
      }
    });
  }
));

passport.serializeUser(function (user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function (id, callback) {
  UserModel.findById(id, "-password -salt", function (err, user) {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Archivos estaticos que estarán en la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Declaración de modulos de NPM para usarse en frontend
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')));

// Permitir Cross-Origin Resource Sharing
app.use(cors());

app.use(session({
  secret: '01123581321',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.locals.libphonenumberjs = require('libphonenumber-js')
app.locals.moment = require('moment')

// Rutas para el API
require('./api')(app)

app.post('/api/login',
  passport.authenticate('local', {
    failureRedirect: '/api/login/failure'
  }),
  function (req, res) {
    res.redirect('/api/login/success');
  }
);

app.get('/api/login/failure', function (req, res) {
  res.status(401).send({
    message: 'La combinación de usuario y contraseña no coincide o no tienes permiso para iniciar sesión desde este dispositivo.'
  })
})

app.get('/api/login/success', function (req, res) {
  res.status(200).send({
    message: 'Bienvenido.',
    user: req.user
  })
})

app.get('/api/logout', function (req, res, next) {
  req.logout();
  res.send({
    message: 'Sesión cerrada con éxito.'
  })
});
app.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/')
});

// Rutas principales vistas por el frontend
require('./routes')(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.sendStatus(404)
  // next(createError(404));
});

// app.use(function (err, req, res, next) {
//   // render the error page
//   res.status(err.status || 500).send(err);

// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
