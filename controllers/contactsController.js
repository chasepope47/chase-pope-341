const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const getContacts = async (req, res) => {
  const result = await getDb().collection('contacts').find().toArray();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const result = await getDb().collection('contacts').findOne({ _id: id });
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const contact = req.body;
  const result = await getDb().collection('contacts').insertOne(contact);
  res.status(201).json({ id: result.insertedId });
};

const updateContact = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const contact = req.body;
  await getDb().collection('contacts').replaceOne({ _id: id }, contact);
  res.status(204).send();
};

const deleteContact = async (req, res) => {
  const id = new ObjectId(req.params.id);
  await getDb().collection('contacts').deleteOne({ _id: id });
  res.status(200).send();
};

module.exports = { getContacts, getContactById, createContact, updateContact, deleteContact };