const express = require('express');
const router = new express.Router();
// const mainRouter = new express.Router()
const fetch = require('node-fetch');
const {isDateOlderThan} = require('../helpers/time');
const currencies = require('./currencies');

router.get('/addresses/:address/balance/:currency?', async (req, res) => {
  let statusCode = 200;
  let rta = {};
  try {
    const URL = `${process.env.ETHERSCAN_ENDPOINT}${''
    }?module=account&action=balance&address=${''
    }${req.params.address}&tag=latest&apikey=${process.env.ETHERSCAN_APIKEY}`;
    rta = await (await fetch(URL)).json();
    // Convierto de wai a ether
    rta.result /= 1000000000000000000;

    if (rta.status === '0' && rta.message === 'NOTOK') {
      statusCode = 404;
    }
  } catch (err) {
    statusCode = 500;
    rta = {
      message: err.message(),
    };
  }
  if (req.params.currency) {
    const currency = currencies.find((currency) =>
      currency.code === req.params.currency);
    if (!currency) {
      statusCode = 400;
      rta = {
        error: 'Invalid currency',
      };
    } else {
      rta.result *= currency.value;
    }
  }
  res.status(statusCode).send(rta);
});

router.get('/addresses/:address/old', async (req, res) => {
  let statusCode = 200;
  let rta = {};
  try {
    const URL = `${process.env.ETHERSCAN_ENDPOINT}${''
    }?module=account&action=txlist&address=${req.params.address}${''
    }&startblock=0&endblock=99999999&page=${''
    }1&offset=1&sort=asc&apikey=${process.env.ETHERSCAN_APIKEY}`;
    rta = await (await fetch(URL)).json();
    if (rta.status === '0' && rta.message === 'NOTOK') {
      statusCode = 404;
    } else if (rta.status === '0' && rta.message === 'No transactions found') {
      rta = {
        result: false,
      };
    } else {
      const timeStamp = rta.result[0]['timeStamp'];
      rta = {
        result: isDateOlderThan(timeStamp, 1, 'year'),
      };
    }
  } catch (err) {
    statusCode = 500;
    rta = {
      message: err.message,
    };
  }
  res.status(statusCode).send(rta);
});

module.exports = router;
