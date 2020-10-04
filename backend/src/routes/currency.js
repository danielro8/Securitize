
const express = require('express');
const router = new express.Router();
const currencies = require('./currencies');


router.get('/currencies/:currency', async (req, res) => {
  console.log(currencies);
  const curreny = currencies.find((currency) =>
    currency.code === req.params.currency);
  res.status(curreny ? 200 : 404).send(curreny);
});

router.get('/currencies', async (req, res) => {
  res.status(currencies ? 200 : 404).send(currencies);
});

router.patch('/currencies/:currency', async (req, res) => {
  let statusCode = 204;
  let rta = {};
  const currency = currencies.find((currency) =>
    currency.code === req.params.currency);
  if (!req.body.value) {
    statusCode = 400;
    rta = {
      error: 'Missing value parameter',
    };
  } else if (isNaN(req.body.value)) {
    statusCode = 400;
    rta = {
      error: 'Invalid value parameter',
    };
  } else if (!currency) {
    statusCode = 404;
  } else {
    currency['value'] = req.body.value;
  }
  res.status(statusCode).send(rta);
});

module.exports = router;
