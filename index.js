'use strict';

const Hapi = require('hapi');
const unirest = require('unirest');

const server = new Hapi.Server();
server.connection({ 
  port: process.env.PORT, 
  routes: { 
    cors: {
      additionalHeaders: ['Accept-Language']
    } 
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

server.route({
  method: 'POST',
  path: '/750',
  config: {
    payload: {
      output: 'data',
      parse: true
    }
  },
  handler: function (request, reply) {
    console.log(request.payload);
    unirest.post(`https://maker.ifttt.com/trigger/${process.env.EVENT_NAME}/with/key/${process.env.MAKER_KEY}`)
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .send({ "value1": request.payload.words , "value2": request.payload.body, "value3": request.payload.date })
    .end(function (response) {
      console.log(response.body);
      reply(response.body);
    });
  }
});


server.start((err) => {
  
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});