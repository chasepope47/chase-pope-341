const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', (req, res) => {
  /* #swagger.tags = ['Notes']
     #swagger.summary = 'Get all notes'
     #swagger.description = 'Returns a list of all notes. No authentication required.'
     #swagger.responses[200] = { description: 'List of notes' }
     #swagger.responses[500] = { description: 'Server error' }
  */
  notesController.getNotes(req, res);
});

router.get('/:id', (req, res) => {
  /* #swagger.tags = ['Notes']
     #swagger.summary = 'Get a single note'
     #swagger.description = 'Returns one note by its MongoDB ID. No authentication required.'
     #swagger.parameters['id'] = { in: 'path', description: 'MongoDB ObjectId of the note', required: true, type: 'string' }
     #swagger.responses[200] = { description: 'Note found' }
     #swagger.responses[400] = { description: 'Invalid ID format' }
     #swagger.responses[404] = { description: 'Note not found' }
     #swagger.responses[500] = { description: 'Server error' }
  */
  notesController.getNoteById(req, res);
});

router.post('/', isAuthenticated, (req, res) => {
  /* #swagger.tags = ['Notes']
     #swagger.summary = 'Create a note (login required)'
     #swagger.description = 'Creates a new note. Must be logged in via GitHub OAuth (/auth/github).'
     #swagger.security = [{ "githubOAuth": ["user:email"] }]
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/Note' }
     }
     #swagger.responses[201] = { description: 'Note created, returns new note ID' }
     #swagger.responses[400] = { description: 'Validation error' }
     #swagger.responses[401] = { description: 'Not authenticated - visit /auth/github first' }
     #swagger.responses[500] = { description: 'Server error' }
  */
  notesController.createNote(req, res);
});

router.put('/:id', isAuthenticated, (req, res) => {
  /* #swagger.tags = ['Notes']
     #swagger.summary = 'Update a note (login required)'
     #swagger.description = 'Updates an existing note by ID. Must be logged in via GitHub OAuth (/auth/github).'
     #swagger.security = [{ "githubOAuth": ["user:email"] }]
     #swagger.parameters['id'] = { in: 'path', description: 'MongoDB ObjectId of the note', required: true, type: 'string' }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/Note' }
     }
     #swagger.responses[204] = { description: 'Note updated successfully' }
     #swagger.responses[400] = { description: 'Validation error or invalid ID' }
     #swagger.responses[401] = { description: 'Not authenticated - visit /auth/github first' }
     #swagger.responses[404] = { description: 'Note not found' }
     #swagger.responses[500] = { description: 'Server error' }
  */
  notesController.updateNote(req, res);
});

router.delete('/:id', isAuthenticated, (req, res) => {
  /* #swagger.tags = ['Notes']
     #swagger.summary = 'Delete a note (login required)'
     #swagger.description = 'Deletes a note by ID. Must be logged in via GitHub OAuth (/auth/github).'
     #swagger.security = [{ "githubOAuth": ["user:email"] }]
     #swagger.parameters['id'] = { in: 'path', description: 'MongoDB ObjectId of the note', required: true, type: 'string' }
     #swagger.responses[200] = { description: 'Note deleted successfully' }
     #swagger.responses[400] = { description: 'Invalid ID format' }
     #swagger.responses[401] = { description: 'Not authenticated - visit /auth/github first' }
     #swagger.responses[404] = { description: 'Note not found' }
     #swagger.responses[500] = { description: 'Server error' }
  */
  notesController.deleteNote(req, res);
});

module.exports = router;
