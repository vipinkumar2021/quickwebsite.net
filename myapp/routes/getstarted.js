/*var express = require('express');
var router = express.Router();


module.exports = router;

*/

var express = require('express');
  var router = express.Router();
  var cartItemsModel = require("../modules/cartitemsschema");
  
  /* GET home page. */
  router.get('/', function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
    if(loginUser.loginUserCustomer) {
      res.render('dashboardgetstarted', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
    } else if(loginUser.loginUserEmployee) {
      res.render('dashboardgetstartedemployees', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
    } else if(loginUser.loginUserAdmin) {
      res.render('dashboardgetstartedadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });
  
    } else {
      res.render('getstarted', { title: 'Quick Website', msg: '', loginUser: '' });
    }
    
  });



  

  module.exports = router;