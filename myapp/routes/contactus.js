/* exactly correct one
var express = require('express');
var router = express.Router();
var contactusModel = require("../modules/contactusschema");

router.post('/', (req, res, next) => {
  var contactUsMessageDetails = new contactusModel({
    Firstname: req.body.firstname,
    Lastname: req.body.lastname,
    Mobilenumber: req.body.mobilenumber,
    Email: req.body.email,
    WriteMessage: req.body.writeusmessage
  });
  contactUsMessageDetails.save((err) => {
    if(err) throw err;
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
if(loginUser.loginUserCustomer) {
  res.render('dashboardwebsite', { title: 'Front End Web Developer', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserCustomer });
} else if(loginUser.loginUserEmployee){
  res.render('dashboardwebsite', { title: 'Front End Web Developer', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserEmployee });
} else if(loginUser.loginUserAdmin) {
  res.render('dashboardwebsiteadmin', { title: 'Front End Web Developer', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserAdmin});
} else {
  //res.redirect('index');
  res.render('index', {title: 'Music-Website', msg: 'Message Submitted Successfully, You will be contacted soon. Thanks!' });

}
    
  });
});
exactly correct one*/
/*
router.post('/', function(req, res, next) {
    var contactUsMessageDetails = new contactusModel({
      Firstname: req.body.firstname,
      Lastname: req.body.lastname,
      Mobilenumber: req.body.mobilenumber,
      Email: req.body.email,
      WriteMessage: req.body.writeusmessage
    });
    contactUsMessageDetails.save((err) => {
      if(err) throw err;

           
      var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
      
      if(loginUser.loginUserCustomer) {
        res.render('dashboardcustomer', { title: 'SaReGaMa Music Academy & GMP Studio', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserCustomer });
      } else if(loginUser.loginUserEmployee){
        res.render('dashboardemployees', { title: 'SaReGaMa Music Academy & GMP Studio', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserEmployee, savedData:'', staffdata: '', staffid: '' });
      } else if(loginUser.loginUserAdmin) {
        res.render('dashboardadmin', { title: 'SaReGaMa Music Academy & GMP Studio', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserAdmin, savedData: '', staffdata: '', staffid: '' });
      } else {
        res.render('index', {title: 'SaReGaMa Music Academy & GMP Studio', msg: 'Message Submitted Successfully, You will be contacted soon. Thanks!' });

      } 
       
          });
  });
  */
  var express = require('express');
  var router = express.Router();
  var contactusModel = require("../modules/contactusschema");
  

  var aws = require("aws-sdk");
  const ses = new aws.SES({"accessKeyId": process.env.SES_I_AM_USER_ACCESS_KEY, "secretAccessKey": process.env.SES_I_AM_USER_SECRET_ACCESS_KEY, "region": process.env.AWS_SES_REGION});


  router.post('/', (req, res, next) => {
    var contactUsMessageDetails = new contactusModel({
      Firstname: req.body.firstname,
      Lastname: req.body.lastname,
      Mobilenumber: req.body.mobilenumber,
      Email: req.body.email,
      WriteMessage: req.body.writeusmessage
    });
    
    contactUsMessageDetails.save((err) => {
      if(err) throw err;
      //sanitization
      
      //
      //Send Email
      var output = `
    <h3>Hi, You Have received a message through Contact Us</h3>
    <p>
    Firstname: ${req.body.firstname},<br/>
    Lastname: ${req.body.lastname},<br/>
    Mobilenumber: ${req.body.mobilenumber},<br/>
    Email: ${req.body.email},<br/>
    Message: ${req.body.writeusmessage} 
    </p>   
`;

// exactly correct one for production
let params = {
  // send to list
  Destination: {
      ToAddresses: [
        //'admin@quickwebsite.net'
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
          Data: "Query Message Through Contact Us"
      }
  },
  Source: 'vipinkmboj21@gmail.com',// 'contact@quickwebsite.net',//  // must relate to verified SES account
  ReplyToAddresses: [
    //'admin@quickwebsite.net'
      'vipinkmboj211@gmail.com'
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
    res.render('index', {title: 'Quick Website', msg: 'Contact Error, Try Again!' });
  
  }  

  } else {    

    if(loginUser.loginUserCustomer) {
      res.render('dashboardcustomer', { title: 'Quick Website', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserCustomer });
    } else if(loginUser.loginUserEmployee){
      res.render('dashboardemployees', { title: 'Quick Website', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserEmployee });
    } else if(loginUser.loginUserAdmin) {
      res.render('dashboardadmin', { title: 'Quick Website', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserAdmin});
    } else {
      //res.redirect('index');    
      res.render('index', {title: 'Quick Website', msg: 'Message Submitted Successfully, You will be contacted soon. Thanks!' });
    
    }     
    //res.render('signupcustomer', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
  }
});
//

      
  
      });
    
  });

  module.exports = router;