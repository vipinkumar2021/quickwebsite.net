var express = require('express');
var router = express.Router();

var cartItemsModel = require('../modules/cartitemsschema');
/* GET home page. */
router.get('/', function(req, res, next) {

    var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
        loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
        loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
    
      };
    if(loginUser.loginUserCustomer) {
      cartItemsModel.find({Username: loginUser.loginUserCustomer}).exec((err, currentCustomerAccountUserCartItems) => {
        if(err) {
          res.render('dashboardcart1', {title: 'Quick Website', msg:'No Item in Customer Cart', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: ''});

        }
        if(currentCustomerAccountUserCartItems) {
          res.render('dashboardcart1', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});

        } else {
          res.render('dashboardcart1', {title: 'Quick Website', msg:'No Item in Customer Cart', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: ''});

        }
              });
    } else {
      res.redirect('/');
    }     

    });
      

module.exports = router;