var express = require('express');
var router = express.Router();

var redeemModel = require('../modules/redeemschema');
/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  var currentLoginUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;
  if(currentLoginUser) {
    res.render('redeem', { title: 'Quick Website', msg: '', loginUser: currentLoginUser });
  
  } else {
    res.render('index', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  
});

var aws = require("aws-sdk");
const ses = new aws.SES({"accessKeyId": process.env.SES_I_AM_USER_ACCESS_KEY, "secretAccessKey": process.env.SES_I_AM_USER_SECRET_ACCESS_KEY, "region": process.env.AWS_SES_REGION});

router.post('/', function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
    var currentLoginUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;
    if(currentLoginUser) {

        var redeemDetails = new redeemModel({
          
            Username: currentLoginUser,
            ReferralCode : req.body.referralcode,
            BankAccount: req.body.bankaccountnumber,
            Ifsc: req.body.ifsc,
            BankName: req.body.bankname,
            BankBranch : req.body.bankbranch               
            
            
        });
        redeemDetails.save((err) => {
            if(err) {
                res.render('redeem', { title: 'Quick Website', msg: 'Request Canceled, Please Try Again Later', loginUser: currentLoginUser });
    
            } else {
                //
                //Send Email
      var output = `
      <h3>Hi, You Have a new Redeem Message</h3>
      <p>
      Username: ${currentLoginUser} <br/>
      Referral Code: ${req.body.referralcode} <br/>
      Bank Account: ${req.body.bankaccountnumber} <br/>
      IFSC: ${req.body.ifsc} <br/>
      Bank Name: ${req.body.bankname} <br/>
      Bank Branch: ${req.body.bankbranch} <br/>
      
      </p>   
  `;
  
  // exactly correct one for production
  let params = {
    // send to list
    Destination: {
        ToAddresses: [
          'admin@quickwebsite.net'
            //'vipinkmboj211@gmail.com'
        ]
    },
    Message: {
        Body: {
            Html: {
                Charset: "UTF-8",
                Data: output//"<p>this is test body.</p>"
            },
            Text: {
                Charset: "UTF-8",
                Data: 'Text Message goes here'
            }
        },
        
        Subject: {
            Charset: 'UTF-8',
            Data: "Redeem Message"
        }
    },
    Source: 'contact@quickwebsite.net',//'admin@quickwebsite.net',//vipinkmboj21@gmail.com',// 'contact@quickwebsite.net',//  // must relate to verified SES account
    ReplyToAddresses: [
      'admin@quickwebsite.net'
        //'vipinkmboj211@gmail.com'
    ],
  };

  // this sends the email
  ses.sendEmail(params, (err) => {
    if(err) {
        res.render('redeem', { title: 'Quick Website', msg: '', loginUser: currentLoginUser });
    } else {
        res.render('redeem', { title: 'Quick Website', msg: 'Redeem Requested! Your commission will reach to your account once your referral order is completed!', loginUser: currentLoginUser });    }
  });
  

                //
                //res.render('redeem', { title: 'Quick Website', msg: 'Redeem Requested! Your commission will reach to your account once your referral order is completed!', loginUser: currentLoginUser });
    
            }
        });
      //res.render('redeem', { title: 'Quick Website', msg: '', loginUser: currentLoginUser });
    
    } else {
      res.render('index', { title: 'Quick Website', msg: '', loginUser: '' });
    }
    
  });

module.exports = router;
