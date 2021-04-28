var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//import session Vipin...
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var specialoffersRouter = require('./routes/specialoffers');
var getstartedRouter = require('./routes/getstarted');
var templatesRouter = require('./routes/templates');
var dashboardtemplatesRouter = require('./routes/dashboardtemplates');
var careerRouter = require('./routes/career');
var dashboardcareerRouter = require('./routes/dashboardcareer');
var dashboardcareeradminRouter = require('./routes/dashboardcareeradmin');
var adminRouter = require('./routes/admin');
var helpRouter = require('./routes/help');
var decidebyfeaturesRouter = require('./routes/decidebyfeatures');
var contactusRouter = require('./routes/contactus');
var dashboardcartRouter = require('./routes/dashboardcart');
var dashboardcustomerRouter = require('./routes/dashboardcustomer');
var dashboardadminRouter = require('./routes/dashboardadmin');
var signoutRouter = require('./routes/signout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// require dot env
require('dotenv').config();
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/specialoffers', specialoffersRouter);
app.use('/getstarted', getstartedRouter);
app.use('/templates', templatesRouter);
app.use('/dashboardtemplates', dashboardtemplatesRouter);
app.use('/career', careerRouter);
app.use('/dashboardcareer', dashboardcareerRouter);
app.use('/dashboardcareeradmin', dashboardcareeradminRouter);
app.use('/admin', adminRouter);
app.use('/help', helpRouter);
app.use('/decidebyfeatures', decidebyfeaturesRouter);
app.use('/contactus', contactusRouter);
app.use('/dashboardcart', dashboardcartRouter);
app.use('/dashboardcustomer', dashboardcustomerRouter);
app.use('/dashboardadmin', dashboardadminRouter);
app.use('/signout', signoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
