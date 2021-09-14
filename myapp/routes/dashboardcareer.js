var express = require('express');
var router = express.Router();

var careerModel = require('../modules/careerschema');

//
//Require multer for file upload
var multer = require('multer');
//require path
var path = require('path');
router.use(express.static(path.join(__dirname, './public')));
//Set Storage Engine for file to be stored
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `./public/uploads/`)
  }, 
  
  filename: function(req, file, cb) {
   /* for(var i = 0; i < files.length; i++) {
      file = files[i];
      cb(null, `${Date.now()}_${file.fieldname}${path.extname(file.originalname)}`);
    } */   
    
    cb(null, `${Date.now()}_${file.fieldname}${path.extname(file.originalname)}`);
  }
  
  /* Correct One so far
  filename: function(req, file, cb) {
    
    
    cb(null, Date.now() + '_' + file.fieldname + '_' + path.extname(file.originalname));
  }
  */
});


//init upload correct one starts here
/*
const filesForGalleryUpload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
}).single('uploadcontentforgallery');
 Correct One Ends*/
//
const upload = multer({
  storage: storage,
  //limits: {fileSize: 1000000000},    
  fileFilter: function(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/vnd.ms-word.document.macroEnabled.12' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.template') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
});

var multipleUploads = upload.fields([{name: 'nationalidimagename', maxCount: 1}, { name: 'cv', maxCount: 1}]);//.single('uploadcontentforgallery');//fields([{name: "uploadcontentforgallery", maxCount: 1}, {name: "uploadcontentfortemplates", maxCount: 1}]);


//
/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardcareer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee) {
    res.render('dashboardcareer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardcareer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });

  } else {
    res.render('career', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  
});

var aws = require("aws-sdk");
const ses = new aws.SES({"accessKeyId": process.env.SES_I_AM_USER_ACCESS_KEY, "secretAccessKey": process.env.SES_I_AM_USER_SECRET_ACCESS_KEY, "region": process.env.AWS_SES_REGION});

router.post('/', multipleUploads, function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  var currentAccountUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;
  if(currentAccountUser) {

    if(req.files.nationalidimagename) {
      var nationIdImageFile = req.files.nationalidimagename[0].filename;
    } else {
      nationIdImageFile = 'No National Id Provided'
    }
    if(req.files.cv) {
      var cvFile = req.files.cv[0].filename;
    } else {
      cvFile = 'No CV Provided'
    }
    
    var careerApplicaionDetail = new careerModel({
      Firstname: req.body.firstname,
      Lastname: req.body.lastname,    
      Email: req.body.email,
      Mobilenumber: req.body.mobilenumber,
      Gender: req.body.gender,
      Address: req.body.address,
      NationalIdNumber: req.body.nationalidnumber,
      NationIdImageName: nationIdImageFile,
      CVfilename: cvFile,
      BriefDescription: req.body.briefdescription
    });
    careerApplicaionDetail.save((err) => {
      if(err) {
        res.render('dashboardcareer', { title: 'Quick Website', msg: 'Application Not Submitted, Please Try Again Later', loginUser: currentAccountUser });
      }
      //
       //
      //Send Notification Email
      var output = `
      <h3>Hi, Job Application</h3>
      <p>
      Hi, <br/><br/>

      Thank for applying for job with us. We will get back to you soon.<br/>
      Please keep patience.<br/><br/>


      Your Datails:<br/>

      Firstname: ${req.body.firstname},<br/>
      Lastname: ${req.body.lastname},<br/>   
      Email: ${req.body.email},<br/>
      Mobile Number: ${req.body.mobilenumber},<br/>
      Gender: ${req.body.gender},<br/>
      Address: ${req.body.address},<br/>
      National Id Number: ${req.body.nationalidnumber},<br/>
      Nation Id Image Name: ${nationIdImageFile},<br/>
      CV File Name: ${cvFile},<br/>
      Brief Description: ${req.body.briefdescription}

      <br/><br/><br/>
      Regards,<br/>
      HR Team (Quick Website)<br/>
      </p>   
  `;
  
  // exactly correct one for production
  let params = {
    // send to list
    Destination: {
        ToAddresses: [
          req.body.email,
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
            Data: "Job Application"
        }
    },
    Source: 'contact@quickwebsite.net',//'admin@quickwebsite.net',//vipinkmboj21@gmail.com',// 'contact@quickwebsite.net',//  // must relate to verified SES account
    ReplyToAddresses: [
      req.body.email,
      'admin@quickwebsite.net',
        //'vipinkmboj211@gmail.com'
    ],
  };

  // this sends the email
ses.sendEmail(params, (err) => {
  if(err) {
    res.render('dashboardcareer', { title: 'Quick Website', msg: 'Application Submitted Successfully, We will contact, once there is any vacancy! Thanks :)', loginUser: currentAccountUser });
  } else {
    res.render('dashboardcareer', { title: 'Quick Website', msg: 'Application Submitted Successfully, We will contact, once there is any vacancy! Thanks :)', loginUser: currentAccountUser });
  }
});
        //

      //
      //res.render('dashboardcareer', { title: 'Quick Website', msg: 'Application Submitted Successfully, We will contact, once there is any vacancy! Thanks :)', loginUser: currentAccountUser });

    });
      } else {
    res.redirect('/');
  }  
});

module.exports = router;
