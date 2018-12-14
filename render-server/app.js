const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const company = require('./config/company');
const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');
const reportsRouter = require('./controllers/reports');
const cors = require('cors')
const app = express();


app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.company = company;
    next()
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
