const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pantry Tracker API',
    description: 'Track pantry items and notes with GitHub OAuth authentication'
  },
  host: 'chase-pope-341.onrender.com',
  schemes: ['https', 'http'],
  securityDefinitions: {
    githubOAuth: {
      type: 'oauth2',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      flow: 'implicit',
      scopes: {
        'user:email': 'Read user email'
      }
    }
  },
  definitions: {
    Item: {
      name: 'Chicken Broth',
      category: 'Canned Goods',
      quantity: 2,
      cost: 1.99,
      expirationDate: '2027-03-15'
    },
    Note: {
      title: 'Restock reminder',
      body: 'Need to buy more chicken broth before the holidays',
      category: 'shopping',
      priority: 'high',
      itemId: '665f1a2b3c4d5e6f7a8b9c0d',
      dueDate: '2025-12-31',
      completed: false
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/items.js', './routes/notes.js', './routes/auth.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
