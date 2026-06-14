const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const getAllItems = async (req, res) => {
    try {
        const items = await getDb().collection('items').find().toArray();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving items', error: error.message });
    }
};

const getSingleItem = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid item ID format.' });
        }
        const item = await getDb().collection('items').findOne({ _id: new ObjectId(req.params.id) });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving item', error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const item = {
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity,
            unit: req.body.unit,
            cost: req.body.cost,
            location: req.body.location,
            expirationDate: req.body.expirationDate,
            createdBy: req.user.username,
            createdAt: new Date().toISOString()
        };
        const result = await getDb().collection('items').insertOne(item);
        res.status(201).json({ id: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating item', error: error.message });
    }
};

const updateItem = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid item ID format.' });
        }
        const update = {
            name: req.body.name,
            category: req.body.category,
            quantity: req.body.quantity,
            unit: req.body.unit,
            cost: req.body.cost,
            location: req.body.location,
            expirationDate: req.body.expirationDate,
            createdBy: req.body.createdBy,
            createdAt: req.body.createdAt,
            updatedAt: new Date().toISOString()
        };
        const result = await getDb().collection('items').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: update }
        );
        if (result.matchedCount === 0) return res.status(404).json({ message: 'Item not found.' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid item ID format.' });
        }
        const result = await getDb().collection('items').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Item not found.' });
        res.status(200).json({ message: 'Item deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
};

module.exports = { getAllItems, getSingleItem, createItem, updateItem, deleteItem };
