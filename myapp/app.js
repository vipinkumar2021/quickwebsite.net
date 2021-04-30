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
var dashboardgetstartedRouter = require('./routes/dashboardgetstarted');
//var dashboardgetstartedadminRouter = require('./routes/dashboardgetstartedadmin');
var templatesRouter = require('./routes/templates');
var dashboardtemplatesRouter = require('./routes/dashboardtemplates');
var dashboardtemplatesadminRouter = require('./routes/dashboardtemplatesadmin');
var careerRouter = require('./routes/career');
var dashboardcareerRouter = require('./routes/dashboardcareer');
var dashboardcareeradminRouter = require('./routes/dashboardcareeradmin');
var adminRouter = require('./routes/admin');
var faqsRouter = require('./routes/faqs');
var addonRouter = require('./routes/addon');
var dashboardaddonRouter = require('./routes/dashboardaddon');
var dashboardaddonadminRouter = require('./routes/dashboardaddonadmin');
var dashboardfaqsRouter = require('./routes/dashboardfaqs');
var dashboardwebsiteadminRouter = require('./routes/dashboardwebsiteadmin');
var termsandconditionsRouter = require('./routes/termsandconditions');
var dashboardtermsandconditionsRouter = require('./routes/dashboardtermsandconditions');
//var termsandconditionsRouter = require('./routes/termsandconditions');
//var termsandconditionsRouter = require('./routes/termsandconditions');

var helpRouter = require('./routes/help');
var dashboardhelpRouter = require('./routes/dashboardhelp');

var employeesRouter = require('./routes/employees');
var dashboardemployeesRouter = require('./routes/dashboardemployees');
/*
var dashboardhelpadminRouter = require('./routes/dashboardhelpadmin');
var dashboardhelpemployeeRouter = require('./routes/dashboardhelpemployee');

*/
var decidebyfeaturesRouter = require('./routes/decidebyfeatures');
var contactusRouter = require('./routes/contactus');
var dashboardcartRouter = require('./routes/dashboardcart');
var dashboardcartadminRouter = require('./routes/dashboardcartadmin');
var dashboardcustomerRouter = require('./routes/dashboardcustomer');
var dashboardcustomerprofileRouter = require('./routes/dashboardcustomerprofile');
var dashboardadminRouter = require('./routes/dashboardadmin');
var signoutRouter = require('./routes/signout');
var dashboardinboxRouter = require('./routes/dashboardinbox');
var dashboardoutboxRouter = require('./routes/dashboardoutbox');
var dashboardrecyclebinRouter = require('./routes/dashboardrecyclebin');
var dashboardsettingsRouter = require('./routes/dashboardsettings');

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
app.use('/dashboardgetstarted', dashboardgetstartedRouter);
//app.use('/dashboardgetstartedadmin', dashboardgetstartedadminRouter);
app.use('/templates', templatesRouter);
app.use('/dashboardtemplates', dashboardtemplatesRouter);
app.use('/dashboardtemplatesadmin', dashboardtemplatesadminRouter);
app.use('/career', careerRouter);
app.use('/dashboardcareer', dashboardcareerRouter);
app.use('/dashboardcareeradmin', dashboardcareeradminRouter);
app.use('/admin', adminRouter);
app.use('/faqs', faqsRouter);
app.use('/addon', addonRouter);
app.use('/dashboardaddon', dashboardaddonRouter);
app.use('/dashboardaddonadmin', dashboardaddonadminRouter);
app.use('/dashboardfaqs', dashboardfaqsRouter);
app.use('/dashboardwebsiteadmin', dashboardwebsiteadminRouter);

app.use('/termsandconditions', termsandconditionsRouter);
app.use('/dashboardtermsandconditions', dashboardtermsandconditionsRouter);
//app.use('/termsandconditions', termsandconditionsRouter);
//app.use('/termsandconditions', termsandconditionsRouter);

app.use('/help', helpRouter);
app.use('/dashboardhelp', dashboardhelpRouter);

app.use('/employees', employeesRouter);
app.use('/dashboardemployees', dashboardemployeesRouter);
/*
app.use('/dashboardhelpadmin', dashboardhelpadminRouter);
app.use('/dashboardhelpemployee', dashboardhelpemployeeRouter);
*/
app.use('/decidebyfeatures', decidebyfeaturesRouter);
app.use('/contactus', contactusRouter);
app.use('/dashboardcart', dashboardcartRouter);
app.use('/dashboardcartadmin', dashboardcartadminRouter);
app.use('/dashboardcustomer', dashboardcustomerRouter);
app.use('/dashboardcustomerprofile', dashboardcustomerprofileRouter);
app.use('/dashboardadmin', dashboardadminRouter);
app.use('/signout', signoutRouter);
app.use('/dashboardinbox', dashboardinboxRouter);
app.use('/dashboardoutbox', dashboardoutboxRouter);
app.use('/dashboardrecyclebin', dashboardrecyclebinRouter);
app.use('/dashboardsettings', dashboardsettingsRouter);

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
