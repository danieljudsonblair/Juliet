const symbolsController = require('express').Router();
const worldTradeAPI = require('../../lib/WorldTradingDataAPI');
const { JWTVerifier } = require('../../lib/passport');
const db = require('../../models');

symbolsController.get('/', JWTVerifier, (req, res) => {
  req.user.getSymbols()
    .then(symbols => res.json({ symbols }))
    .catch(err => res.json(err));
});

symbolsController.post('/', JWTVerifier, (req, res) => {
  const { ticker } = req.body;
  worldTradeAPI.getCurrent(ticker) 
    .then(response => response.data.data)
    .then(data => db.Symbol.findOrCreate({ where: { symbol: data[0].symbol }, defaults: {lastPrice: data[0].price, name: data[0].name}}))
    .then(results => req.user.addSymbol(results[0]))
    .then(symbol => res.json(symbol))
    .catch(err => res.json(err));
});
symbolsController.post('/remove', JWTVerifier, (req, res) => {
  const { ticker } = req.body;
  db.Symbol.destroy({ where: { id: ticker }})
    .then(symbol => res.json(symbol))
    .catch(err => res.json(err));
});

// symbolsController.get('/:symbol', JWTVerifier, (req, res) => {
//   db.History.findAll({where: {symbol: req.params.symbol}})
//   .then(history => res.json(history))
//   .catch(err => res.json(err));
// })

module.exports = symbolsController;
