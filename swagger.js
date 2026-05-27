const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pantry Tracker API',
    description: 'Track pantry items, costs, and expiration dates'
  },
  host: 'localhost:8080',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
