const chai = require('chai');
const expect = require('chai').expect;

const ConvertBTC = require('./../src/convertBTC');

describe('ConvertBTC', () => {
  it('should return USD as currency default and 1 as amount default', (done) => {
    expect(ConvertBTC()).to.equal('1 BTC to USD = 2000.00')
  })
})