import { expect } from 'chai'
const exec = require('child_process').exec

const pkg = require('./../package.json')
const btcConverter = './src/main.js'



describe('Main CLI', () => {
  it('should return version of btc-converter', (done) =>{
    exec(`${btcConverter} --version`, (err, stdout, stderr) => {
      if (err) throw err

      expect(stdout.replace('\n', '')).to.be.equal(pkg.version)

      done()
    })
  })

  it('should return description of btc-converter', (done) =>{
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err

      expect(stdout.includes(pkg.description)).to.be.true

      done()
    })
  })

  it('should return currency of btc-converter', (done) =>{
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err

      expect(stdout.includes('--currency')).to.be.true

      done()
    })
  })

  it('should return amount of btc-converter', (done) =>{
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if (err) throw err

      expect(stdout.includes('--amount')).to.be.true
      
      done()
    })
  })
})