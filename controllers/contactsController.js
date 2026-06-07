const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const REQUIRED_FIELDS = ['firstName', 'lastName', 'email'];

const validate = (data) => {
  const errors = [];
  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || String(data[field]).trim() === '') {
      errors.push(`"${field}" is required`);
    }
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('"email" must be a valid email address');
  }
  return errors;
};

const getContacts = async (req, res) => {
  try {
    const result = await getDb().collection('contacts').find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contacts', details: err.message });
  }
};

const getContactById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact ID format' });
    }
    const id = new ObjectId(req.params.id);
    const result = await getDb().collection('contacts').findOne({ _id: id });
    if (!result) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contact', details: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const errors = validate(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const contact = {
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim().toLowerCase(),
      phone: req.body.phone || '',
      address: req.body.address || '',
      company: req.body.company || '',
      notes: req.body.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result = await getDb().collection('contacts').insertOne(contact);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact', details: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact ID format' });
    }
    const errors = validate(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const id = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim().toLowerCase(),
      phone: req.body.phone || '',
      address: req.body.address || '',
      company: req.body.company || '',
      notes: req.body.notes || '',
      createdAt: req.body.createdAt,
      updatedAt: new Date().toISOString()
    };

    const result = await getDb().collection('contacts').replaceOne({ _id: id }, contact);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Contact not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact', details: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid contact ID format' });
    }
    const id = new ObjectId(req.params.id);
    const result = await getDb().collection('contacts').deleteOne({ _id: id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact', details: err.message });
  }
};

module.exports = { getContacts, getContactById, createContact, updateContact, deleteContact };
