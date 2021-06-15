var express = require('express');
var router = express.Router();

var feedbackModel = require('../modules/feedbackschema.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardgivefeedback', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee) {
    res.render('dashboardgivefeedback', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardgivefeedback', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });

  } else {
    res.render('givefeedback', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  
});

router.post('/', function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
    var currentAccountUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;

    if(currentAccountUser) {
        var feedbackDetails = new feedbackModel({
            Feedback: req.body.feedback,
            Suggestion: req.body.suggestion
        });
        feedbackDetails.save((err) => {
            if(err) {
                res.render('dashboardgivefeedback', { title: 'Quick Website', msg: '', loginUser: currentAccountUser });
            } else{
                res.render('dashboardgivefeedback', { title: 'Quick Website', msg: 'Thanks for your Feedback, It\'s valuable for us.', loginUser: currentAccountUser });
            }            
        });      
    } else {
      res.render('givefeedback', { title: 'Quick Website', msg: '', loginUser: '' });
    }
    
  });

module.exports = router;
