const axios = require('axios');

const API_TOKEN = process.env.WTD_API_TOKEN;
if (!API_TOKEN) {
  throw new Error(`API_TOKEN env variable must be defined.`);
}

module.exports = {
  getHistory: function (symbol) {
    return axios.get('https://www.worldtradingdata.com/api/v1/history?symbol=' + symbol +
    '&sort=newest&api_token=' + API_TOKEN);
  },
  getCurrent: function (symbol) {
    return axios.get('https://www.worldtradingdata.com/api/v1/stock?symbol=' + symbol +
    '&api_token=' + API_TOKEN);
  }
};
