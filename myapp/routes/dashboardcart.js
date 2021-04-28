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

        cartItemsModel.find({}).exec((err, cartItem) => {
            if(err) {
                res.render('dashboardcart', { title: 'Quick Website', msg:'Cart is Empty', cartItem: '', loginUser: loginUser.loginUserCustomer});
            } 
            if(cartItem != null) {            
                res.render('dashboardcart', { title: 'Quick Website', msg:'Selected Items', cartItem: cartItem, loginUser: loginUser.loginUserCustomer});
    
            } else {
                res.render('dashboardcart', { title: 'Quick Website', msg:'Cart is Empty', cartItem: '', loginUser: loginUser.loginUserCustomer});
            }
        })
        
      } else if(loginUser.loginUserEmployee) {
        res.render('dashboardemployee', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
      } else if(loginUser.loginUserAdmin) {
        res.render('dashboardadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });
    
      } else {
        res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
      }
      

    
  
});

module.exports = router;
