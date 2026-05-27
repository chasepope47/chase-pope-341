const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const getAllItems = async (req, res) => {
    /* #swagger.description = 'Retrieve all pantry items from the database.' */
    const db = getDb();
    const items = await db.collection('items').find().toArray();
    res.status(200).json(items);
};

const getSingleItem = async (req, res) => {
    /* #swagger.description = 'Retrieve a single pantry item by its unique database ID.' */
    /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'The MongoDB ObjectId of the pantry item',
            required: true,
            type: 'string'
    } */
    const db = getDb();
    const item = await db.collection('items').findOne({ _id: new ObjectId(req.params.id) });
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
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
    const db = getDb();
    const result = await db.collection('items').insertOne(req.body);
    res.status(201).json(result);
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
    const db = getDb();
    const result = await db.collection('items').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.status(204).send();
};

const deleteItem = async (req, res) => {
    /* #swagger.description = 'Delete a pantry item from the database.' */
    /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'The MongoDB ObjectId of the item to delete',
            required: true,
            type: 'string'
    } */
    const db = getDb();
    await db.collection('items').deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).send();
};

module.exports = {
    getAllItems,
    getSingleItem,
    createItem,
    updateItem,
    deleteItem
};