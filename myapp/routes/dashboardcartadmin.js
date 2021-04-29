var express = require('express');
var router = express.Router();

var cartItemsModel = require('../modules/cartitemsschema');
/* GET home page. */
router.get('/', function(req, res, next) {

    var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
        loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
        loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
    
      };
      if(loginUser.loginUserCustomer) {
        res.render('dashboardcustomer', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
       
      } else if(loginUser.loginUserEmployee) {
        res.render('dashboardemployee', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
      } else if(loginUser.loginUserAdmin) {
        cartItemsModel.find({}).exec((err, cartItem) => {
            if(err) {
                res.render('dashboardcartadmin', { title: 'Quick Website', msg:'Cart is Empty', cartItem: '', loginUser: loginUser.loginUserAdmin});
            } 
            if(cartItem != null) {            
                res.render('dashboardcartadmin', { title: 'Quick Website', msg:'Selected Items', cartItem: cartItem, loginUser: loginUser.loginUserAdmin});
    
            } else {
                res.render('dashboardcartadmin', { title: 'Quick Website', msg:'Cart is Empty', cartItem: '', loginUser: loginUser.loginUserAdmin});
            }
        })
            
      } else {
        res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
      }
      

    
  
});

module.exports = router;
