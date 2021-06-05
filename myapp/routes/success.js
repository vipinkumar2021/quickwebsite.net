var express = require('express');
var router = express.Router();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY_Test
//const stripeSecretKey = process.env.STRIPE_SECRET_KEY_Live 

//const stripePublicKey = process.env.STRIPE_PUBLIC_KEY_Test//process.env.STRIPE_PUBLIC_KEY_Live;
const stripe = require('stripe')(stripeSecretKey);


/* GET home page. */
router.get('/', async function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  
  if(loginUser.loginUserCustomer) {
    /*const customer = await stripe.customers.retrieve(
      'cus_JbS20rWtPWdtA8'
    );
*/
    res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer/*, customer: customer */});
  } else if(loginUser.loginUserEmployee) {
    res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee/*, customer: customer*/ });
  } else if(loginUser.loginUserAdmin) {
    res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin/*, customer: customer*/ });
  } else {
    res.redirect('/');
    //res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
  }  
});



module.exports = router;
