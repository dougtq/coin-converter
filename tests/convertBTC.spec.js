const chai = require('chai');
const expect = require('chai').expect;
const nock = require('nock');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chalk = require('chalk')

const ConvertBTC = require('./../src/convertBTC')

chai.use(sinonChai)

describe('ConvertBTC', () => {

  let consoleStub;

  const responseMock = {
    "success": true,
    "time": "2018-01-20 19:07:40",
    "price": 10500
  }

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log')
  })

  afterEach(() => {
    console.log.restore()
  })

  it('should return USD as default currency and 1 as default amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock)

    ConvertBTC()

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.yellow(1)} ${chalk.blue('BTC')} to ${chalk.cyan('USD')} = ${chalk.green('10500')}`)
      done()
    }, 300)
  })

  it('should return USD as currency default and 10 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock)

    ConvertBTC('USD', 10)

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.yellow(10)} ${chalk.blue('BTC')} to ${chalk.cyan('USD')} = ${chalk.green('10500')}`)
      done()
    }, 300)
  })

  it('should return BRL as currency default and 1 as default amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock)

    ConvertBTC('BRL')

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.yellow(1)} ${chalk.blue('BTC')} to ${chalk.cyan('BRL')} = ${chalk.green('10500')}`)
      done()
    }, 300)
  })

  it('should message the user when the api return an error', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .replyWithError('Error')

    ConvertBTC('EURO')

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong with the API, try in a few minutes!'))
      done()
    }, 300)
  })
})