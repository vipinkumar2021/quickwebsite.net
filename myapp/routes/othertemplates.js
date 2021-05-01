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
    res.render('dashboardothertemplates', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee) {
    res.render('dashboardothertemplatesemployees', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardothertemplatesadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });

  } else {
    res.render('othertemplates', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  
});

module.exports = router;
