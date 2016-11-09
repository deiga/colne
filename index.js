'use strict';

const Hapi = require('hapi');
const unirest = require('unirest');

const server = new Hapi.Server();
server.connection({ port: 3000 });

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
    .send({ "value1": 23, "value2": "bar", "value3": "bz" })
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