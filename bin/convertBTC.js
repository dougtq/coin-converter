'use strict';

var request = require('request');
var chalk = require('chalk');
var ora = require('ora');

var symbolSet = 'global';
var source = 'BTC';
var spinner = ora({
  text: 'Fetching crypto data...',
  color: 'magenta'
});

var convertBTC = function convertBTC() {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var url = 'https://apiv2.bitcoinaverage.com/convert/' + symbolSet + '?from=' + source + '&to=' + currency + '&amount=' + amount;

  spinner.start();
  request(url, function (error, response, body) {
    var apiResponse = void 0;
    spinner.stop();
    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong with the API, try in a few minutes!'));
      return parseError;
    }

    console.log(chalk.yellow(amount) + ' ' + chalk.blue(source) + ' to ' + chalk.cyan(currency) + ' = ' + chalk.green(apiResponse.price));
  });
};

module.exports = convertBTC;