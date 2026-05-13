const express = require('express');
const cors = require('cors');
const app = express();
const homeRoutes = require('./routes/index');
require('dotenv').config();
const { connectToDb } = require('./db/connect');

app.use(cors());
app.use(express.json());
app.use('/', homeRoutes);

const PORT = process.env.PORT || 8080;

connectToDb(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});