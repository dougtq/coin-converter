require('dotenv').config();

const { publicKey, privateKey } = process.env;
const bitcoin = require('bitcoinaverage').restfulClient(publicKey, privateKey);

const convertBTC = (currency, amount) => {

}

module.exports = convertBTC