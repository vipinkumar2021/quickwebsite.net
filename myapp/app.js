var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//import session by Vipin... session is vulnerable
var session = require('express-session')

//Sanitize by Vipin 
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var specialoffersRouter = require('./routes/specialoffers');
var dashboardspecialoffersRouter = require('./routes/dashboardspecialoffers');
var getstartedRouter = require('./routes/getstarted');
var dashboardgetstartedRouter = require('./routes/dashboardgetstarted');
//var dashboardgetstartedadminRouter = require('./routes/dashboardgetstartedadmin');
var templatesRouter = require('./routes/templates');
var dashboardtemplatesRouter = require('./routes/dashboardtemplates');
var dashboardtemplatesadminRouter = require('./routes/dashboardtemplatesadmin');
var foodandrestaurantsRouter = require('./routes/foodandrestaurants');
var dashboardfoodandrestaurantsRouter = require('./routes/dashboardfoodandrestaurants');
//var dashboardtemplatesadminRouter = require('./routes/dashboardtemplatesadmin');
//var dashboardtemplatesadminRouter = require('./routes/dashboardtemplatesadmin');
//var dashboardtemplatesadminRouter = require('./routes/dashboardtemplatesadmin');
var portfoliotemplatesRouter = require('./routes/portfoliotemplates');
var dashboardportfoliotemplatesRouter = require('./routes/dashboardportfoliotemplates');
var smallbusinesswebsiteRouter = require('./routes/smallbusinesswebsite');
var dashboardsmallbusinesswebsiteRouter = require('./routes/dashboardsmallbusinesswebsite');

var blogtemplatesRouter = require('./routes/blogtemplates');
var dashboardblogtemplatesRouter = require('./routes/dashboardblogtemplates');
var weddinginvitationtemplatesRouter = require('./routes/weddinginvitationtemplates');
var webpagetemplatesRouter = require('./routes/webpagetemplates');
var comingsoontemplatesRouter = require('./routes/comingsoontemplates');
var othertemplatesRouter = require('./routes/othertemplates');

var careerRouter = require('./routes/career');
var dashboardcareerRouter = require('./routes/dashboardcareer');
var dashboardcareeradminRouter = require('./routes/dashboardcareeradmin');
var adminRouter = require('./routes/admin');
var faqRouter = require('./routes/faq');
var addonRouter = require('./routes/addon');
var dashboardaddonRouter = require('./routes/dashboardaddon');
var dashboardaddonadminRouter = require('./routes/dashboardaddonadmin');
var dashboardfaqRouter = require('./routes/dashboardfaq');
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
var dashboarddecidebyfeaturesRouter = require('./routes/dashboarddecidebyfeatures');
var contactusRouter = require('./routes/contactus');
var dashboardpostaddRouter = require('./routes/dashboardpostadd');
var dashboardcartRouter = require('./routes/dashboardcart');
var dashboardcart1Router = require('./routes/dashboardcart1');

var dashboardcartadminRouter = require('./routes/dashboardcartadmin');
var dashboardcustomerRouter = require('./routes/dashboardcustomer');
var dashboardcustomerprofileRouter = require('./routes/dashboardcustomerprofile');
var dashboardadminRouter = require('./routes/dashboardadmin');
var signoutRouter = require('./routes/signout');
var dashboardinboxRouter = require('./routes/dashboardinbox');
var dashboardoutboxRouter = require('./routes/dashboardoutbox');
var dashboardrecyclebinRouter = require('./routes/dashboardrecyclebin');
var dashboardsettingsRouter = require('./routes/dashboardsettings');

var pizzarestaurantdemoRouter = require('./routes/pizzarestaurantdemo');
var dashboardpizzarestaurantdemoRouter = require('./routes/dashboardpizzarestaurantdemo');

var cateringtemplatedemoRouter = require('./routes/cateringtemplatedemo');

var modalrestauranttemplatedemoRouter = require('./routes/modalrestauranttemplatedemo');

var cafetemplatedemoRouter = require('./routes/cafetemplatedemo');

var portfoliotemplatedemoRouter = require('./routes/portfoliotemplatedemo');

var resumetemplatedemoRouter = require('./routes/resumetemplatedemo');

var photoportfoliotemplatedemoRouter = require('./routes/photoportfoliotemplatedemo');

var natureportfoliotemplatedemoRouter = require('./routes/natureportfoliotemplatedemo');

var bandtemplatedemoRouter = require('./routes/bandtemplatedemo');

var blogtemplatedemoRouter = require('./routes/blogtemplatedemo');

var foodblogtemplatedemoRouter = require('./routes/foodblogtemplatedemo');

var fashionblogtemplatedemoRouter = require('./routes/fashionblogtemplatedemo');


var cafeblogtemplatedemoRouter = require('./routes/cafeblogtemplatedemo');

var travelblogtemplatedemoRouter = require('./routes/travelblogtemplatedemo');

var clothingstoretemplatedemoRouter = require('./routes/clothingstoretemplatedemo');

var comingsoontemplatedemoRouter = require('./routes/comingsoontemplatedemo');

var weddinginvitationtemplatedemoRouter = require('./routes/weddinginvitationtemplatedemo');

var photoalbumtemplatedemoRouter = require('./routes/photoalbumtemplatedemo');
var dashboarduploadadminRouter = require('./routes/dashboarduploadadmin');
//var createcheckoutsessionRouter = require('./routes/createcheckoutsession');
//var checkoutRouter = require('./routes/checkout');
var successRouter = require('./routes/success');
var cancelRouter = require('./routes/cancel');
var dashboardpurchasedRouter = require('./routes/dashboardpurchased');
var forgotpasswordRouter = require('./routes/forgotpassword');
var dashboardforgotpasswordRouter = require('./routes/dashboardforgotpassword');
var forgotusernameRouter = require('./routes/forgotusername');
var getusernameRouter = require('./routes/getusername');
var resetpasswordRouter = require('./routes/resetpassword');
var dashboardresetpasswordRouter = require('./routes/dashboardresetpassword');
var dashboardgivefeedbackRouter = require('./routes/dashboardgivefeedback');
var dashboardfreelancepageRouter = require('./routes/dashboardfreelancepage');
var freelancejobsRouter = require('./routes/freelancejobs');
var freelancejobscommentsRouter = require('./routes/freelancejobscomments');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

//Data Sanitization against NoSql Query Injection by Vipin...
app.use(mongoSanitize());
//Data Sanitization against XSS by Vipin...
app.use(xssClean());

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
app.use('/dashboardspecialoffers', dashboardspecialoffersRouter);
app.use('/getstarted', getstartedRouter);
app.use('/dashboardgetstarted', dashboardgetstartedRouter);
//app.use('/dashboardgetstartedadmin', dashboardgetstartedadminRouter);
app.use('/templates', templatesRouter);
app.use('/dashboardtemplates', dashboardtemplatesRouter);
app.use('/dashboardtemplatesadmin', dashboardtemplatesadminRouter);
app.use('/foodandrestaurants', foodandrestaurantsRouter);
app.use('/dashboardfoodandrestaurants', dashboardfoodandrestaurantsRouter);

/*app.use('/dashboardtemplatesadmin', dashboardtemplatesadminRouter);
app.use('/dashboardtemplatesadmin', dashboardtemplatesadminRouter);
app.use('/dashboardtemplatesadmin', dashboardtemplatesadminRouter);*/
app.use('/portfoliotemplates', portfoliotemplatesRouter);
app.use('/dashboardportfoliotemplates', dashboardportfoliotemplatesRouter);

app.use('/smallbusinesswebsite', smallbusinesswebsiteRouter);
app.use('/dashboardsmallbusinesswebsite', dashboardsmallbusinesswebsiteRouter);

app.use('/blogtemplates', blogtemplatesRouter);
app.use('/dashboardblogtemplates', dashboardblogtemplatesRouter);
app.use('/weddinginvitationtemplates', weddinginvitationtemplatesRouter);
app.use('/webpagetemplates', webpagetemplatesRouter);
app.use('/comingsoontemplates', comingsoontemplatesRouter);
app.use('/othertemplates', othertemplatesRouter);

app.use('/career', careerRouter);
app.use('/dashboardcareer', dashboardcareerRouter);
app.use('/dashboardcareeradmin', dashboardcareeradminRouter);
app.use('/admin', adminRouter);
app.use('/faq', faqRouter);
app.use('/addon', addonRouter);
app.use('/dashboardaddon', dashboardaddonRouter);
app.use('/dashboardaddonadmin', dashboardaddonadminRouter);
app.use('/dashboardfaq', dashboardfaqRouter);
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
app.use('/dashboarddecidebyfeatures', dashboarddecidebyfeaturesRouter);
app.use('/contactus', contactusRouter);
app.use('/dashboardpostadd', dashboardpostaddRouter);
app.use('/dashboardcart', dashboardcartRouter);
app.use('/dashboardcart1', dashboardcart1Router);

app.use('/dashboardcartadmin', dashboardcartadminRouter);
app.use('/dashboardcustomer', dashboardcustomerRouter);
app.use('/dashboardcustomerprofile', dashboardcustomerprofileRouter);
app.use('/dashboardadmin', dashboardadminRouter);
app.use('/signout', signoutRouter);
app.use('/dashboardinbox', dashboardinboxRouter);
app.use('/dashboardoutbox', dashboardoutboxRouter);
//app.use('/dashboardrecyclebin', dashboardrecyclebinRouter);
app.use('/dashboardsettings', dashboardsettingsRouter);

app.use('/pizzarestaurantdemo', pizzarestaurantdemoRouter);
app.use('/dashboardpizzarestaurantdemo', dashboardpizzarestaurantdemoRouter);

app.use('/cateringtemplatedemo', cateringtemplatedemoRouter);

app.use('/modalrestauranttemplatedemo', modalrestauranttemplatedemoRouter);

app.use('/cafetemplatedemo', cafetemplatedemoRouter);

app.use('/portfoliotemplatedemo', portfoliotemplatedemoRouter);

app.use('/resumetemplatedemo', resumetemplatedemoRouter);

app.use('/photoportfoliotemplatedemo', photoportfoliotemplatedemoRouter);

app.use('/natureportfoliotemplatedemo', natureportfoliotemplatedemoRouter);

app.use('/bandtemplatedemo', bandtemplatedemoRouter);

app.use('/blogtemplatedemo', blogtemplatedemoRouter);
app.use('/foodblogtemplatedemo', foodblogtemplatedemoRouter);
app.use('/fashionblogtemplatedemo', fashionblogtemplatedemoRouter);

app.use('/cafeblogtemplatedemo', cafeblogtemplatedemoRouter);

app.use('/travelblogtemplatedemo', travelblogtemplatedemoRouter);

app.use('/clothingstoretemplatedemo', clothingstoretemplatedemoRouter);

app.use('/comingsoontemplatedemo', comingsoontemplatedemoRouter);

app.use('/weddinginvitationtemplatedemo', weddinginvitationtemplatedemoRouter);

app.use('/photoalbumtemplatedemo', photoalbumtemplatedemoRouter);
app.use('/dashboarduploadadmin', dashboarduploadadminRouter);
//app.use('/createcheckoutsession', createcheckoutsessionRouter);
//app.use('/checkout', checkoutRouter);
app.use('/success', successRouter);
app.use('/cancel', cancelRouter);
app.use('/dashboardpurchased', dashboardpurchasedRouter);
app.use('/forgotpassword', forgotpasswordRouter);
app.use('/dashboardforgotpassword', dashboardforgotpasswordRouter);
app.use('/forgotusername', forgotusernameRouter);
app.use('/getusername', getusernameRouter);
app.use('/resetpassword', resetpasswordRouter);
app.use('/dashboardresetpassword', dashboardresetpasswordRouter);
app.use('/dashboardgivefeedback', dashboardgivefeedbackRouter);
app.use('/dashboardfreelancepage', dashboardfreelancepageRouter);
app.use('/freelancejobs', freelancejobsRouter);
app.use('/freelancejobscomments', freelancejobscommentsRouter);


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
