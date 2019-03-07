#!/usr/bin/env node

const http = require("http")

const PORT = process.env.PORT || 3001

http.post(`http://localhost:${PORT}/api/histories/cron`, resp => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data));
  });
});