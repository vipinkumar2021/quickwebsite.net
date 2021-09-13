var express = require('express');
var router = express.Router();

var customerModel = require('../modules/customersignupschema');
var employeesModel = require('../modules/employeessignupschema');
var cartItemsModel = require('../modules/cartitemsschema');
var purchasedModel = require('../modules/purchasedschema');
var advertisementModel = require('../modules/advertisementschema');
/* GET home page. */

router.get('/',  function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserEmployee) {

    var customerModelData = employeesModel.findOne({Username: loginUser.loginUserEmployee});
    var cartItemsModelData = cartItemsModel.find({Username: loginUser.loginUserEmployee});
    var purchasedModelData = purchasedModel.find({Username: loginUser.loginUserEmployee});
    var advertisementModelData = advertisementModel.find({});
    customerModelData.exec((err, currentLoginData) => {
      if(err) {
        res.render('dashboardemployeesprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserEmployee, currentLogInData: '', allCartItems: '', allPurchasedItems: '', allAdvertisements: ''});
      } 
      cartItemsModelData.exec((err, allCartItems) => {
        if(err) {
          res.render('dashboardemployeesprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserEmployee, currentLogInData: '', allCartItems: '', allPurchasedItems: '', allAdvertisements: '' });
        }
        purchasedModelData.exec((err, allPurchasedItems) => {
          if(err) {
            res.render('dashboardemployeesprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserEmployee, currentLogInData: '', allCartItems: '', allPurchasedItems: '', allAdvertisements: '' });
          }
          //
          advertisementModelData.exec((err, allAdvertisements)=> {
            if(err) {
              res.render('dashboardemployeesprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserEmployee, currentLogInData: '', allCartItems: '', allPurchasedItems: '', allAdvertisements: '' });
            }
            res.render('dashboardemployeesprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserEmployee, currentLogInData: currentLoginData, allCartItems: allCartItems, allPurchasedItems: allPurchasedItems, allAdvertisements: allAdvertisements });
          });
          //
          //res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: currentLoginData, allCartItems: allCartItems, allPurchasedItems: allPurchasedItems });
        });
      });
    });
   
  } else {
    res.redirect('/');
  }
});

module.exports = router;
