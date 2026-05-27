const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pantry Tracker API',
    description: 'Track pantry items, costs, and expiration dates'
  },
  host: 'chase-pope-341.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
