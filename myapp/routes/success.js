var express = require('express');
var router = express.Router();

// require dot env
require('dotenv').config();
//stripe
var cartItemsModel = require('../modules/cartitemsschema'); 
var purchasedModel = require('../modules/purchasedschema');
const { error } = require('console');
const { findByIdAndRemove, findOne } = require('../modules/cartitemsschema');
var itemId = require('./index');
//
const stripeSecretKey = process.env.STRIPE_SECRET_KEY_Test
//const stripeSecretKey = process.env.STRIPE_SECRET_KEY_Live 

//const stripePublicKey = process.env.STRIPE_PUBLIC_KEY_Test//process.env.STRIPE_PUBLIC_KEY_Live;
const stripe = require('stripe')(stripeSecretKey);


/* GET home page. */
router.get('/', async function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  
  if(loginUser.loginUserCustomer) {

    //
    const session = await stripe.checkout.sessions.retrieve(req.query.id, {
      expand: ['line_items']
    });
    //var Session = res.json(session); 

    var customerId = session.customer;
    var orderId = session.client_reference_id;
    var totalCost = session.amount_total;
    cartItemsModel.findByIdAndRemove(orderId, function(err, itemToBeMovedToPurchased) {
      if(err) throw err;
      if(itemToBeMovedToPurchased) {
        var purchasedDetail = new purchasedModel({
          Username: loginUser.loginUserCustomer,
          CustomerId: customerId,
          ClientReferenceId: orderId,
          Purchased: itemToBeMovedToPurchased,
          TotalCost: totalCost/100 + ' ' + '(' + session.currency + ')'
        });
        purchasedDetail.save((err) => {
          if(err) throw err;
          res.render('success', { title: 'Quick Website', msg: 'Check Your Details in Purchased Section', loginUser: loginUser.loginUserCustomer, Session: ''/*, customer: customer */});
        });
       
      }
    })
    /*
    cartItemsModel.find({Username: loginUser.loginUserCustomer}).exec(async (err, cartItemData) => {
      if(err) throw err;
      console.log(cartItemData);
      if(cartItemData != null) {

        var sessionId = cartItemData.sessionId
        if(sessionId != '') {

          const sessionn = await stripe.checkout.sessions.retrieve(
            sessionId
          );

          console.log(sessionn);
          res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer/*, customer: customer */ /*});
        } else {
          res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer/*, customer: customer */ /*});
        }


        
      } else {
        res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer/*, customer: customer */ /*});
      }
      
    });

*/
    //

    //res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer, Session: Session/*, customer: customer */});
  } else if(loginUser.loginUserEmployee) {
    res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee, Session: ''/*, customer: customer*/ });
  } else if(loginUser.loginUserAdmin) {
    res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin, Session: ''/*, customer: customer*/ });
  } else {
    res.redirect('/');
    //res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
  }  
});

/*
router.get('/', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.id);
    res.json(session);  
  
});
*/



module.exports = router;
