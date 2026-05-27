const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { connectToDb } = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/items', require('./routes/items'));

const PORT = process.env.PORT || 8080;
connectToDb(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
