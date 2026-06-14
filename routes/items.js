const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.js');
const { pantryItemValidationRules, validate } = require('../middleware/validate.js');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', (req, res) => {
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Get all pantry items'
     #swagger.description = 'Returns a list of all items in the pantry. No authentication required.'
     #swagger.responses[200] = { description: 'List of pantry items' }
     #swagger.responses[500] = { description: 'Server error' }
  */
  itemsController.getAllItems(req, res);
});

router.get('/:id', (req, res) => {
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Get a single pantry item'
     #swagger.description = 'Returns one pantry item by its MongoDB ID. No authentication required.'
     #swagger.parameters['id'] = { in: 'path', description: 'MongoDB ObjectId of the item', required: true, type: 'string' }
     #swagger.responses[200] = { description: 'Pantry item found' }
     #swagger.responses[400] = { description: 'Invalid ID format' }
     #swagger.responses[404] = { description: 'Item not found' }
     #swagger.responses[500] = { description: 'Server error' }
  */
  itemsController.getSingleItem(req, res);
});

router.post('/', isAuthenticated, pantryItemValidationRules(), validate, (req, res) => {
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Create a pantry item (login required)'
     #swagger.description = 'Creates a new pantry item. Must be logged in via GitHub OAuth (/auth/github).'
     #swagger.security = [{ "githubOAuth": ["user:email"] }]
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/Item' }
     }
     #swagger.responses[201] = { description: 'Item created, returns new item ID' }
     #swagger.responses[400] = { description: 'Validation error' }
     #swagger.responses[401] = { description: 'Not authenticated - visit /auth/github first' }
     #swagger.responses[500] = { description: 'Server error' }
  */
  itemsController.createItem(req, res);
});

router.put('/:id', isAuthenticated, pantryItemValidationRules(), validate, (req, res) => {
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Update a pantry item (login required)'
     #swagger.description = 'Updates an existing pantry item by ID. Must be logged in via GitHub OAuth (/auth/github).'
     #swagger.security = [{ "githubOAuth": ["user:email"] }]
     #swagger.parameters['id'] = { in: 'path', description: 'MongoDB ObjectId of the item', required: true, type: 'string' }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/Item' }
     }
     #swagger.responses[204] = { description: 'Item updated successfully' }
     #swagger.responses[400] = { description: 'Validation error or invalid ID' }
     #swagger.responses[401] = { description: 'Not authenticated - visit /auth/github first' }
     #swagger.responses[404] = { description: 'Item not found' }
     #swagger.responses[500] = { description: 'Server error' }
  */
  itemsController.updateItem(req, res);
});

router.delete('/:id', isAuthenticated, (req, res) => {
  /* #swagger.tags = ['Items']
     #swagger.summary = 'Delete a pantry item (login required)'
     #swagger.description = 'Deletes a pantry item by ID. Must be logged in via GitHub OAuth (/auth/github).'
     #swagger.security = [{ "githubOAuth": ["user:email"] }]
     #swagger.parameters['id'] = { in: 'path', description: 'MongoDB ObjectId of the item', required: true, type: 'string' }
     #swagger.responses[200] = { description: 'Item deleted successfully' }
     #swagger.responses[400] = { description: 'Invalid ID format' }
     #swagger.responses[401] = { description: 'Not authenticated - visit /auth/github first' }
     #swagger.responses[404] = { description: 'Item not found' }
     #swagger.responses[500] = { description: 'Server error' }
  */
  itemsController.deleteItem(req, res);
});

module.exports = router;
