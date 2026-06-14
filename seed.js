require('dotenv').config();
const { MongoClient } = require('mongodb');

const items = [
  {
    name: 'Chicken Broth',
    category: 'Canned Goods',
    quantity: 4,
    unit: 'cans',
    cost: 1.99,
    location: 'pantry',
    expirationDate: '2027-03-15',
    createdBy: 'chasepope47',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Whole Milk',
    category: 'Dairy',
    quantity: 1,
    unit: 'gallon',
    cost: 4.29,
    location: 'fridge',
    expirationDate: '2025-06-20',
    createdBy: 'chasepope47',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Frozen Broccoli',
    category: 'Frozen Vegetables',
    quantity: 3,
    unit: 'bags',
    cost: 2.49,
    location: 'freezer',
    expirationDate: '2026-09-01',
    createdBy: 'chasepope47',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Peanut Butter',
    category: 'Condiments',
    quantity: 1,
    unit: 'jar',
    cost: 5.99,
    location: 'pantry',
    expirationDate: '2026-12-31',
    createdBy: 'chasepope47',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Brown Rice',
    category: 'Grains',
    quantity: 2,
    unit: 'lbs',
    cost: 3.49,
    location: 'pantry',
    expirationDate: '2027-01-01',
    createdBy: 'chasepope47',
    createdAt: new Date().toISOString()
  }
];

async function seed() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('pantry');
  const result = await db.collection('items').insertMany(items);
  console.log(`Inserted ${result.insertedCount} items`);
  await client.close();
}

seed().catch(console.error);
