const request = require('request');
const chalk = require('chalk');
const ora = require('ora');

const symbolSet = 'global';
const source = 'BTC';
const spinner = ora({
  text: 'Fetching crypto data...',
  color: 'magenta',
});

const convertBTC = (currency = 'USD', amount = 1) => {
  const url = `https://apiv2.bitcoinaverage.com/convert/${symbolSet}?from=${source}&to=${currency}&amount=${amount}`;

  spinner.start();
  request(url, (error, response, body) => {
    let apiResponse;
    spinner.stop();
    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong with the API, try in a few minutes!'));
      return parseError;
    }

    console.log(`${chalk.yellow(amount)} ${chalk.blue(source)} to ${chalk.cyan(currency)} = ${chalk.green(apiResponse.price)}`);
  });
};

module.exports = convertBTC;
