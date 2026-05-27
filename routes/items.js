const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.js');

// Map the endpoints to the controller functions
router.get('/', itemsController.getAllItems);
router.get('/:id', itemsController.getSingleItem);
router.post('/', itemsController.createItem);
router.put('/:id', itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;