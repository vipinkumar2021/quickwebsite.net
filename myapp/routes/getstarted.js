var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('getstarted', { title: 'Quick Website'});
});

module.exports = router;
