/*
var express = require('express');
var router = express.Router();

var cartItemsModel = require('../modules/cartitemsschema');

/* GET home page. */
/*
router.get('/', function(req, res, next) {

  var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };

    var currentAccountUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;

  if(currentAccountUser) {
    cartItemsModel.find({Username: currentAccountUser}).exec((err, currentAccountUserCartItems) => {
      if(err) {
        res.render('checkout', {title: 'Quick Website', msg:'No Item Found', loginUser: currentAccountUser, currentAccountUserCartItems: ''});

      }
      if(currentAccountUserCartItems) {
        res.render('checkout', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentAccountUserCartItems: currentAccountUserCartItems});

      } else {
        res.render('checkout', {title: 'Quick Website', msg:'No Item in Customer Cart', loginUser: loginUser.loginUserCustomer, currentAccountUserCartItems: ''});

      }
            });
  } else {
    res.redirect('/');
  }     

  });
  

module.exports = router;
*/