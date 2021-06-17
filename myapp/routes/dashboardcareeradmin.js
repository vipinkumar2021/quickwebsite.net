var express = require('express');
//const careerModel = require('../modules/careerschema');
var router = express.Router();

var careerModel = require('../modules/careerschema');  
/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,
    loginUserEmployee: req.session.employeeLoginUserName,
    loginUserAdmin: req.session.adminLoginUserName
  } 
    if(loginUser.loginUserAdmin){     
      careerModel.find().exec((err, careerApplications) => {
        if(err) {
          res.render('dashboardcareeradmin', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserAdmin, careerApplications: ''});
        } else {
          res.render('dashboardcareeradmin', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserAdmin, careerApplications: careerApplications });
        }
      });      
    } else {
      res.redirect('/');
    }  
});

module.exports = router;
