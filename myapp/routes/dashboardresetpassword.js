var express = require('express');
var router = express.Router();
//Require bcrypt to encrypt password
//var bcrypt = require('bcryptjs');
var adminModule = require('../modules/adminschema');
var customerModel = require('../modules/customersignupschema');
var employeesModel = require('../modules/employeessignupschema');

// require dot env
require('dotenv').config();
//encrypt passwords using bcrypt
var bcrypt = require('bcryptjs');
//Crypto for creating randombytes key
var crypto = require('crypto');
//nodemailer for sending emails from website to clients
//var nodemailer = require('nodemailer');
//const e = require('express');


/* GET home page. */

router.get('/',  function(req, res, next) {
    var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,
        loginUserEmployee: req.session.employeeLoginUserName,
        loginUserAdmin: req.session.adminLoginUserName
    }
    /*
    var loginUserCustomer = req.session.customerLoginUserName;//localStorage.getItem('customerLoginUserName');
    var loginUserEmployee = req.session.employeeLoginUserName//localStorage.getItem('employeeLoginUserName');
    var loginUserAdmin = req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName');
*/
  if(loginUser.loginUserCustomer){
    res.render('dashboardresetpassword', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer});
    //res.redirect('/dashboardcustomer');
  } else if(loginUser.loginUserEmployee) {
    res.render('dashboardresetpassword', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserEmployee});
    //res.redirect('/dashboardemployees');
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardresetpassword', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserAdmin});
    //res.redirect('/dashboardadmin');
  } else {
      res.redirect('/');
    //res.render('/', { title: 'Quick Website', msg:''});
  }  
});

  

var aws = require("aws-sdk");
const ses = new aws.SES({"accessKeyId": process.env.SES_I_AM_USER_ACCESS_KEY, "secretAccessKey": process.env.SES_I_AM_USER_SECRET_ACCESS_KEY, "region": process.env.AWS_SES_REGION});

// Send OTP Email from Forgot Password to Registered email id starts here

router.post('/', function(req, res, next) {
    var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,
        loginUserEmployee: req.session.employeeLoginUserName,
        loginUserAdmin: req.session.adminLoginUserName
    }
    var currentAccountUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;
    if(currentAccountUser) {
        //
          //
    
    //
        var messageto = req.body.email; 
        var checkRegisteredEmailInCustomerDetails = customerModel.findOne({Email: messageto});
        var checkRegisteredEmailInEmployeesDetails = employeesModel.findOne({Email: messageto});
        var checkRegisteredEmailInAdminDetails = adminModule.findOne({Email: messageto});
      
    checkRegisteredEmailInCustomerDetails.exec((err, dataWithRegisteredEmail ) => {
      if(err) throw err;

      if(dataWithRegisteredEmail != null) {
        var otpForCustomerAccount =  crypto.randomBytes(16).toString('hex');
        var getCustomerAccountId = dataWithRegisteredEmail._id;
        
        customerModel.findByIdAndUpdate(getCustomerAccountId, {Onetimepassword: otpForCustomerAccount}, function(err) {
          if(err) throw err;
          var output = `
    <h3>Contact Details</h3>
    <ul>
      <li>Company: Freelanceforall.com/demo account</li>
      <li>Email: companyemail@email.com....demo for now</li>
      <li>Toll Free: 00800 ...demo for now...</li>    
    </ul>
      <h3>Message</h3>
      <p>Your One Time Password (OTP) for Password Reset is</p>
      <p>${otpForCustomerAccount}</p> 
      <p>Please copy this OTP and follow the instructions</p> 
    `;  
        //
            // exactly correct one for production
let params = {
    // send to list
    Destination: {
        ToAddresses: [
            messageto
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
                Data: 'Hey,'
            }
        },
        
        Subject: {
            Charset: 'UTF-8',
            Data: "One Time Password (OTP) Email"
        }
    },
    Source: 'vipinkmboj21@gmail.com', // must relate to verified SES account
    ReplyToAddresses: [
        messageto
    ],
  };
  
  // this sends the email
  ses.sendEmail(params, (err) => {
    if(err) {
      res.render('dashboardresetpassword', { title: 'Quick Website', msg:'Error Occured, Email Sending failed', loginUser: currentAccountUser}); 
    } else {
        res.render('dashboardresetpassword', { title: 'Quick Website', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email', loginUser: currentAccountUser });
    }
  });
        //
    
        });
      } else if(dataWithRegisteredEmail == null){
        checkRegisteredEmailInEmployeesDetails.exec((err, dataWithRegisteredEmail1) => {
          if(err) throw err;         
            if(dataWithRegisteredEmail1 != null) {
              var otpForEmployeeAccount =  crypto.randomBytes(16).toString('hex');
              var getEmployeeAccountId = dataWithRegisteredEmail1._id;
              employeesModel.findByIdAndUpdate(getEmployeeAccountId, {Onetimepassword: otpForEmployeeAccount}, function(err) {
                if(err) throw err;
                var output = `
          <h3>Contact Details</h3>
          <ul>
            <li>Company: Freelanceforall.com/demo account</li>
            <li>Email: companyemail@email.com....demo for now</li>
            <li>Toll Free: 00800 ...demo for now...</li>    
          </ul>
            <h3>Message</h3>
            <p>Your One Time Password (OTP) for Password Reset is</p>
            <p>${otpForEmployeeAccount}</p> 
            <p>Please copy this OTP and follow the instructions</p> 
          `;  
        //
      // exactly correct one for production
let params = {
    // send to list
    Destination: {
        ToAddresses: [
            messageto
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
                Data: 'Hey,'
            }
        },
        
        Subject: {
            Charset: 'UTF-8',
            Data: "One Time Password (OTP) Email"
        }
    },
    Source: 'vipinkmboj21@gmail.com', // must relate to verified SES account
    ReplyToAddresses: [
        messageto
    ],
  };
  
  // this sends the email
  ses.sendEmail(params, (err) => {
    if(err) {
      res.render('dashboardresetpassword', { title: 'Quick Website', msg:'Error Occured, Email Sending failed', loginUser: currentAccountUser}); 
    } else {
        res.render('dashboardresetpassword', { title: 'Quick Website', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email', loginUser: currentAccountUser });
    }
  });
        //
         
      });  
            } else if(dataWithRegisteredEmail1 == null) {
              checkRegisteredEmailInAdminDetails.exec((err, dataWithRegisteredEmail2) => {
                if(err) throw err;

                if(dataWithRegisteredEmail2 != null) {

                  var otpForAdminAccount =  crypto.randomBytes(16).toString('hex');
                  var getAdminAccountId = dataWithRegisteredEmail2._id;

                  adminModule.findByIdAndUpdate(getAdminAccountId, {Onetimepassword: otpForAdminAccount}, function(err) {
                    if(err) throw err;
            var output = `
      <h3>Contact Details</h3>
      <ul>
        <li>Company: Freelanceforall.com/demo account</li>
        <li>Email: companyemail@email.com....demo for now</li>
        <li>Toll Free: 00800 ...demo for now...</li>    
      </ul>
        <h3>Message</h3>
        <p>Your One Time Password (OTP) for Password Reset is</p>
        <p>${otpForAdminAccount}</p> 
        <p>Please copy this OTP and follow the instructions</p> 
      `;  
    
      //
         // exactly correct one for production
let params = {
    // send to list
    Destination: {
        ToAddresses: [
            messageto
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
                Data: 'Hey,'
            }
        },
        
        Subject: {
            Charset: 'UTF-8',
            Data: "One Time Password (OTP) Email"
        }
    },
    Source: 'vipinkmboj21@gmail.com', // must relate to verified SES account
    ReplyToAddresses: [
        messageto
    ],
  };
  
  // this sends the email
  ses.sendEmail(params, (err) => {
    if(err) {
      res.render('dashboardresetpassword', { title: 'Quick Website', msg:'Error Occured, Email Sending failed', loginUser: currentAccountUser}); 
    } else {
        res.render('dashboardresetpassword', { title: 'Quick Website', msg:'Please check your Registered Email and Enter the OTP sent to your Registered Email', loginUser: currentAccountUser});
    }
  });
      //
      
                  });

                } else {
                  res.render('dashboardforgotpassword', { title: 'frontendwebdeveloper', msg:'Wrong Email Entered, Please Enter Registered Email Id', loginUser: currentAccountUser });
                }  
              });
            }              
        });
      } 
    }); 
    //
} else {
    res.redirect('/');
}
    //
  });
  
  // Send OTP Email from Forgot Password to Registered email id starts here
  

// Confirm OTP and reset/update password strts here Exactly Correct
/*
router.post('/updatepassword', function(req, res, next) {
  var otpResetPassword = req.body.otpresetpassword;
  var newPassword = req.body.newpassword;
  var confirmNewPassword = req.body.cnfnewpassword;

  if(newPassword != confirmNewPassword || newPassword == '' || confirmNewPassword == '') {
    res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Passwords Not Matched, Please Enter Correct Password' });
  } else {
    newPassword = bcrypt.hashSync(req.body.newpassword, 10);

    var compareOtpEnteredWithRegisteredOtpInCustomerData = customerModel.findOne({Onetimepassword: otpResetPassword});
    var compareOtpEnteredWithRegisteredOtpInEmployeesData = employeesModel.findOne({Onetimepassword: otpResetPassword});
    var compareOtpEnteredWithRegisteredOtpInAdminData = adminModule.findOne({Onetimepassword: otpResetPassword});

    compareOtpEnteredWithRegisteredOtpInCustomerData.exec((err, customerData) => {
      if(err) throw err;
      if(customerData != null) {
        var getCustomerId = customerData._id;
        customerModel.findByIdAndUpdate(getCustomerId, {Onetimepassword: null, Password: newPassword}, function(err) {
          if(err) throw err;

          res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });
        });
      } else if(customerData == null) {
        compareOtpEnteredWithRegisteredOtpInEmployeesData.exec((err, employeeData) => {
          if(err) throw err;
          if(employeeData != null) {
            var getEmployeeId = employeeData._id;
            employeesModel.findByIdAndUpdate(getEmployeeId, {Onetimepassword: null, Password: newPassword}, function(err) {
              if(err) throw err;
              res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });

            });
          } else if(employeeData == null) {
            compareOtpEnteredWithRegisteredOtpInAdminData.exec((err, adminData) => {
              if(err) throw err;
              if(adminData != null) {
                var getAdminId = adminData._id;
                adminModule.findByIdAndUpdate(getAdminId, {Onetimepassword: null, Password: newPassword}, function(err) {
                  if(err) throw err;
                  res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });

                });
              } else {
                res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Wrong OTP Entered, Please Enter the OTP sent to your Registered Email.' });

              }
            });
          }
        });
      }


    });

  }
});
// Confirm OTP and reset/update password ends here Exactly Correct
*/
router.post('/updatepassword', function(req, res, next) {
  var otpResetPassword = req.body.otpresetpassword;
  var newPassword = req.body.newpassword;
  var confirmNewPassword = req.body.cnfnewpassword;

  if(newPassword != confirmNewPassword || newPassword == '' || confirmNewPassword == '') {
    res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Passwords Not Matched, Please Enter Correct Password' });
  } else {
    newPassword = bcrypt.hashSync(req.body.newpassword, 10);

    var compareOtpEnteredWithRegisteredOtpInCustomerData = customerModel.findOne({Onetimepassword: otpResetPassword});
    var compareOtpEnteredWithRegisteredOtpInEmployeesData = employeesModel.findOne({Onetimepassword: otpResetPassword});
    var compareOtpEnteredWithRegisteredOtpInAdminData = adminModule.findOne({Onetimepassword: otpResetPassword});

    compareOtpEnteredWithRegisteredOtpInCustomerData.exec((err, customerData) => {
      if(err) throw err;
      if(customerData != null) {
        var getCustomerId = customerData._id;
        customerModel.findByIdAndUpdate(getCustomerId, {Onetimepassword: null, Password: newPassword}, function(err) {
          if(err) throw err;
          //Send msg to registered email
          var messageto = customerData.Email;
          var output = `
          <h3>Contact Details</h3>
          <ul>
            <li>Company: Freelanceforall.com/demo account</li>
            <li>Email: companyemail@email.com....demo for now</li>
            <li>Toll Free: 00800 ...demo for now...</li>    
          </ul>
            <h3>Message</h3>
            <p>Your Password has been reset successfully</p>
            <p>If Not You, Please Reset Your Password immediately or call Toll Free: ......</p> 
            
          `;         
          //
                      // exactly correct one for production
let params = {
    // send to list
    Destination: {
        ToAddresses: [
            messageto
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
                Data: 'Hey, '
            }
        },
        
        Subject: {
            Charset: 'UTF-8',
            Data: "Hey, You got a new msg"
        }
    },
    Source: 'vipinkmboj21@gmail.com', // must relate to verified SES account
    ReplyToAddresses: [
        messageto
    ],
  };
  
  // this sends the email
  ses.sendEmail(params, (err) => {
    if(err) {
      res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed'}); 
    } else {
        res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });
    }
  });
          //
          //Nodemailer strts here...
          /* uncomment it later
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            
            user: process.env.NODEMAILEMAILUSER,
            pass: process.env.NODEMAILEMAILPASSWORD
            
          }
        });
        
        var mailOption = {
          from: 'resetpa7@gmail.com',
          to: messageto ,
          subject: 'You got a new msg from Vipin',
          html: output
        };

        transporter.sendMail(mailOption, function(err, info) {
          if(err) throw err;
          // Show msg in website that password is reset
          res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });

        });
        uncomment it later */
                  });
      } else if(customerData == null) {
        compareOtpEnteredWithRegisteredOtpInEmployeesData.exec((err, employeeData) => {
          if(err) throw err;
          if(employeeData != null) {
            var getEmployeeId = employeeData._id;
            employeesModel.findByIdAndUpdate(getEmployeeId, {Onetimepassword: null, Password: newPassword}, function(err) {
              if(err) throw err;
              //Send msg to registered email
          var messageto = employeeData.Email;
          var output = `
          <h3>Contact Details</h3>
          <ul>
            <li>Company: Freelanceforall.com/demo account</li>
            <li>Email: companyemail@email.com....demo for now</li>
            <li>Toll Free: 00800 ...demo for now...</li>    
          </ul>
            <h3>Message</h3>
            <p>Your Password has been reset successfully</p>
            <p>If Not You, Please Reset Your Password immediately or call Toll Free: ......</p> 
            
          `;         
          //
                                     // exactly correct one for production
let params = {
    // send to list
    Destination: {
        ToAddresses: [
            messageto
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
                Data: 'Hey, '
            }
        },
        
        Subject: {
            Charset: 'UTF-8',
            Data: "Hey, You got a new msg"
        }
    },
    Source: 'vipinkmboj21@gmail.com', // must relate to verified SES account
    ReplyToAddresses: [
        messageto
    ],
  };
  
  // this sends the email
  ses.sendEmail(params, (err) => {
    if(err) {
      res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed'}); 
    } else {
        res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });
    }
  });
          //
          //Nodemailer strts here...
          /* uncomment it later
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            
            user: process.env.NODEMAILEMAILUSER,
            pass: process.env.NODEMAILEMAILPASSWORD
            
          }
        });
        
        var mailOption = {
          from: 'resetpa7@gmail.com',
          to: messageto ,
          subject: 'You got a new msg from Vipin',
          html: output
        };

        transporter.sendMail(mailOption, function(err, info) {
          if(err) throw err;
          // Show msg in website that password is reset
          res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });

        });
          uncomment it later */
            });
          } else if(employeeData == null) {
            compareOtpEnteredWithRegisteredOtpInAdminData.exec((err, adminData) => {
              if(err) throw err;
              if(adminData != null) {
                var getAdminId = adminData._id;
                adminModule.findByIdAndUpdate(getAdminId, {Onetimepassword: null, Password: newPassword}, function(err) {
                  if(err) throw err;
                  //Send msg to registered email
          var messageto = adminData.Email;
          var output = `
          <h3>Contact Details</h3>
          <ul>
            <li>Company: Freelanceforall.com/demo account</li>
            <li>Email: companyemail@email.com....demo for now</li>
            <li>Toll Free: 00800 ...demo for now...</li>    
          </ul>
            <h3>Message</h3>
            <p>Your Password has been reset successfully</p>
            <p>If Not You, Please Reset Your Password immediately or call Toll Free: ......</p> 
            
          `;         
          //
                                         // exactly correct one for production
let params = {
    // send to list
    Destination: {
        ToAddresses: [
            messageto
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
                Data: 'Hey, '
            }
        },
        
        Subject: {
            Charset: 'UTF-8',
            Data: "Hey, You got a new msg"
        }
    },
    Source: 'vipinkmboj21@gmail.com', // must relate to verified SES account
    ReplyToAddresses: [
        messageto
    ],
  };
  
  // this sends the email
  ses.sendEmail(params, (err) => {
    if(err) {
      res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed'}); 
    } else {
        res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });
    }
  });
          //
          //Nodemailer strts here...
          /* uncomment it later
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            
            user: process.env.NODEMAILEMAILUSER,
            pass: process.env.NODEMAILEMAILPASSWORD
            
          }
        });
        
        var mailOption = {
          from: 'resetpa7@gmail.com',
          to: messageto ,
          subject: 'You got a new msg from Vipin',
          html: output
        };

        transporter.sendMail(mailOption, function(err, info) {
          if(err) throw err;
          // Show msg in website that password is reset
          res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Password Reset Successfully, You may login now' });

        });   
        
        uncomment it later */
                });
              } else {
                res.render('resetpassword', { title: 'frontendwebdeveloper', msg:'Wrong OTP Entered, Please Enter the OTP sent to your Registered Email.' });

              }
            });
          }
        });
      }


    });

  }
});

   module.exports = router;
