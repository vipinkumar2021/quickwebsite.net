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
var dashboardweddinginvitationtemplatesRouter = require('./routes/dashboardweddinginvitationtemplates');

var webpagetemplatesRouter = require('./routes/webpagetemplates');
var comingsoontemplatesRouter = require('./routes/comingsoontemplates');
var dashboardcomingsoontemplatesRouter = require('./routes/dashboardcomingsoontemplates');
var othertemplatesRouter = require('./routes/othertemplates');
var dashboardothertemplatesRouter = require('./routes/dashboardothertemplates');

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
var dashboardtermsandconditionsemployeesRouter = require('./routes/dashboardtermsandconditionsemployees');
//var termsandconditionsRouter = require('./routes/termsandconditions');

var helpRouter = require('./routes/help');
var dashboardhelpRouter = require('./routes/dashboardhelp');

var employeesRouter = require('./routes/employees');
var dashboardemployeesRouter = require('./routes/dashboardemployees');
var dashboardemployeesprofileRouter = require('./routes/dashboardemployeesprofile');
/*
var dashboardhelpadminRouter = require('./routes/dashboardhelpadmin');
var dashboardhelpemployeeRouter = require('./routes/dashboardhelpemployee');

*/
var dashboarddecidebyfeaturesRouter = require('./routes/dashboarddecidebyfeatures');
var contactusRouter = require('./routes/contactus');
var dashboardpostaddRouter = require('./routes/dashboardpostadd');
var dashboardpostaddemployeesRouter = require('./routes/dashboardpostaddemployees');
var dashboardcartRouter = require('./routes/dashboardcart');
var dashboardcart1Router = require('./routes/dashboardcart1');

var dashboardcartadminRouter = require('./routes/dashboardcartadmin');
var dashboardcustomerRouter = require('./routes/dashboardcustomer');
var dashboardcustomerprofileRouter = require('./routes/dashboardcustomerprofile');
var dashboardadminRouter = require('./routes/dashboardadmin');
var signoutRouter = require('./routes/signout');
var dashboardinboxRouter = require('./routes/dashboardinbox');
var dashboardinboxemployeesRouter = require('./routes/dashboardinboxemployees');

var dashboardoutboxRouter = require('./routes/dashboardoutbox');
var dashboardoutboxemployeesRouter = require('./routes/dashboardoutboxemployees');
var dashboardrecyclebinRouter = require('./routes/dashboardrecyclebin');
var dashboardsettingsRouter = require('./routes/dashboardsettings');

var pizzarestaurantdemoRouter = require('./routes/pizzarestaurantdemo');
var dashboardpizzarestaurantdemoRouter = require('./routes/dashboardpizzarestaurantdemo');

var cateringtemplatedemoRouter = require('./routes/cateringtemplatedemo');
var dashboardcateringtemplatedemoRouter = require('./routes/dashboardcateringtemplatedemo');
//var dashboardcateringtemplatedemoemployeeRouter = require('./routes/dashboardcateringtemplatedemoemployee');
//var dashboardcateringtemplatedemoadminRouter = require('./routes/dashboardcateringtemplatedemoadmin');


var modalrestauranttemplatedemoRouter = require('./routes/modalrestauranttemplatedemo');
var dashboardmodalrestauranttemplatedemoRouter = require('./routes/dashboardmodalrestauranttemplatedemo');

var cafetemplatedemoRouter = require('./routes/cafetemplatedemo');
var dashboardcafetemplatedemoRouter = require('./routes/cafetemplatedemo');

var portfoliotemplatedemoRouter = require('./routes/portfoliotemplatedemo');
var dashboardportfoliotemplatedemoRouter = require('./routes/dashboardportfoliotemplatedemo');


var resumetemplatedemoRouter = require('./routes/resumetemplatedemo');
var dashboardresumetemplatedemoRouter = require('./routes/dashboardresumetemplatedemo');

var photoportfoliotemplatedemoRouter = require('./routes/photoportfoliotemplatedemo');
var dashboardphotoportfoliotemplatedemoRouter = require('./routes/dashboardphotoportfoliotemplatedemo');

var natureportfoliotemplatedemoRouter = require('./routes/natureportfoliotemplatedemo');
var dashboardnatureportfoliotemplatedemoRouter = require('./routes/dashboardnatureportfoliotemplatedemo');

var bandtemplatedemoRouter = require('./routes/bandtemplatedemo');
var dashboardbandtemplatedemoRouter = require('./routes/dashboardbandtemplatedemo');

var blogtemplatedemoRouter = require('./routes/blogtemplatedemo');
var dashboardblogtemplatedemoRouter = require('./routes/dashboardblogtemplatedemo');

var foodblogtemplatedemoRouter = require('./routes/foodblogtemplatedemo');
var dashboardfoodblogtemplatedemoRouter = require('./routes/dashboardfoodblogtemplatedemo');

var fashionblogtemplatedemoRouter = require('./routes/fashionblogtemplatedemo');
var dashboardfashionblogtemplatedemoRouter = require('./routes/dashboardfashionblogtemplatedemo');


var cafeblogtemplatedemoRouter = require('./routes/cafeblogtemplatedemo');
var dashboardcafeblogtemplatedemoRouter = require('./routes/dashboardcafeblogtemplatedemo');

var travelblogtemplatedemoRouter = require('./routes/travelblogtemplatedemo');
var dashboardtravelblogtemplatedemoRouter = require('./routes/dashboardtravelblogtemplatedemo');

var clothingstoretemplatedemoRouter = require('./routes/clothingstoretemplatedemo');
var dashboardclothingstoretemplatedemoRouter = require('./routes/dashboardclothingstoretemplatedemo');

var comingsoontemplatedemoRouter = require('./routes/comingsoontemplatedemo');
var dashboardcomingsoontemplatedemoRouter = require('./routes/dashboardcomingsoontemplatedemo');

var weddinginvitationtemplatedemoRouter = require('./routes/weddinginvitationtemplatedemo');
var dashboardweddinginvitationtemplatedemoRouter = require('./routes/dashboardweddinginvitationtemplatedemo');

var photoalbumtemplatedemoRouter = require('./routes/photoalbumtemplatedemo');
var dashboardphotoalbumtemplatedemoRouter = require('./routes/dashboardphotoalbumtemplatedemo');
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
var dashboardgivefeedbackemployeesRouter = require('./routes/dashboardgivefeedbackemployees');
var dashboardfreelancepageRouter = require('./routes/dashboardfreelancepage');
var dashboardfreelancepageemployeesRouter = require('./routes/dashboardfreelancepageemployees');
var freelancejobsRouter = require('./routes/freelancejobs');
var dashboardfreelancejobsemployeesRouter = require('./routes/dashboardfreelancejobsemployees');
var freelancejobscommentsRouter = require('./routes/freelancejobscomments');
var dashboardfreelancejobscommentsemployeesRouter = require('./routes/dashboardfreelancejobscommentsemployees');
var startearningRouter = require('./routes/startearning');
//var affiliatemarketerfirsttimersRouter = require('./routes/dashboardaffiliatemarketer');
var affiliatemarketerfirsttimersRouter = require('./routes/affiliatemarketerfirsttimers');
var dashboardaffiliatemarketerRouter = require('./routes/dashboardaffiliatemarketer');
var redeemRouter = require('./routes/redeem');


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
app.use('/dashboardweddinginvitationtemplates', dashboardweddinginvitationtemplatesRouter);

app.use('/webpagetemplates', webpagetemplatesRouter);

app.use('/comingsoontemplates', comingsoontemplatesRouter);
app.use('/dashboardcomingsoontemplates', dashboardcomingsoontemplatesRouter);
app.use('/othertemplates', othertemplatesRouter);
app.use('/dashboardothertemplates', dashboardothertemplatesRouter);

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
app.use('/dashboardtermsandconditionsemployees', dashboardtermsandconditionsemployeesRouter);
//app.use('/termsandconditions', termsandconditionsRouter);

app.use('/help', helpRouter);
app.use('/dashboardhelp', dashboardhelpRouter);

app.use('/employees', employeesRouter);
app.use('/dashboardemployees', dashboardemployeesRouter);
app.use('/dashboardemployeesprofile', dashboardemployeesprofileRouter);
/*
app.use('/dashboardhelpadmin', dashboardhelpadminRouter);
app.use('/dashboardhelpemployee', dashboardhelpemployeeRouter);
*/
app.use('/dashboarddecidebyfeatures', dashboarddecidebyfeaturesRouter);
app.use('/contactus', contactusRouter);
app.use('/dashboardpostadd', dashboardpostaddRouter);
app.use('/dashboardpostaddemployees', dashboardpostaddemployeesRouter);
app.use('/dashboardcart', dashboardcartRouter);
app.use('/dashboardcart1', dashboardcart1Router);

app.use('/dashboardcartadmin', dashboardcartadminRouter);
app.use('/dashboardcustomer', dashboardcustomerRouter);
app.use('/dashboardcustomerprofile', dashboardcustomerprofileRouter);
app.use('/dashboardadmin', dashboardadminRouter);
app.use('/signout', signoutRouter);
app.use('/dashboardinbox', dashboardinboxRouter);
app.use('/dashboardinboxemployees', dashboardinboxemployeesRouter);

app.use('/dashboardoutbox', dashboardoutboxRouter);
app.use('/dashboardoutboxemployees', dashboardoutboxemployeesRouter);
//app.use('/dashboardrecyclebin', dashboardrecyclebinRouter);
app.use('/dashboardsettings', dashboardsettingsRouter);

app.use('/pizzarestaurantdemo', pizzarestaurantdemoRouter);
app.use('/dashboardpizzarestaurantdemo', dashboardpizzarestaurantdemoRouter);

app.use('/cateringtemplatedemo', cateringtemplatedemoRouter);
app.use('/dashboardcateringtemplatedemo', dashboardcateringtemplatedemoRouter);

app.use('/modalrestauranttemplatedemo', modalrestauranttemplatedemoRouter);
app.use('/dashboardmodalrestauranttemplatedemo', dashboardmodalrestauranttemplatedemoRouter);

app.use('/cafetemplatedemo', cafetemplatedemoRouter);
app.use('/dashboardcafetemplatedemo', dashboardcafetemplatedemoRouter);

app.use('/portfoliotemplatedemo', portfoliotemplatedemoRouter);
app.use('/dashboardportfoliotemplatedemo', dashboardportfoliotemplatedemoRouter);

app.use('/resumetemplatedemo', resumetemplatedemoRouter);
app.use('/dashboardresumetemplatedemo', dashboardresumetemplatedemoRouter);

app.use('/photoportfoliotemplatedemo', photoportfoliotemplatedemoRouter);
app.use('/dashboardphotoportfoliotemplatedemo', dashboardphotoportfoliotemplatedemoRouter);

app.use('/natureportfoliotemplatedemo', natureportfoliotemplatedemoRouter);
app.use('/dashboardnatureportfoliotemplatedemo', dashboardnatureportfoliotemplatedemoRouter);

app.use('/bandtemplatedemo', bandtemplatedemoRouter);
app.use('/dashboardbandtemplatedemo', dashboardbandtemplatedemoRouter);

app.use('/blogtemplatedemo', blogtemplatedemoRouter);
app.use('/dashboardblogtemplatedemo', dashboardblogtemplatedemoRouter);

app.use('/foodblogtemplatedemo', foodblogtemplatedemoRouter);
app.use('/dashboardfoodblogtemplatedemo', dashboardfoodblogtemplatedemoRouter);

app.use('/fashionblogtemplatedemo', fashionblogtemplatedemoRouter);
app.use('/dashboardfashionblogtemplatedemo', dashboardfashionblogtemplatedemoRouter);

app.use('/cafeblogtemplatedemo', cafeblogtemplatedemoRouter);
app.use('/dashboardcafeblogtemplatedemo', dashboardcafeblogtemplatedemoRouter);

app.use('/travelblogtemplatedemo', travelblogtemplatedemoRouter);
app.use('/dashboardtravelblogtemplatedemo', dashboardtravelblogtemplatedemoRouter);

app.use('/clothingstoretemplatedemo', clothingstoretemplatedemoRouter);
app.use('/dashboardclothingstoretemplatedemo', dashboardclothingstoretemplatedemoRouter);

app.use('/comingsoontemplatedemo', comingsoontemplatedemoRouter);
app.use('/dashboardcomingsoontemplatedemo', dashboardcomingsoontemplatedemoRouter);

app.use('/weddinginvitationtemplatedemo', weddinginvitationtemplatedemoRouter);
app.use('/dashboardweddinginvitationtemplatedemo', dashboardweddinginvitationtemplatedemoRouter);

app.use('/photoalbumtemplatedemo', photoalbumtemplatedemoRouter);
app.use('/dashboardphotoalbumtemplatedemo', dashboardphotoalbumtemplatedemoRouter);

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
app.use('/dashboardgivefeedbackemployees', dashboardgivefeedbackemployeesRouter);
app.use('/dashboardfreelancepage', dashboardfreelancepageRouter);
app.use('/dashboardfreelancepageemployees', dashboardfreelancepageemployeesRouter);
app.use('/freelancejobs', freelancejobsRouter);
app.use('/dashboardfreelancejobsemployees', dashboardfreelancejobsemployeesRouter);
app.use('/freelancejobscomments', freelancejobscommentsRouter);
app.use('/dashboardfreelancejobscommentsemployees', dashboardfreelancejobscommentsemployeesRouter);
app.use('/startearning', startearningRouter);
app.use('/affiliatemarketerfirsttimers', affiliatemarketerfirsttimersRouter);
app.use('/dashboardaffiliatemarketer', dashboardaffiliatemarketerRouter);
app.use('/redeem', redeemRouter);


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
