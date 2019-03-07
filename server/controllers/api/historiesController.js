const historiesController = require('express').Router();

const WorldTradingDataAPI = require('../../lib/WorldTradingDataAPI');
const db = require('../../models');

const BATCH_SIZE = 1000;

historiesController.get('/', (req, res) => {
  db.History.findAll({where: req.symbolId, include: [db.Symbol]})
  .then(stockHistory => res.json(stockHistory))
})

historiesController.post('/cron', (req, res) => {
  db.Symbol.findAll()
    .then(symbols => {
      // for each symbol:
      symbols.forEach(symbol => {
        // get updated data from API
        WorldTradingDataAPI.getHistory(symbol.symbol)
          .then(response => response.data)
          .then(data => {
            symbol.getHistories()
              .then(histories => {
                const datesToSkip = histories.map(history => history.date.toISOString().split('T')[0]);
                const newHistories = [];
                for (var date in data.history) {
                  const datum = data.history[date];
                  if (newHistories.length < BATCH_SIZE) {
                    if (datesToSkip.includes(date))
                      continue;

                    newHistories.push({
                      date,
                      high: datum.high,
                      low: datum.low,
                      open: datum.open,
                      close: datum.close,
                      volume: datum.volume,
                      SymbolId: symbol.id
                    });
                  }
                }

                db.History.bulkCreate(newHistories)
                  .then(() => { // Notice: There are no arguments here, as of right now you'll have to...
                    return res.status(200).send("Success");
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
      });
    })
    .catch(err => res.send(err));
});

module.exports = historiesController;