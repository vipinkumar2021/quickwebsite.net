var express = require('express');
var router = express.Router();

var adminModule = require('../modules/adminschema');
var customerModel = require('../modules/customersignupschema');
var employeesModel = require('../modules/employeessignupschema');
var adminMembersTeamModel = require('../modules/adminmembersteamschema');
var usernamesListModel = require('../modules/usernameslistschema');
// require dot env
require('dotenv').config();
//Crypto for creating randombytes key
var crypto = require('crypto');
//nodemailer for sending emails from website to clients
// var nodemailer = require('nodemailer');
//encrypt passwords using bcrypt
var bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/',  function(req, res, next) {
  
  var loginUserCustomer = req.session.customerLoginUserName;//localStorage.getItem('customerLoginUserName');
  var loginUserEmployee = req.session.employeeLoginUserName//localStorage.getItem('employeeLoginUserName');
  var loginUserAdmin = req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName');
  
  if(loginUserCustomer){
    res.redirect('/dashboardcustomer');
  } else if(loginUserEmployee) {
    res.redirect('/dashboardemployees');
  } else if(loginUserAdmin) {
    res.redirect('/dashboardadmin');
  } else {
    res.render('admin', { title: 'Quick Website', msg:''});
  } 
});



//Require multer for file upload
var multer = require('multer');
//require path
var path = require('path');
router.use(express.static(path.join(__dirname, './public')));
//Set Storage Engine for file to be stored
const storage = multer.diskStorage({
  destination: './public/uploads/', 
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});
//init upload
const upload = multer({
  storage: storage,
  //limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('nationalidimage');
// Check file type
function checkFileType(file, cb) {
  // Allowed File extentions
  const fileTypes = /jpeg|jpg|png|gif/;
  //Check the Extentions
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if(mimetype && extName) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}


var aws = require("aws-sdk");
const ses = new aws.SES({"accessKeyId": process.env.SES_I_AM_USER_ACCESS_KEY, "secretAccessKey": process.env.SES_I_AM_USER_SECRET_ACCESS_KEY, "region": process.env.AWS_SES_REGION});

//Exactly Correct one
router.post('/signupadmin', upload, function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.usrname;
  var mobilenumber = req.body.mobilenumber;
  var email = req.body.email; 
  var nationalid = req.body.nationalid;
  var nationalidimage = req.file.filename;      

  var Onetimepassword = crypto.randomBytes(16).toString('hex');

//below is correct one
//Check Username in UsernameList
//
  usernamesListModel.findOne({Username: username}, {Username: username}).exec((err, dataUsernameInUsernameList) => {
    if(err) throw err;
    if(dataUsernameInUsernameList != null) {
      return res.render('admin', {title: 'Quick Website', msg:'Username Not Available, Please Try Another One' });
    } else {
    //}
  //});
  //
  adminModule.findOne({Username: username}, {Username: username}).exec((err, dataUsernameInAdmin) => {
      if(err) throw err;
      if(dataUsernameInAdmin != null) {
  
          return res.render('admin', {title: 'Quick Website', msg:'Username Already Exists in Admin Data' });
            
      } else {
        // check username in employeesshema
        //

        employeesModel.findOne({Username: username}).exec((err, dataUsernameInEmployees)=> {
          if(err) throw err;
          if(dataUsernameInEmployees != null) {
            return res.render('admin', {title: 'Quick Website', msg:'Username Already Exists in Employees Data' });
          } else {



          //}
        //});
        //
        
        customerModel.findOne({Username: username}).exec((err, dataUsernameInCustomers) => {
          if(err) throw err;
          if(dataUsernameInCustomers != null) {
            return res.render('admin', {title: 'Quick Website', msg:'Username Already Exists in Customer Data' });

          } else {
            
           //next(); // return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username does not Already Exists in Customer Data' });

           adminModule.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInAdmin) => {
            if(err) throw err;
            if(dataMobileNumberInAdmin != null) {
              return res.render('admin', {title: 'Quick Website', msg:'Mobile Number Already Registered in Admin Data' });
    
            } else {

              // check Mobile Number in employeesshema
        //

        employeesModel.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInEmployees)=> {
          if(err) throw err;
          if(dataMobileNumberInEmployees != null) {
            return res.render('admin', {title: 'Quick Website', msg:'Mobile Number Already Exists in Employees Data' });
          } else {



          //}
        //});
        //

              customerModel.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInCustomer) => {
                if(err) throw err;
                if(dataMobileNumberInCustomer != null) {
                  return res.render('admin', {title: 'Quick Website', msg:'Mobile Number Already Registered in Customer Data' });

                } else {
                  adminModule.findOne({Email: email}, {Email: email}).exec((err, dataEmailInAdminData) => {
                    if(err) throw err;
                    if(dataEmailInAdminData != null) {
                      return res.render('admin', {title: 'Quick Website', msg:'Email Id Already Registered in Admin Data' });
    
                    } else {

                       // check Email in employeesshema
        //

        employeesModel.findOne({Email: email}, {Email: email}).exec((err, dataEmailInEmployees)=> {
          if(err) throw err;
          if(dataEmailInEmployees != null) {
            return res.render('admin', {title: 'Quick Website', msg:'Email Id Already Exists in Employees Data' });
          } else {



          //}
        //});
        //
                      //next();
                      //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already not Registered in Admin Data' });
                      customerModel.findOne({Email: email}, {Email: email}).exec((err, dataEmailInCustomerData) => {
                        if(err) throw err;
                        if(dataEmailInCustomerData != null) {

                          return res.render('admin', {title: 'Quick Website', msg:'Email Already Registered in Customer Data' });

                        } else {
                          //next();
                          adminModule.findOne({Nationalid :nationalid}, {Nationalid :nationalid}).exec((err, dataNationalIdInAdminData) => {
                           if(err) throw err;
                           if(dataNationalIdInAdminData != null) {
                            return res.render('admin', {title: 'Quick Website', msg:'National Id Already Registered in Admin Data' });

                           } else {

                              // check National Id in employeesshema
        //

        employeesModel.findOne({Nationalid :nationalid}, {Nationalid :nationalid}).exec((err, dataNationalIdInEmployees)=> {
          if(err) throw err;
          if(dataNationalIdInEmployees != null) {
            return res.render('admin', {title: 'Quick Website', msg:'National Id Already Exists in Employees Data' });
          } else {



          //}
        //});
        //

                              adminMembersTeamModel.findOne({Email: email}, {Email: email}).exec((err, registeredNewAdminMemberEmail) => {
                                if(err) throw err;
                                if(registeredNewAdminMemberEmail == null || registeredNewAdminMemberEmail != 'vipinkmboj211gmail.com') {
                                  return res.render('admin', {title: 'Quick Website', msg:'Please Enter Registered Email Address or Contact Admin' });

                                } else {                              
                             //
                             //
                            //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'National Id Already not Registered in Admin Data' });
                            var adminDetails = new adminModule({
                              Firstname: firstname,
                              Lastname: lastname,
                              Username: username,
                              Mobilenumber: mobilenumber,
                              Email: email,   
                              Nationalid: nationalid,
                              Imagename: nationalidimage,
                              
                              Onetimepassword: Onetimepassword
                              });
                          
                              adminDetails.save((err )=> {
                                if(err) throw err;

                                // save username in the usernames list
                                //
                                var userNameListDetail = new usernamesListModel({
                                  Username: req.body.usrname
                                });
                                userNameListDetail.save((err) => {
                                  if(err) throw err;

                                //});
                                //
                          //Send OTP Email
                                var output = `
                              <h3>Hi, Your One Time Password for Account Activation is ${Onetimepassword}</h3>
                              <p>Please Enter the One Time Password in the opened link and press Activate Account</p>   
                          `;

                          //
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
          Data: "One Time Password (OTP) Email"
      }
  },
  Source: 'admin@quickwebsite.net',//'vipinkmboj21@gmail.com', // must relate to verified SES account
  ReplyToAddresses: [
      email,
  ],
};

// this sends the email
ses.sendEmail(params, (err) => {
  if(err) {
    res.render('signupadmin', { title: 'Quick Website', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
  } else {
    res.render('signupadmin', { title: 'Quick Website', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
  }
});
                          //
                          /* UNCOMMENT IT LATER IF NEEDED 
                          var transporter = nodemailer.createTransport({ 
                            service: 'gmail',
                            auth: {    
                              user: process.env.NODEMAILEMAILUSER,
                              pass: process.env.NODEMAILEMAILPASSWORD    
                            }
                          });
                          var mailOption = {
                            from: 'resetpa7@gmail.com',
                            to: email, //or use req.body.email
                            subject: 'One Time Password (OTP) for Account Authentication',
                            html: output
                          };
                          
                          transporter.sendMail(mailOption, function(err, info) {
                            if(err) {
                              res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
                            } else {
                              res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
                            }
                          }); 
                          UNCOMMENT IT LATER IF NEEDED */

                          //
                        });
                          //
                              });  
                              //
                            }
                          });
                              //
                               //
      } //employeesmodal schema for National Id
    }); //employeesmodal schema National Id
        //
                           }                       
                            
                          });


                        }

                      });
                       //
      } //employeesmodal schema for email
    }); //employeesmodal schema email
        //
                    }


                  });
                  /*next();*/ // return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number does not Already Registered in Customer Data' });

                }
              });
              //
      } //employeesmodal schema for mobile number
    }); //employeesmodal schema mobile number
        //
            }

          });

           //
          }
        }); 
        //
      } //employeesmodal schema for username
    }); //employeesmodal schema for username
        //
      } 

    });
//
}
});

//
});
//

//Exactly Correct one 
/*
router.post('/signupadmin', upload, function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.usrname;
  var mobilenumber = req.body.mobilenumber;
  var email = req.body.email; 
  var nationalid = req.body.nationalid;
  var nationalidimage = req.file.filename;      

  var Onetimepassword = crypto.randomBytes(16).toString('hex');

//below is correct one
//Check Username in UsernameList
//
  usernamesListModel.findOne({Username: username}, {Username: username}).exec((err, dataUsernameInUsernameList) => {
    if(err) throw err;
    if(dataUsernameInUsernameList != null) {
      return res.render('admin', {title: 'Quick Website', msg:'Username Not Available, Please Try Another One' });
    } else {

    //}
  //});

  //
  adminModule.findOne({Username: username}, {Username: username}).exec((err, dataUsernameInAdmin) => {
      if(err) throw err;
      if(dataUsernameInAdmin != null) {
  
          return res.render('admin', {title: 'Quick Website', msg:'Username Already Exists in Admin Data' });
            
      } else {
        
        customerModel.findOne({Username: username}).exec((err, dataUsernameInCustomers) => {
          if(err) throw err;
          if(dataUsernameInCustomers != null) {
            return res.render('admin', {title: 'Quick Website', msg:'Username Already Exists in Customer Data' });

          } else {
            
           //next(); // return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username does not Already Exists in Customer Data' });

           adminModule.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInAdmin) => {
            if(err) throw err;
            if(dataMobileNumberInAdmin != null) {
              return res.render('admin', {title: 'Quick Website', msg:'Mobile Number Already Registered in Admin Data' });
    
            } else {
              customerModel.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInCustomer) => {
                if(err) throw err;
                if(dataMobileNumberInCustomer != null) {
                  return res.render('admin', {title: 'Quick Website', msg:'Mobile Number Already Registered in Customer Data' });

                } else {
                  adminModule.findOne({Email: email}, {Email: email}).exec((err, dataEmailInAdminData) => {
                    if(err) throw err;
                    if(dataEmailInAdminData != null) {
                      return res.render('admin', {title: 'Quick Website', msg:'Email Already Registered in Admin Data' });
    
                    } else {
                      //next();
                      //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already not Registered in Admin Data' });
                      customerModel.findOne({Email: email}, {Email: email}).exec((err, dataEmailInCustomerData) => {
                        if(err) throw err;
                        if(dataEmailInCustomerData != null) {

                          return res.render('admin', {title: 'Quick Website', msg:'Email Already Registered in Customer Data' });

                        } else {
                          //next();
                          adminModule.findOne({Nationalid :nationalid}, {Nationalid :nationalid}).exec((err, dataNationalIdInAdminData) => {
                           if(err) throw err;
                           if(dataNationalIdInAdminData != null) {
                            return res.render('admin', {title: 'Quick Website', msg:'National Id Already Registered in Admin Data' });

                           } else {
                              adminMembersTeamModel.findOne({Email: email}, {Email: email}).exec((err, registeredNewAdminMemberEmail) => {
                                if(err) throw err;
                                if(registeredNewAdminMemberEmail == null) {
                                  return res.render('admin', {title: 'Quick Website', msg:'Please Enter Registered Email Address or Contact Admin' });

                                } else {                              
                             //
                             //
                            //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'National Id Already not Registered in Admin Data' });
                            var adminDetails = new adminModule({
                              Firstname: firstname,
                              Lastname: lastname,
                              Username: username,
                              Mobilenumber: mobilenumber,
                              Email: email,   
                              Nationalid: nationalid,
                              Imagename: nationalidimage,
                              
                              Onetimepassword: Onetimepassword
                              });
                          
                              adminDetails.save((err )=> {
                                if(err) throw err;

                                // save username in the usernames list
                                //
                                var userNameListDetail = new usernamesListModel({
                                  Username: req.body.usrname
                                });
                                userNameListDetail.save((err) => {
                                  if(err) throw err;

                                //});
                                //
                          //Send OTP Email
                                var output = `
                              <h3>Hi, Your One Time Password for Account Activation is ${Onetimepassword}</h3>
                              <p>Please Enter the One Time Password in the opened link and press Activate Account</p>   
                          `;

                          //
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
          Data: "One Time Password (OTP) Email"
      }
  },
  Source: 'vipinkmboj21@gmail.com', // must relate to verified SES account
  ReplyToAddresses: [
      email,
  ],
};

// this sends the email
ses.sendEmail(params, (err) => {
  if(err) {
    res.render('signupadmin', { title: 'Quick Website', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
  } else {
    res.render('signupadmin', { title: 'Quick Website', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
  }
});
                          //
                          /* UNCOMMENT IT LATER IF NEEDED 
                          var transporter = nodemailer.createTransport({ 
                            service: 'gmail',
                            auth: {    
                              user: process.env.NODEMAILEMAILUSER,
                              pass: process.env.NODEMAILEMAILPASSWORD    
                            }
                          });
                          var mailOption = {
                            from: 'resetpa7@gmail.com',
                            to: email, //or use req.body.email
                            subject: 'One Time Password (OTP) for Account Authentication',
                            html: output
                          };
                          
                          transporter.sendMail(mailOption, function(err, info) {
                            if(err) {
                              res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
                            } else {
                              res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
                            }
                          }); 
                          UNCOMMENT IT LATER IF NEEDED */ /*

                          //
                        });
                          //
                              });  
                              //
                            }
                          });
                              //
                           }                       
                            
                          });


                        }

                      });
                    }


                  });
                  /*next();*/ // return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number does not Already Registered in Customer Data' }); 
                  /*

                }
              });
            }

          });

           //
          }
        });        
      } 

    });
//
}
});

//
});
//
//Exactly Correct one
router.post('/signupadmin', upload, function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.usrname;
  var mobilenumber = req.body.mobilenumber;
  var email = req.body.email; 
  var nationalid = req.body.nationalid;
  var nationalidimage = req.file.filename;      

  var Onetimepassword = crypto.randomBytes(16).toString('hex');

//below is correct one
  adminModule.findOne({Username: username}, {Username: username}).exec((err, dataUsernameInAdmin) => {
      if(err) throw err;
      if(dataUsernameInAdmin != null) {
  
          return res.render('admin', {title: 'Quick Website', msg:'Username Already Exists in Admin Data' });
            
      } else {
        
        customerModel.findOne({Username: username}).exec((err, dataUsernameInCustomers) => {
          if(err) throw err;
          if(dataUsernameInCustomers != null) {
            return res.render('admin', {title: 'Quick Website', msg:'Username Already Exists in Customer Data' });

          } else {
            
           //next(); // return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Username does not Already Exists in Customer Data' });

           adminModule.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInAdmin) => {
            if(err) throw err;
            if(dataMobileNumberInAdmin != null) {
              return res.render('admin', {title: 'Quick Website', msg:'Mobile Number Already Registered in Admin Data' });
    
            } else {
              customerModel.findOne({Mobilenumber: mobilenumber}, {Mobilenumber: mobilenumber}).exec((err, dataMobileNumberInCustomer) => {
                if(err) throw err;
                if(dataMobileNumberInCustomer != null) {
                  return res.render('admin', {title: 'Quick Website', msg:'Mobile Number Already Registered in Customer Data' });

                } else {
                  adminModule.findOne({Email: email}, {Email: email}).exec((err, dataEmailInAdminData) => {
                    if(err) throw err;
                    if(dataEmailInAdminData != null) {
                      return res.render('admin', {title: 'Quick Website', msg:'Email Already Registered in Admin Data' });
    
                    } else {
                      //next();
                      //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Email Already not Registered in Admin Data' });
                      customerModel.findOne({Email: email}, {Email: email}).exec((err, dataEmailInCustomerData) => {
                        if(err) throw err;
                        if(dataEmailInCustomerData != null) {

                          return res.render('admin', {title: 'Quick Website', msg:'Email Already Registered in Customer Data' });

                        } else {
                          //next();
                          adminModule.findOne({Nationalid :nationalid}, {Nationalid :nationalid}).exec((err, dataNationalIdInAdminData) => {
                           if(err) throw err;
                           if(dataNationalIdInAdminData != null) {
                            return res.render('admin', {title: 'Quick Website', msg:'National Id Already Registered in Admin Data' });

                           } else {
                              adminMembersTeamModel.findOne({Email: email}, {Email: email}).exec((err, registeredNewAdminMemberEmail) => {
                                if(err) throw err;
                                if(registeredNewAdminMemberEmail == null) {
                                  return res.render('admin', {title: 'Quick Website', msg:'Please Enter Registered Email Address or Contact Admin' });

                                } else {                              
                             //
                             //
                            //return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'National Id Already not Registered in Admin Data' });
                            var adminDetails = new adminModule({
                              Firstname: firstname,
                              Lastname: lastname,
                              Username: username,
                              Mobilenumber: mobilenumber,
                              Email: email,   
                              Nationalid: nationalid,
                              Imagename: nationalidimage,
                              
                              Onetimepassword: Onetimepassword
                              });
                          
                              adminDetails.save((err )=> {
                                if(err) throw err;
                          //Send OTP Email
                                var output = `
                              <h3>Hi, Your One Time Password for Account Activation is ${Onetimepassword}</h3>
                              <p>Please Enter the One Time Password in the opened link and press Activate Account</p>   
                          `;

                          //
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
          Data: "One Time Password (OTP) Email"
      }
  },
  Source: 'vipinkmboj21@gmail.com', // must relate to verified SES account
  ReplyToAddresses: [
      email,
  ],
};

// this sends the email
ses.sendEmail(params, (err) => {
  if(err) {
    res.render('signupadmin', { title: 'Quick Website', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
  } else {
    res.render('signupadmin', { title: 'Quick Website', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
  }
});
                          //
                          /* UNCOMMENT IT LATER IF NEEDED 
                          var transporter = nodemailer.createTransport({ 
                            service: 'gmail',
                            auth: {    
                              user: process.env.NODEMAILEMAILUSER,
                              pass: process.env.NODEMAILEMAILPASSWORD    
                            }
                          });
                          var mailOption = {
                            from: 'resetpa7@gmail.com',
                            to: email, //or use req.body.email
                            subject: 'One Time Password (OTP) for Account Authentication',
                            html: output
                          };
                          
                          transporter.sendMail(mailOption, function(err, info) {
                            if(err) {
                              res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Error Occured, Email Sending failed', adminDetails: ''}); 
                            } else {
                              res.render('signupadmin', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
                            }
                          }); 
                          UNCOMMENT IT LATER IF NEEDED */ /*

                              });  
                              //
                            }
                          });
                              //
                           }                       
                            
                          });


                        }

                      });
                    }


                  });
                  /*next();*/ // return res.render('admin', {title: 'SaReGaMa Music Academy & GMP Studio', msg:'Mobile Number does not Already Registered in Customer Data' });

                  /*
                }
              });
            }

          });

           //
          }
        });        
      } 

    });

});

//Exactly Correct One part 2

  //Get Sign Up Page
  router.get('/signupadmin',  function(req, res, next) {
    var loginUserCustomer = req.session.customerLoginUserName;//localStorage.getItem('customerLoginUserName');
    var loginUserEmployee = req.session.employeeLoginUserName;//localStorage.getItem('employeeLoginUserName');
    var loginUserAdmin = req.session.adminLoginUserName;//localStorage.getItem('adminLoginUserName');
    
    if(loginUserCustomer){
      res.redirect('/dashboardcustomer');
    } else if(loginUserEmployee) {
      res.redirect('/dashboardemployees');
    } else if(loginUserAdmin) {
      res.redirect('/dashboardadmin');
    } else {
      res.render('signupadmin', { title: 'Quick Website', msg:''});
    }  
  });
  */
  // Sign up Account Activation with OTP strts here
router.post('/accountactivatedadmin', function(req, res, next) {
  var oneTimePassword = req.body.otp;
  var password = req.body.password;
  var confirmPassword = req.body.cnfpassword;
  if(password != confirmPassword || password == '' || confirmPassword == '') {
    res.render('signupadmin', { title: 'Quick Website', msg:'Password Not Matched, Please Try again', adminDetails: ''});
  } else {
    password = bcrypt.hashSync(req.body.password, 10);
    var getAdminDetails = adminModule.findOne({Onetimepassword: oneTimePassword}, {});
    getAdminDetails.exec((err, ExistingAdminDetails)=> {
      if(err) throw err;
      if(ExistingAdminDetails == null || ExistingAdminDetails == '') {
        res.render('signupadmin', { title: 'Quick Website', msg:'Wrong OTP Entered, Please Try again', adminDetails:''});

      } else {
        var getAdminId = ExistingAdminDetails._id;
        
        adminModule.findByIdAndUpdate(getAdminId, {Onetimepassword: null, Password: password}, {upsert: true}, function(err, updatedAdminDetails){
          if(err) throw err; 
          //
          
                                     //
      //Send Successfully Sign Up Email notification
      var output = `
      <h3>Hi, You have successfully Registered to your account</h3>
      <p>
        Welcome ${updatedAdminDetails.Firstname} <br/>
        You have successfully registered for Quick Website with <br/>

        Username: ${updatedAdminDetails.Username}, <br/>

        <br/><br/>
        Regards,<br/>
        Team (Quick Website)
        
              
      </p>   
  `;
  
  // exactly correct one for production
  let params = {
    // send to list
    Destination: {
        ToAddresses: [
          updatedAdminDetails.Email,
          //'vipinkmboj211@gmail.com',
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
            Data: `${updatedAdminDetails.Username} just registered to www.quickwebsite.net`
        }
    },
    Source: 'contact@quickwebsite.net',//'vipinkmboj21@gmail.com', // must relate to verified SES account
    ReplyToAddresses: [
      updatedAdminDetails.Email,
      //'vipinkmboj211@gmail.com',
      'admin@quickwebsite.net'
    ],
  };
  
  // this sends the email
  ses.sendEmail(params, (err) => {
    if(err) {
      res.render('admin', { title: 'Quick Website', msg:'Account Activated Successfully, You may log in now', adminDetails: ''});
    } else {
      res.render('admin', { title: 'Quick Website', msg:'Account Activated Successfully, You may log in now', adminDetails: ''});
    }
  });
  //
          
          //
          //res.render('admin', { title: 'Quick Website', msg:'Account Activated Successfully, You may log in now', adminDetails: ''});
        })
      }      
    });        
  }  
});
// Sign up Account Activation with OTP ends here


//uncomment it later if needed*/

module.exports = router;

