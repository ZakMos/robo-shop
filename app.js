/**
 * EXTERNAL DEPS
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');

/**
 * CONFIGS
 */
const env = require('./config/environment');

/**
 * ROUTERS
 */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

/**
 * INIT
 */
const app = express();

/**
 * CONNECT DB
 */
mongoose.connect(
  env.db,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);
// eslint-disable-next-line no-console
mongoose.connection.on('error', console.error);

/**
 * VIEW ENGINE
 */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * LOGGING
 */
app.use(logger('dev'));

/**
 * REQUEST PARSERS
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * STATIC ASSET HANDLING
 */
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, 'public')));

/**
 * ROUTES
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * ERROR HANDLING
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-consts
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * EXPORT CONFIGUED APP
 */
module.exports = app;
