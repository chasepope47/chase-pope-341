const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const getAllItems = async (req, res) => {
    /* #swagger.description = 'Retrieve all pantry items from the database.' */
    try {
        const db = getDb();
        const items = await db.collection('items').find().toArray();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving items', error: error.message });
    }
};

const getSingleItem = async (req, res) => {
    /* #swagger.description = 'Retrieve a single pantry item by its unique database ID.' */
    /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'The MongoDB ObjectId of the pantry item',
            required: true,
            type: 'string'
    } */
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid item ID format.' });
        }
        const db = getDb();
        const item = await db.collection('items').findOne({ _id: new ObjectId(req.params.id) });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving item', error: error.message });
    }
};

const createItem = async (req, res) => {
    /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'New pantry item details',
            schema: {
                name: 'Chicken Broth',
                category: 'Canned Goods',
                quantity: 2,
                cost: 1.99,
                expirationDate: '2027-03-15'
            }
    } */
    try {
        const db = getDb();
        const result = await db.collection('items').insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating item', error: error.message });
    }
};

const updateItem = async (req, res) => {
    /* #swagger.description = 'Update an existing pantry item by its ID.' */
    /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'The MongoDB ObjectId of the item to update',
            required: true,
            type: 'string'
    } */
    /* #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated pantry item properties',
            schema: {
                name: 'Chicken Broth',
                category: 'Canned Goods',
                quantity: 5,
                cost: 1.99,
                expirationDate: '2027-03-15'
            }
    } */
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid item ID format.' });
        }
        const db = getDb();
        const result = await db.collection('items').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Item not found to update.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error: error.message });
    }
};

const deleteItem = async (req, res) => {
    /* #swagger.description = 'Delete a pantry item from the database.' */
    /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'The MongoDB ObjectId of the item to delete',
            required: true,
            type: 'string'
    } */
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid item ID format.' });
        }
        const db = getDb();
        const result = await db.collection('items').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Item not found to delete.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error: error.message });
    }
};

module.exports = {
    getAllItems,
    getSingleItem,
    createItem,
    updateItem,
    deleteItem
};