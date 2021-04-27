/*var express = require('express');
var router = express.Router();


module.exports = router;

*/

var express = require('express');
  var router = express.Router();
  var cartItemsModel = require("../modules/cartitemsschema");
  
  /* GET home page. */

router.get('/', function(req, res, next) {
  res.render('getstarted', { title: 'Quick Website'});
});


  

  module.exports = router;