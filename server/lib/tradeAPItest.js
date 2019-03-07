const WorldTradingDataAPI = require('./WorldTradingDataAPI');

WorldTradingDataAPI.getHistory("AAPL")
  .then(response => response.data)
  .then(data => console.log(data))
  .catch(err => console.log(err));
