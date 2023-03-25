// run `node index.js` in the terminal

const axios = require('axios');
const crypto = require('crypto');

const endpoint = 'https://api.bybit.com/v2/public/orderBook/L2';
const symbol = 'BTCUSD';
const limit = 25;

const apiKey = 'or0GNXUWEagFoFQRDK';
const secretKey = 'C901NHbnAfppQmZU1rQalD1Oau1dEhpwrehB';

const params = {
  symbol: symbol,
  limit: limit,
};

const signature = crypto
  .createHmac('sha256', secretKey)
  .update(`/v2/public/orderBook/L2?${new URLSearchParams(params).toString()}`)
  .digest('hex');

const headers = {
  'Content-Type': 'application/json',
  'api-key': apiKey,
  'api-signature': signature,
  'api-expires': Date.now() + 10000,
};

axios.get(endpoint, { params, headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

console.log(`Hello Node.js v${process.versions.node}!`);
