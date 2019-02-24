var primeHelper = require('../helpers/prime-helper.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var medianPrimeNumbers = primeHelper.getPrimeMedians(req.query.n);

  res.json(medianPrimeNumbers);
});

module.exports = router;
