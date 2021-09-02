var express = require('express');
var router = express.Router();

var freelanceJobsModel = require('../modules/freelancejobsschema');
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
    var freelanceJobsData = freelanceJobsModel.find({});
   // var freelanceJobsComments = freelanceJobsCommentsModel.find({CommenterUsername: currentLoginUser});
    freelanceJobsData.exec((err, freelanceJobsData)=> {
      if(err) throw err;
//
//
      res.render('dashboardfreelancepage', { title: 'Quick Website', msg: '', loginUser: currentLoginUser, freelanceJobsData: freelanceJobsData });
    });    
    

  } else {
    res.render('/', { title: 'Quick Website', msg: '', loginUser: '', freelanceJobsData: ''});
  }
/*
  
  if(currentLoginUser) {
    freelanceJobsModel.find({}).exec((err, freelanceJobsData) => {
      if(err) throw err;
      if(freelanceJobsData) {
        res.render('dashboardfreelancepage', { title: 'Quick Website', msg: '', loginUser: currentLoginUser, freelanceJobsData: freelanceJobsData });
  } else {
        res.render('dashboardfreelancepage', { title: 'Quick Website', msg: 'No Job Available', loginUser: currentLoginUser, freelanceJobsData: '' });
  } 
}
  else {    
    
    res.render('/', { title: 'Quick Website', msg: '', loginUser: '', freelanceJobsData: '' });
  }
  */
});

module.exports = router;
