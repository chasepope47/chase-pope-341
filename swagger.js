const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pantry Tracker API',
    description: 'Track pantry items, costs, and expiration dates'
  },
  host: 'YOUR-RENDER-URL.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/items.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
