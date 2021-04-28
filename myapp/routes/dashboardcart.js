var express = require('express');
var router = express.Router();

var cartItemsModel = require('../modules/cartitemsschema');
/* GET home page. */
router.get('/', function(req, res, next) {

    cartItemsModel.find({}).exec((err, cartItem) => {
        if(err) {
            res.render('cart', { title: 'Quick Website', msg:'Cart is Empty', cartItem: ''});
        } 
        if(cartItem != null) {
            res.render('cart', { title: 'Quick Website', msg:'Selected Items', cartItem: cartItem});

        } else {
            res.render('cart', { title: 'Quick Website', msg:'Cart is Empty', cartItem: ''});
        }
    });
  
});

module.exports = router;
