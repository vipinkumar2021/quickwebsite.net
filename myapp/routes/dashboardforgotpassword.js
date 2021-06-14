var express = require('express');
var router = express.Router();
//Require bcrypt to encrypt password
//var bcrypt = require('bcryptjs');
//var adminModule = require('../modules/adminschema');

/* GET home page. */
router.get('/',  function(req, res, next) {
    var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,
        loginUserEmployee: req.session.employeeLoginUserName,
        loginUserAdmin: req.session.adminLoginUserName
    }
   
  if(loginUser.loginUserCustomer){
    //res.redirect('/dashboardcustomer');
    res.render('dashboardforgotpassword', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer});

  } else {
      res.redirect('/');
  }
      
});


module.exports = router;
