const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pantry Tracker API',
    description: 'Track pantry items, costs, and expiration dates'
  },
  host: 'super-train-7vvj66q6rqwqhx5qr-8080.app.github.dev',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
