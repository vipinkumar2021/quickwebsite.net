var express = require('express');
var router = express.Router();

//const YOUR_DOMAIN = 'http://localhost:5000';
//var cartItemsModel = require('../modules/cartitemsschema');
var recycleBinModel = require('../modules/recyclebinschema');

// require dot env
require('dotenv').config();
//stripe
var cartItemsModel = require('../modules/cartitemsschema'); 
var purchasedModel = require('../modules/purchasedschema');
const { error } = require('console');
const { findByIdAndRemove } = require('../modules/cartitemsschema');
//
const stripeSecretKey = process.env.STRIPE_SECRET_KEY_Test
//const stripeSecretKey = process.env.STRIPE_SECRET_KEY_Live 

//const stripePublicKey = process.env.STRIPE_PUBLIC_KEY_Test//process.env.STRIPE_PUBLIC_KEY_Live;
const stripe = require('stripe')(stripeSecretKey);





// require dot env
//require('dotenv').config();
//const stripeSecretKey = process.env.STRIPE_SECRET_KEY_Test
//const stripeSecretKey = process.env.STRIPE_SECRET_KEY_Live 

//const stripe = require('stripe')(stripeSecretKey);
/* GET home page. */
router.get('/', async function(req, res, next) {

    var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
        loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
        loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
      };
    if(loginUser.loginUserCustomer) {
      
      cartItemsModel.find({Username: loginUser.loginUserCustomer}).exec( async (err, currentCustomerAccountUserCartItems) => {
        if(err) {
          res.render('dashboardcart', {title: 'Quick Website', msg:'No Item in Customer Cart', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: ''});
        }
        if(currentCustomerAccountUserCartItems ) {
          //
          /*
          var sessionId = currentCustomerAccountUserCartItems[0].SessionId;
          if(sessionId != '') { // Also do changes || sessionId != null
            console.log(sessionId);

            const sessionnn = await stripe.checkout.sessions.retrieve(
              sessionId
            );
            console.log(sessionnn);
            console.log(`Payment Status: ${sessionnn.payment_status}`);
            console.log(`Client Reference Id/${sessionnn.client_reference_id}`);

            if(sessionnn.payment_status == 'paid') {
              findByIdAndRemove(sessionnn.client_reference_id, async function(err, itemToBeMovedToPurchased) {
                if(err) {
                  res.render('dashboardcart', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
                } else {
                  /*
                  var purchasedItemDetail = new purchasedModel({
                    Username: loginUser.loginUserCustomer,
                    Purchased: itemToBeMovedToPurchased
                  });
                  purchasedItemDetail.save(async function(err) {
                    if(err) {
                      res.render('dashboardcart', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
                    } else {
                      res.render('dashboardcart', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
                    }
                  }); *//*
                  res.render('dashboardcart', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
                }
              });
            } else {

              res.render('dashboardcart', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
            }
            
            
          } else {
            res.render('dashboardcart', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
          }
          
          //console.log(currentCustomerAccountUserCartItems[1].SessionId)
          
          
          //
           
          // 
          //if(sessionnn != '')
          /*if(sessionnn.payment_status == 'paid') {
            cartItemsModel.findOneAndRemove(sessionnn.client_reference_id, function(err, itemToBeMovedToPurchased) {
              if(err) throw err;
              if(itemToBeMovedToPurchased) {
                var purchasedItemDetail = new purchasedModel({
                  Username: loginUser.loginUserCustomer,
                  Purchased: itemToBeMovedToPurchased
                });
                purchasedItemDetail.save((err) => {
                  if(err) throw err;
                  res.render('dashboardcart', {title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentCustomerAccountUserCartItems: currentCustomerAccountUserCartItems});
                });
              } 
            });            
          } */
          //

          //
          
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
/*
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
*/

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
