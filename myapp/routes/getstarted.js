/*var express = require('express');
var router = express.Router();


module.exports = router;

*/

var express = require('express');
  var router = express.Router();
  var cartItemsModel = require("../modules/cartitemsschema");
  var orderModel = require("../modules/orderschema")
  var env = require('dotenv')
  var nodemailer = require("nodemailer");

  env.config();
  /* GET home page. */
  router.get('/', function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
    if(loginUser.loginUserCustomer) {
      res.render('dashboardgetstarted', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
    } else if(loginUser.loginUserEmployee) {
      res.render('dashboardgetstartedemployees', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
    } else if(loginUser.loginUserAdmin) {
      res.render('dashboardgetstartedadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });
  
    } else {
      res.render('getstarted', { title: 'Quick Website', msg: '', loginUser: '' });
    }
    
  });

  var aws = require("aws-sdk");
  const ses = new aws.SES({"accessKeyId": process.env.SES_I_AM_USER_ACCESS_KEY, "secretAccessKey": process.env.SES_I_AM_USER_SECRET_ACCESS_KEY, "region": process.env.AWS_SES_REGION});


  router.post('/', (req, res, next) => {
    var orderDetails = new orderModel({
      Firstname: req.body.firstname,
      Lastname: req.body.lastname,
      Mobilenumber: req.body.mobilenumber,
      Email: req.body.email,
      HowCanWeHelpYou: req.body.howcanwehelpyou,
      WebsiteDescription: req.body.websitedescription,
      WebsiteFeatures: req.body.websitefeatures
    });
    
    orderDetails.save((err) => {
      if(err) throw err;
      //sanitization    

  // this sends the email
  // uncomment later
      var output = `
    <h3>Hi, You Have received an order message through Get Started</h3>
    <p>
    Firstname: ${req.body.firstname},<br/>
    Lastname: ${req.body.lastname},<br/>
    Mobilenumber: ${req.body.mobilenumber},<br/>
    Email: ${req.body.email},<br/>
    How can We Help You: ${req.body.howcanwehelpyou}, <br/>
    WebsiteDescription: ${req.body.websitedescription}, <br/>
    WebsiteFeatures: ${req.body.websitefeatures}<br/>

    </p>   
`;

// exactly correct one for production
let params = {
  // send to list
  Destination: {
      ToAddresses: [        
        'admin@quickwebsite.net',
          //'vipinkmboj211@gmail.com',
          'contact@quickwebsite.net'
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
          Data: "Order Message"
      }
  },
  Source: 'contact@quickwebsite.net',//'admin@quickwebsite.net',//vipinkmboj21@gmail.com',// 'contact@quickwebsite.net',//  // must relate to verified SES account
  ReplyToAddresses: [
    'admin@quickwebsite.net',
      //'vipinkmboj211@gmail.com',
      'contact@quickwebsite.net'
  ],
};

// this sends the email
ses.sendEmail(params, (err) => {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(err) {
    //res.render('signupcustomer', { title: 'frontendwebdeveloper', msg:'Contact Error, Try Again', adminDetails: ''}); 
  //throw err;

  if(loginUser.loginUserCustomer) {
    res.render('dashboardcustomer', { title: 'Quick Website', msg:'Contact Error, Try Again!', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee){
    res.render('dashboardemployees', { title: 'Quick Website', msg:'Contact Error, Try Again!', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardadmin', { title: 'Quick Website', msg:'Contact Error, Try Again!', loginUser: loginUser.loginUserAdmin});
  } else {
    //res.redirect('index');    
    res.render('getstarted', {title: 'Quick Website', msg: 'Contact Error, Try Again!' });
  
  }  

  } else {    

    if(loginUser.loginUserCustomer) {
      res.render('dashboardcustomer', { title: 'Quick Website', msg:'Order Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserCustomer });
    } else if(loginUser.loginUserEmployee){
      res.render('dashboardemployees', { title: 'Quick Website', msg:'Order Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserEmployee });
    } else if(loginUser.loginUserAdmin) {
      res.render('dashboardadmin', { title: 'Quick Website', msg:'Order Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserAdmin});
    } else {
      //res.redirect('index');    
      res.render('getstarted', {title: 'Quick Website', msg: 'Order Submitted Successfully, You will be contacted soon. Thanks!' });
    
    }     
    //res.render('signupcustomer', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
  }
});

//uncomment leter*/
//

      
  
      });
    
  });

  

  module.exports = router;