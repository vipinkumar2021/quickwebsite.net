var express = require('express');
var router = express.Router();

// require dot env
require('dotenv').config();
//using stripe payment gateway
var stripeSecretKey = process.env.STRIPE_SECRET_KEY;
var stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
// stripe
const stripe = require('stripe')(stripeSecretKey);


//const YOUR_DOMAIN = 'http://localhost:5000';
var cartItemsModel = require('../modules/cartitemsschema');
var recycleBinModel = require('../modules/recyclebinschema');
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
          res.render('dashboardcart', {title: 'Quick Website', msg:'No Item in Customer Cart', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: ''});
        }
        if(currentCustomerAccountUserCartItems) {
          res.render('dashboardcart', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
        } else {
          res.render('dashboardcart', {title: 'Quick Website', msg:'No Item in Customer Cart', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: ''});
        }
              });
    } else {
      res.redirect('/');
    }
  });
  
  // delete starts
router.post('/delete/:id', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  };
  var currentAccountUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;
  if(currentAccountUser) {
    var currentAccountUserItemId = req.params.id;
    //var currentAccountUserItemId = req.body.currentItemId;
    //var currentAccountUserItemId = req.body.currentOrderId;//req.params.id;

    console.log(currentAccountUserItemId);
    
    
    cartItemsModel.findByIdAndRemove(currentAccountUserItemId, function(err, itemToBeMovedToRecycleBin) {
      if(err) {
        res.render('dashboardcart', {title: 'Quick Website', msg:'Error Occured while Deleting, Try Again', loginUser: currentAccountUser, currentCustomerAccountUserCartItems: '', itemToBeMovedToRecycleBin: ''});
      }
      if(itemToBeMovedToRecycleBin) {
        var deletedItem = new recycleBinModel({
          Username: currentAccountUser,
          DeletedCustomerAccountCartItem: itemToBeMovedToRecycleBin
        });
        deletedItem.save((err) => {
          if(err) {
            res.render('dashboardcart', {title: 'Quick Website', msg:'Error Occured while Moving Item To Recycle Bin, Try Again', loginUser: currentAccountUser, currentCustomerAccountUserCartItems: '', itemToBeMovedToRecycleBin: ''});
          } else {
            res.render('dashboardcart', {title: 'Quick Website', msg:'Item Moved to Recycle Bin Successfully', loginUser: currentAccountUser, currentCustomerAccountUserCartItems: '', itemToBeMovedToRecycleBin: itemToBeMovedToRecycleBin});
          }
        });
      }
    });
    
  } else {
    res.redirect('/');
  }
});

// delete ends
  
//update cart once the order is purchased
router.post('/dashboardcart/updatecart/:id', function(req, res, next) {

  var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
    };
  if(loginUser.loginUserCustomer) {
    var itemId = req.body.orderId;
    cartItemsModel.find({Username: loginUser.loginUserCustomer}).exec((err, currentCustomerAccountUserCartItems) => {
      if(err) {
        res.render('dashboardcart', {title: 'Quick Website', msg:'No Item in Customer Cart', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: ''});
      }
      if(currentCustomerAccountUserCartItems) {
        res.render('dashboardcart', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
      } else {
        res.render('dashboardcart', {title: 'Quick Website', msg:'No Item in Customer Cart', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: ''});
      }
            });
  } else {
    res.redirect('/');
  }
});


//update cart once the order is purchased
/*
  router.post('/delete/:id', function(req, res, next) {

    var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
        loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
        loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
      };
    if(loginUser.loginUserCustomer) {
      cartItemsModel.find({Username: loginUser.loginUserCustomer}).exec((err, currentCustomerAccountUserCartItems) => {
        if(err) {
          res.render('dashboardcart', {title: 'Quick Website', msg:'No Item in Customer Cart', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: ''});
        }
        if(currentCustomerAccountUserCartItems) {
          var currentCustomerAccountUserCartItemId = req.params;//'60a4edb278bd7a5d9c4f85ac';
          cartItemsModel.findByIdAndDelete(currentCustomerAccountUserCartItemId, function(err, itemToBeMovedToRecycleBin) {
            if(err) {
              res.render('dashboardcart', {title: 'Quick Website', msg:'Error Occured while Deleting, Try Again', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
            }
            if(itemToBeMovedToRecycleBin) {
              
              var deletedItem = new recycleBinModel({
                DeletedCustomerAccountCartItem: itemToBeMovedToRecycleBin
              });
              deletedItem.save((err, deletedCustomerAccountCartItem) => {
                if(err) {
                  res.render('dashboardcart', {title: 'Quick Website', msg:'Error Occured while moving Item to Recycle Bin, Try Again', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
                }
                if(deletedCustomerAccountCartItem) {
                  res.render('dashboardcart', {title: 'Quick Website', msg:'Item moved to Recycle Bin', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
                }
              });
            }
          })
          res.render('dashboardcart', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
        } else {
          res.render('dashboardcart', {title: 'Quick Website', msg:'No Item in Customer Cart', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: ''});
        }
              });
    } else {
      res.redirect('/');
    }
  });
    */
      

module.exports = router;
