var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUserCustomer = req.session.customerLoginUserName;//localStorage.getItem('customerLoginUserName');
    var loginUserEmployee = req.session.employeeLoginUserName;//localStorage.getItem('employeeLoginUserName');
    var loginUserAdmin = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');
    
    if(loginUserCustomer){
      res.redirect('/dashboardcareer');
    } else if(loginUserEmployee) {
      res.redirect('/dashboardcareeremployee');
    } else if(loginUserAdmin) {
      res.redirect('/dashboardcareeradmin');
    } else {
      res.render('career', { title: 'Quick Website', msg:''});
    }
  
});

module.exports = router;
