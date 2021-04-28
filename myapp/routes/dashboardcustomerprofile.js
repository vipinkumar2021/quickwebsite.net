var express = require('express');
var router = express.Router();

var customerModel = require('../modules/customersignupschema');
/* GET home page. */
router.get('/',  function(req, res, next) {
    var loginUser = {
      loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
      loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
      loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
  
    };

    if(loginUser.loginUserCustomer) {
        customerModel.findOne({Username: loginUser.loginUserCustomer}).exec((err, currentLoginData) => {
            if(err) {
                res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'Data Not Found', loginUser: loginUser.loginUserCustomer, currentLoginData: '' });
            }
            if(currentLoginData != null) {
                
                res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLoginData: currentLoginData });
            } else {
                res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'Data Not Found', loginUser: loginUser.loginUserCustomer, currentLoginData: '' });
            }
        });
      res.render('dashboardcustomerprofile', { title: 'Quick Website', msg:'', loginUser: loginUser.loginUserCustomer, currentLoginData: '' });
    } else if(loginUser.loginUserEmployee){
      res.redirect('dashboardemployees');
      
    } else if(loginUser.loginUserAdmin) {
      
       res.redirect('dashboardadmin');
     
    } else {
      res.redirect('/');
    }   
  });

module.exports = router;
