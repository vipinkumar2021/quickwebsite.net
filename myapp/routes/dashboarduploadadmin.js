var express = require('express');
var router = express.Router();

var uploadModel = require('../modules/uploadschema');
/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
      res.redirect('dashboardcustomer');
    //res.render('dashboardoutbox', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee) {
    res.redirect('dashboardemployees');
    //res.render('dashboardoutboxemployees', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {

    uploadModel.find()
    .select('Filename')
    .exec((err, fileName) => {
      if(err) {
        res.render('dashboarduploadadmin', { title: 'Quick Website', msg: '', msgfile: 'No File Here', loginUser: loginUser.loginUserAdmin, fileName: '' });

      }
      if(fileName != null) {
        res.render('dashboarduploadadmin', { title: 'Quick Website', msg: '', msgfile: '', loginUser: loginUser.loginUserAdmin, fileName: fileName });

      } else {
        res.render('dashboarduploadadmin', { title: 'Quick Website', msg: '', msgfile: 'No File Here', loginUser: loginUser.loginUserAdmin, fileName: '' });

      }
      
    });
    
  } else {
    res.redirect('/');
    //res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  
});



//Require multer for file upload
var multer = require('multer');
//require path
var path = require('path');
router.use(express.static(path.join(__dirname, './public')));
//Set Storage Engine for file to be stored
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads/')
  }, 
  filename: function(req, file, cb) {
    
    cb(null, Date.now() + '_' + file.fieldname + '_' + path.extname(file.originalname));
  }
});
//init upload
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true)
    } else if(file.mimetype === '') {

    } else {
      cb(null, false)
    }
  }
}).single('file');


  router.post('/', upload, function(req, res, next) {
    //console.log(req.file);
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };
    if(loginUser.loginUserCustomer) {
        res.redirect('dashboardcustomer');
      //res.render('dashboardoutbox', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
    } else if(loginUser.loginUserEmployee) {
      res.redirect('dashboardemployees');
      //res.render('dashboardoutboxemployees', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
    } else if(loginUser.loginUserAdmin) {
      
          //
          if(req.file == undefined) {
            var Filename = 'No Image Selected';
          } else {
            Filename = req.file.filename;
          }
          //
      
           var fileDetails = new uploadModel({
            Username: loginUser.loginUserAdmin,
            Filename: Filename
    });
    fileDetails.save((err) => {
        if(err) {
        res.render('dashboarduploadadmin', { title: 'Quick Website', msg: 'Error Occured, Try Again', loginUser: loginUser.loginUserAdmin, msgfile: '', fileName: '' });

        }
        /*if(req.file == undefined) {
            res.render('dashboarduploadadmin', { title: 'Quick Website', msg: 'No Image Selected', loginUser: loginUser.loginUserAdmin });
        } */else {
          
            res.render('dashboarduploadadmin', { title: 'Quick Website', msg: 'File Uploaded', loginUser: loginUser.loginUserAdmin, msgfile: '', fileName: '' });

        }

        

    });
          //
        

        //
    } else {
      res.redirect('/');
      //res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
    }
    
  });
  
  



module.exports = router;
