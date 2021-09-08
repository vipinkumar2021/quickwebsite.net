var express = require('express');
var router = express.Router();

var customerModel = require('../modules/customersignupschema');
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
  if(loginUser.loginUserCustomer) {

    var customerModelData = customerModel.findOne({Username: loginUser.loginUserCustomer});
    var cartItemsModelData = cartItemsModel.find({Username: loginUser.loginUserCustomer});
    var purchasedModelData = purchasedModel.find({Username: loginUser.loginUserCustomer});
    var advertisementModelData = advertisementModel.find({});
    customerModelData.exec((err, currentLoginData) => {
      if(err) {
        res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: '', allCartItems: '', allPurchasedItems: '', allAdvertisements: ''});
      } 
      cartItemsModelData.exec((err, allCartItems) => {
        if(err) {
          res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: '', allCartItems: '', allPurchasedItems: '', allAdvertisements: '' });
        }
        purchasedModelData.exec((err, allPurchasedItems) => {
          if(err) {
            res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: '', allCartItems: '', allPurchasedItems: '', allAdvertisements: '' });
          }
          //
          advertisementModelData.exec((err, allAdvertisements)=> {
            if(err) {
              res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: '', allCartItems: '', allPurchasedItems: '', allAdvertisements: '' });
            }
            res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: currentLoginData, allCartItems: allCartItems, allPurchasedItems: allPurchasedItems, allAdvertisements: allAdvertisements });
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
/*
router.get('/',  function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {

    
    customerModel.findOne({Username: loginUser.loginUserCustomer}).exec((err, currentLogInData) => {
      if(err) {
        res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: '', allCartItems: '' });
      } else {
        cartItemsModel.find({Username: loginUser.loginUserCustomer}).exec((err, allCartItems) => {
          if(err) {
            res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: currentLogInData, allCartItems: ''  });
          } /*  else {
            purchasedModel.find({Username: loginUser.loginUserCustomer}).exec((err, allPurchasedItems) => {
              if(err) {
                res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: currentLogInData, allCartItems: allCartItems });
              } 
              if(allPurchasedItems) {
                res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: currentLogInData, allCartItems: '' });
              } else {
                res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: currentLogInData, allCartItems: '' });
              }
            });
          }  */
          /*
          if(allCartItems) {
            
            res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: currentLogInData, allCartItems: allCartItems });
          } else {
            res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLogInData: currentLogInData, allCartItems: ''  });
          }
        });
        
      }

    });
  } else {
    res.redirect('/');
  }
});
/*
router.get('/',  function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
    if(loginUser.loginUserCustomer) {
        customerModel.findOne({Username: loginUser.loginUserCustomer}).exec((err, currentLoginData) => {
            if(err) {
                res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'Data Not Found', loginUser: loginUser.loginUserCustomer, currentLoginData: '' });
            }
            if(currentLoginData) {
                
                res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLoginData: currentLoginData });
            } else {
                res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'Data Not Found', loginUser: loginUser.loginUserCustomer, currentLoginData: '' });
            }
        });
      res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLoginData: '' });
    } else if(loginUser.loginUserEmployee){

      res.redirect('dashboardemployees');
      
    } else if(loginUser.loginUserAdmin) {
      
       res.redirect('dashboardadmin');
     
    } else {
      res.redirect('/');
    }   
  });
*/
module.exports = router;
