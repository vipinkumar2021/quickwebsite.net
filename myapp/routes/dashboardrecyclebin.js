var express = require('express');
var router = express.Router();

var recycleBinModel = require('../modules/recyclebinschema');
/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
    recycleBinModel.find({Username: loginUser.loginUserCustomer}).exec((err, deletedRecycleBinItems) => {
      if(err) {
        res.render('dashboardrecyclebin', { title: 'Quick Website', msg: 'Error Occured while showing Recycle Bin', loginUser: loginUser.loginUserCustomer, deletedRecycleBinItems: '' });
      }
      if(deletedRecycleBinItems) {
        res.render('dashboardrecyclebin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer, deletedRecycleBinItems: deletedRecycleBinItems });
      }
    });

    //res.render('dashboardrecyclebin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer, deletedRecycleBinItems: '' });
  } else if(loginUser.loginUserEmployee) {
    res.render('dashboardrecyclebinemployees', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee, deletedRecycleBinItems: '' });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardrecyclebinadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin, deletedRecycleBinItems: '' });

  } else {
    res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  
});

module.exports = router;
