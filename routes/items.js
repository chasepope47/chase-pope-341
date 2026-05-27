const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.js');
const { pantryItemValidationRules, validate } = require('../middleware/validate.js');

// Public read routes
router.get('/', itemsController.getAllItems);
router.get('/:id', itemsController.getSingleItem);

// Injected validation rules before hitting the controller logic
router.post('/', pantryItemValidationRules(), validate, itemsController.createItem);
router.put('/:id', pantryItemValidationRules(), validate, itemsController.updateItem);

router.delete('/:id', itemsController.deleteItem);

module.exports = router;