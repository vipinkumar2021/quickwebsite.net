var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardfoodandrestaurants', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee) {
    res.render('dashboardfoodandrestaurantsemployees', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardfoodandrestaurantsadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });

  } else {
    res.render('foodandrestaurants', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  
});

module.exports = router;
