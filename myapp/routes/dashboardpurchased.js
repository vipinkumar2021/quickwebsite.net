var express = require('express');
var router = express.Router();

var purchasedModel = require('../modules/recyclebinschema');
/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  //var currentAccountUser = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin
  if(loginUser.loginUserCustomer) {
    purchasedModel.find({Username: loginUser.loginUserCustomer}).exec((err, purchasedItems) => {
      if(err) {
        res.render('dashboardpurchased', { title: 'Quick Website', msg: 'Error Occurred whil fetching Purchased Services', loginUser: loginUser.loginUserCustomer, purchasedItems: '' });
      }
      if(purchasedItems) {
        res.render('dashboardpurchased', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer, purchasedItems: purchasedItems });
      }
    });
    //res.render('dashboardrecyclebin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer, deletedRecycleBinItems: '' });
  } else if(loginUser.loginUserEmployee) {
      res.redirect('dashboardpurchasedemployee');
    //res.render('dashboardrecyclebinemployees', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee, deletedRecycleBinItems: '' });
  } else if(loginUser.loginUserAdmin) {
    res.redirect('dashboardpurchasedadmin');
    //res.render('dashboardrecyclebinadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin, deletedRecycleBinItems: '' });

  } else {
      res.redirect('/');
    //res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  
});

module.exports = router;
