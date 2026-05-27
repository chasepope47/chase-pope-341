const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  const db = getDb();
  const items = await db.collection('items').find().toArray();
  res.json(items);
};

const getById = async (req, res) => {
  const db = getDb();
  const item = await db.collection('items').findOne({ _id: new ObjectId(req.params.id) });
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

const createItem = async (req, res) => {
  const db = getDb();
  const result = await db.collection('items').insertOne(req.body);
  res.status(201).json(result);
};

const updateItem = async (req, res) => {
  const db = getDb();
  await db.collection('items').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(204).send();
};

const deleteItem = async (req, res) => {
  const db = getDb();
  await db.collection('items').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: 'Item deleted' });
};

module.exports = { getAll, getById, createItem, updateItem, deleteItem };
