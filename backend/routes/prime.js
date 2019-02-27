var primeHelper = require('../helpers/prime-helper.js');
var express = require('express');
var router = express.Router();

/* GET median of prime numbers */
router.get('/', function(req, res, next) {
  if (Object.keys(req.query).length === 0) {
    return res.status(400).send('n query string parameter not specified');
  }
  if (isNaN(req.query.n)) {
    return res.status(400).send('n query string parameter is not a number');
  }

  let upperLimit = Number(req.query.n);
  if (!Number.isInteger(upperLimit) || upperLimit < 1) {
    return res.status(400).send('n query string parameter must be a positive integer');
  }

  let medianPrimeNumbers = primeHelper.getPrimeMedians(req.query.n);
  res.json(medianPrimeNumbers);
});

module.exports = router;
