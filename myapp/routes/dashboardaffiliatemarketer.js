var express = require('express');
  var router = express.Router();
  var cartItemsModel = require("../modules/cartitemsschema");
  var customerModel = require("../modules/customersignupschema");
  var referralCodeModel = require('../modules/referralcodesschema');
  var purchasedModel = require('../modules/purchasedschema');
  //Crypto for creating randombytes key
var crypto = require('crypto');
  /* GET home page. */
  router.get('/', function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
    if(loginUser.loginUserCustomer) {

        var getReferralCodeData = referralCodeModel.find({Username: loginUser.loginUserCustomer});
        getReferralCodeData.exec((err, referralCodeData) => {
            if(err) {
                res.render('dashboardaffiliatemarketer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer, referralCodeData: '', purchasedOrderData: ''});
 
            } 
            if(referralCodeData != null) {
                // Get the order username who used your refrral code:
                var getPurchasedOrders = purchasedModel.find({});
                getPurchasedOrders.exec((err, purchasedOrderData) => {
                    if(err) {
                        res.redirect('dashboardaffiliatemarketer');
                        //res.render('dashboardaffiliatemarketer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer, referralCodeData: referralCodeData });
 
                    }
                    if(purchasedOrderData != null) {


                        res.render('dashboardaffiliatemarketer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer, referralCodeData: referralCodeData, purchasedOrderData: purchasedOrderData});
 
                    } 
                });
                //res.render('dashboardaffiliatemarketer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer, referralCodeData: referralCodeData });
 
            }
        });
      //res.render('dashboardaffiliatemarketer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
    } else {
        res.redirect('/');
      //res.render('index', { title: 'Quick Website', msg: '', loginUser: ''  });
    }
    
  });

  /*
  function checkExistingReferralCode(req, res, next) {  
    var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
        loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
        loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
    
      };
      if(loginUser.loginUserCustomer) { 
        var getReferralCodeDataa = referralCodeModel.find({Username: req.session.customerLoginUserName});
   getReferralCodeDataa.exec((err, referralData) => {
    if(err) throw err;

    if(referralData) {
       return res.render('dashboardaffiliatemarketer', { title: 'Quick Website', msg: 'You already have a Referral Code! No need to create new one', loginUser: loginUser.loginUserCustomer, referralCodeData: '' });

    } 
    
        next();
    
      
       
    
   });
      } else {
          res.redirect('index');
      } 
   
  }
  */

  router.post('/', /* checkExistingReferralCode,*/ function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
    if(loginUser.loginUserCustomer) {

        //    

        //
        referralCodeModel.findOne({Username: loginUser.loginUserCustomer}).exec((err, referralCodeExistingData) => {
            if(err) throw err;
            if(referralCodeExistingData) {
                res.render('dashboardaffiliatemarketer', { title: 'Quick Website', msg: 'Referral Code Already Exists! No need to create new one!', loginUser: loginUser.loginUserCustomer, referralCodeData: '' });

            } 
            if(!referralCodeExistingData) {

                var referralCode = crypto.randomBytes(16).toString('hex');
        var referralCodeDetails = new referralCodeModel({
            Username: loginUser.loginUserCustomer,           
            ReferralCode: referralCode

        });
        referralCodeDetails.save((err, referralCodeData) => {
            if(err) {
                res.redirect('dashboardaffiliatemarketer');
                //res.render('dashboardaffiliatemarketer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });

            } else {
                res.render('dashboardaffiliatemarketer', { title: 'Quick Website', msg: 'Referral Code Created!', loginUser: loginUser.loginUserCustomer, referralCodeData: referralCodeData });

            }
        });


            }
        });
        //
        
        //
      //res.render('dashboardaffiliatemarketer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
    } else {
      res.render('index', { title: 'Quick Website', msg: '', loginUser: '' });
    }
    
  });


  

  module.exports = router;