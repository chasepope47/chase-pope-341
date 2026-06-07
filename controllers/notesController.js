const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const REQUIRED_FIELDS = ['title', 'body', 'category', 'priority'];

const validate = (data) => {
  const errors = [];
  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || String(data[field]).trim() === '') {
      errors.push(`"${field}" is required`);
    }
  }
  const validPriorities = ['low', 'medium', 'high'];
  if (data.priority && !validPriorities.includes(data.priority)) {
    errors.push(`"priority" must be one of: ${validPriorities.join(', ')}`);
  }
  return errors;
};

const getNotes = async (req, res) => {
  try {
    const result = await getDb().collection('notes').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve notes', details: err.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid note ID format' });
    }
    const id = new ObjectId(req.params.id);
    const result = await getDb().collection('notes').findOne({ _id: id });
    if (!result) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve note', details: err.message });
  }
};

const createNote = async (req, res) => {
  try {
    const errors = validate(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const note = {
      title: req.body.title.trim(),
      body: req.body.body.trim(),
      category: req.body.category.trim(),
      priority: req.body.priority,
      contactId: req.body.contactId || null,
      dueDate: req.body.dueDate || null,
      completed: req.body.completed === true || req.body.completed === 'true',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result = await getDb().collection('notes').insertOne(note);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create note', details: err.message });
  }
};

const updateNote = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid note ID format' });
    }
    const errors = validate(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const id = new ObjectId(req.params.id);
    const note = {
      title: req.body.title.trim(),
      body: req.body.body.trim(),
      category: req.body.category.trim(),
      priority: req.body.priority,
      contactId: req.body.contactId || null,
      dueDate: req.body.dueDate || null,
      completed: req.body.completed === true || req.body.completed === 'true',
      createdAt: req.body.createdAt,
      updatedAt: new Date().toISOString()
    };

    const result = await getDb().collection('notes').replaceOne({ _id: id }, note);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Note not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to update note', details: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid note ID format' });
    }
    const id = new ObjectId(req.params.id);
    const result = await getDb().collection('notes').deleteOne({ _id: id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note', details: err.message });
  }
};

module.exports = { getNotes, getNoteById, createNote, updateNote, deleteNote };
