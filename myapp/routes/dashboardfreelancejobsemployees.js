var express = require('express');
  var router = express.Router();
  var freelanceJobsModel = require("../modules/freelancejobsschema");
  

  var aws = require("aws-sdk");
  const ses = new aws.SES({"accessKeyId": process.env.SES_I_AM_USER_ACCESS_KEY, "secretAccessKey": process.env.SES_I_AM_USER_SECRET_ACCESS_KEY, "region": process.env.AWS_SES_REGION});


  router.get('/', function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
    if(loginUser.loginUserCustomer) {
      res.render('dashboardcustomer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
    } else if(loginUser.loginUserEmployee) {
      res.render('dashboardemployees', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
    } else if(loginUser.loginUserAdmin) {
      res.render('dashboardadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });
  
    } else {
      res.render('index', { title: 'Quick Website', msg: '', loginUser: '' });
    }
    
  });

  router.post('/', function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
    var currentLoginUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;
    if(currentLoginUser) {
      //res.render('dashboardcustomer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
    
      var freelanceJobsDetails = new freelanceJobsModel({
        Username: currentLoginUser,
        Type: 'Freelancer',
        Subject: req.body.subject,
        Description: req.body.description,
        Budget: '-',
        ServiceCharges: req.body.servicecharges,        
        Deadline: req.body.deadline            
      });
      freelanceJobsDetails.save((err)=> {
        if(err) throw err;

        //
        //Send Notification Email
      var email = 'vipinkmboj211@gmail.com'
      var output = `
      <h3>Hi, You got a new freelance job post</h3>
      <p>
      Username: ${loginUser.loginUserCustomer},<br/>
      Subject: ${req.body.subject},<br/>
      Description: ${req.body.description},<br/>
      Budget: ${req.body.budget},<br/>
      Deadline: ${req.body.deadline} 

      </p>
  `;
  
  // exactly correct one for production
  let params = {
    // send to list
    Destination: {
        ToAddresses: [
            email
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
                Data: 'Hey, this is test.'
            }
        },
        
        Subject: {
            Charset: 'UTF-8',
            Data: "New Freelance Job Post Email"
        }
    },
    Source: 'contact@quickwebsite.net',//'vipinkmboj21@gmail.com', // must relate to verified SES account
    ReplyToAddresses: [
        email,
        'admin@quickwebsite.net'
    ],
  };
  
  // this sends the email
  ses.sendEmail(params, (err) => {
    if(err) {
      res.render('dashboardemployees', { title: 'Quick Website', msg:'Error Occured, Email Sending failed', loginUser: currentLoginUser}); 
    } else {
      res.render('dashboardemployees', { title: 'Quick Website', msg:'Job Posted Successfully! Please wait for Freelancers to respond you', loginUser: currentLoginUser}); 
    }
  });
  //

        //
      })

    }  else {
      res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
    }
    
  });

  
 

  module.exports = router;