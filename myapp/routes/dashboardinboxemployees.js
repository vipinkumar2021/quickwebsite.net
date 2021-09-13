var express = require('express');
var router = express.Router();

var freelanceJobsCommentsModel = require('../modules/freelancejobscommentsschema');
/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  var currentLoginUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;
  if(currentLoginUser) {

    var freelanceJobsComments = freelanceJobsCommentsModel.find({Username: currentLoginUser});
    freelanceJobsComments.exec((err, freelanceJobsCommentsData)=> {
      if(err) {
        res.render('dashboardinboxemployees', { title: 'Quick Website', msg: '', loginUser: currentLoginUser, freelanceJobsCommentsData: '' });
      } else {
        res.render('dashboardinboxemployees', { title: 'Quick Website', msg: '', loginUser: currentLoginUser, freelanceJobsCommentsData: freelanceJobsCommentsData  });
      }
    });
    //
  
  } else {
    res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  
});

module.exports = router;
