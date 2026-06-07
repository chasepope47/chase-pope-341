const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', notesController.getNotes);
router.get('/:id', notesController.getNoteById);
router.post('/', isAuthenticated, notesController.createNote);
router.put('/:id', isAuthenticated, notesController.updateNote);
router.delete('/:id', isAuthenticated, notesController.deleteNote);

module.exports = router;
