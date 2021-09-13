var express = require('express');
var router = express.Router();

var feedbackModel = require('../modules/feedbackschema.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardgivefeedback', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee) {
    res.render('dashboardgivefeedbackemployees', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardgivefeedbackadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });

  } else {
    res.render('givefeedback', { title: 'Quick Website', msg: '', loginUser: '' });
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
    var currentAccountUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;

    if(currentAccountUser) {
        var feedbackDetails = new feedbackModel({
            Username: currentAccountUser,
            Feedback: req.body.feedback,
            Suggestion: req.body.suggestion
        });
        feedbackDetails.save((err) => {
            if(err) {
                res.render('dashboardgivefeedbackemployees', { title: 'Quick Website', msg: '', loginUser: currentAccountUser });
            } else{
              //
              // Send Notification Email
        //
        //
      //Send Email
      var output = `
      <h3>Hi, You Have a new Customer Feedback</h3>
      <p>
            Username: ${currentAccountUser},<br/>
            Feedback: ${req.body.feedback},<br/>
            Suggestion: ${req.body.suggestion}
      </p>   
  `;
  
  // exactly correct one for production
  let params = {
    // send to list
    Destination: {
        ToAddresses: [
          'admin@quickwebsite.net',
            'vipinkmboj211@gmail.com'
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
            Data: "New Feedback from Employee"
        }
    },
    Source: 'contact@quickwebsite.net',//'admin@quickwebsite.net',//vipinkmboj21@gmail.com',// 'contact@quickwebsite.net',//  // must relate to verified SES account
    ReplyToAddresses: [
      'admin@quickwebsite.net',
        'vipinkmboj211@gmail.com'
    ],
  };

  // this sends the email
ses.sendEmail(params, (err) => {
  if(err) {
    res.render('dashboardgivefeedbackemployees', { title: 'Quick Website', msg: 'Thanks for your Feedback, It\'s valuable for us.', loginUser: currentAccountUser });
  } else {
    res.render('dashboardgivefeedbackemployees', { title: 'Quick Website', msg: 'Thanks for your Feedback, It\'s valuable for us.', loginUser: currentAccountUser });
  }
});
        //
              //
                //res.render('dashboardgivefeedback', { title: 'Quick Website', msg: 'Thanks for your Feedback, It\'s valuable for us.', loginUser: currentAccountUser });
            }            
        });      
    } else {
      res.render('givefeedback', { title: 'Quick Website', msg: '', loginUser: '' });
    }
    
  });

module.exports = router;
