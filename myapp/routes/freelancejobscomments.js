var express = require('express');
  var router = express.Router();
  var freelanceJobsCommentsModel = require("../modules/freelancejobscommentsschema");
  

  var aws = require("aws-sdk");
  const ses = new aws.SES({"accessKeyId": process.env.SES_I_AM_USER_ACCESS_KEY, "secretAccessKey": process.env.SES_I_AM_USER_SECRET_ACCESS_KEY, "region": process.env.AWS_SES_REGION});


  router.get('/', function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
    if(loginUser.loginUserCustomer) {
      res.render('dashboardcustomer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer, currentLogInData: '' });
    } else if(loginUser.loginUserEmployee) {
      res.render('dashboardemployees', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee, currentLogInData: ''});
    } else if(loginUser.loginUserAdmin) {
      res.render('dashboardadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin, currentLogInData: '' });
  
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
    
      var freelanceJobsCommentsDetails = new freelanceJobsCommentsModel({
        CommenterUsername: currentLoginUser,
        Username: req.body.username,
        FreelanceJobId: req.body.freelancejobid,
        CommentOnFreelanceJob: req.body.freelancejobcomment
                   
      });
      freelanceJobsCommentsDetails.save((err)=> {
        if(err) throw err;

        //
        //Send Notification Email
      //var email = 'vipinkmboj211@gmail.com'
      var output = `
      <h3>Hi, You got a new freelance job Comment</h3>
      <p>
      CommenterUsername: ${currentLoginUser},<br/>
      Username: ${req.body.username},<br/>
      FreelanceJobId: ${req.body.freelancejobid},<br/>
      CommentOnFreelanceJob: ${req.body.freelancejobcomment}
      

      </p>
  `;
  
  // exactly correct one for production
  let params = {
    // send to list
    Destination: {
        ToAddresses: [
            //email
            'admin@quickwebsite.net'
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
            Data: "New Comment on Freelance Job"
        }
    },
    Source: 'contact@quickwebsite.net',//'vipinkmboj21@gmail.com', // must relate to verified SES account
    ReplyToAddresses: [
       // email,
        'admin@quickwebsite.net'
    ],
  };
  
  // this sends the email
  ses.sendEmail(params, (err) => {
    if(err) {
      res.render('dashboardcustomer', { title: 'Quick Website', msg:'Error Occured, Email Sending failed', loginUser: loginUser.loginUserCustomer, currentLogInData: ''}); 
    } else {
      res.render('dashboardcustomer', { title: 'Quick Website', msg:'Commented Successfully! Please wait for Reply', loginUser: loginUser.loginUserCustomer, currentLogInData: ''}); 
    }
  });
  //

        //
      })

    }  else {
      res.render('/', { title: 'Quick Website', msg: '', loginUser: '', currentLogInData: '' });
    }
    
  });

  
 

  module.exports = router;