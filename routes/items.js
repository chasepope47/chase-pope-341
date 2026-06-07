const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.js');
const { pantryItemValidationRules, validate } = require('../middleware/validate.js');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', itemsController.getAllItems);
router.get('/:id', itemsController.getSingleItem);

router.post('/', isAuthenticated, pantryItemValidationRules(), validate, itemsController.createItem);
router.put('/:id', isAuthenticated, pantryItemValidationRules(), validate, itemsController.updateItem);
router.delete('/:id', isAuthenticated, itemsController.deleteItem);

module.exports = router;
