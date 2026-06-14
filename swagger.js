const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pantry Tracker API',
    description: 'Track pantry items and notes. Write routes require GitHub OAuth login — visit /auth/github to authenticate, then return here to test protected routes.'
  },
  host: 'chase-pope-341.onrender.com',
  schemes: ['https'],
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
      unit: 'cans',
      cost: 1.99,
      location: 'pantry',
      expirationDate: '2027-03-15'
    },
    Note: {
      title: 'Restock reminder',
      body: 'Need to buy more chicken broth before the holidays',
      category: 'shopping',
      priority: 'high',
      itemId: '',
      dueDate: '2025-12-31',
      completed: false
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
