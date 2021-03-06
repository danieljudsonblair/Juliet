import axios from 'axios';

export default {
  Users: {
    login: function (email, password) {
      return axios.post('/api/users/login', { email, password });
    },

    getMe: function (authToken) {
      return axios.get('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    },
    register: function (email, password) {
      return axios.post('/api/users/register', { email, password });
    }
  },

  Symbols:{
    get: function (authToken) {
      return axios.get('/api/symbols', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
    },
    add: function (authToken, symbol) {
      return axios.post('/api/symbols', { ticker: symbol },
	    {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
    },
    remove: function (authToken, symbol) {
      return axios.post('/api/symbols/remove', { ticker: symbol },
	    {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
    }
  },
  History: {
    get: function (authToken, symbolId) {
      return axios.get('/api/histories', { symbolId: symbolId },
	    {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
      });
    },
    getIndividual: function (authToken, symbolId, symbol) {
      return axios.post('/api/histories/stocks/history' , { symbolId: symbolId },
	    {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
      });
    },
    cron: function (authToken){
      return axios.post('/api/histories/cron', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
    }
  }
}
