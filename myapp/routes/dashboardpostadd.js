var express = require('express');
var router = express.Router();

var advertisementModel = require('../modules/advertisementschema');
/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };

  var currentLoginUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;
  if(currentLoginUser) {
   
    res.render('dashboardpostadd', { title: 'Quick Website', msg: '', loginUser: currentLoginUser });

  } else {
    res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
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
    var advertisementDetails = new advertisementModel({
      Username: currentLoginUser,
      IndividualOrCompanyName: req.body.individualorcompanyname,
      ContactNumber: req.body.contactnumber,
      Email: req.body.email,
      Address: req.body.address,
      Services: req.body.services,
      Advertisement: req.body.advertisement

    });
    advertisementDetails.save((err)=> {
      if(err) {
        res.render('dashboardpostadd', { title: 'Quick Website', msg: '', loginUser: currentLoginUser});
      } else {
        // Send Notification Email
        //
        //
      //Send Email
      var output = `
      <h3>Hi, You Have a new add post</h3>
      <p>
      Username: ${currentLoginUser},<br/>
      IndividualOrCompanyName: ${req.body.individualorcompanyname},<br/>
      ContactNumber: ${req.body.contactnumber},<br/>
      Email: ${req.body.email},<br/>
      Address: ${req.body.address},<br/>
      Services: ${req.body.services},<br/>
      Advertisement: ${req.body.advertisement}
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
            Data: "New Advertisement Posted"
        }
    },
    Source: 'contact@quickwebsite.net',//'admin@quickwebsite.net',//vipinkmboj21@gmail.com',// 'contact@quickwebsite.net',//  // must relate to verified SES account
    ReplyToAddresses: [
      //'admin@quickwebsite.net'
        'vipinkmboj211@gmail.com'
    ],
  };

  // this sends the email
ses.sendEmail(params, (err) => {
  if(err) {
    res.render('dashboardpostadd', { title: 'Quick Website', msg: 'Advertisement Posted Successfully!', loginUser: currentLoginUser});
  } else {
    res.render('dashboardpostadd', { title: 'Quick Website', msg: 'Advertisement Posted Successfully!', loginUser: currentLoginUser});
  }
});


        //
        //res.render('dashboardpostadd', { title: 'Quick Website', msg: 'Advertisement Posted Successfully!', loginUser: currentLoginUser});
      }
    });
    
  
  } else {
    res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  
});

module.exports = router;
