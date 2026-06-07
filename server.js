const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const app = express();
require('dotenv').config();
require('./controllers/authController');
const { connectToDb } = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-in-prod',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', require('./routes/auth'));
app.use('/items', require('./routes/items'));
app.use('/notes', require('./routes/notes'));

const PORT = process.env.PORT || 8080;
connectToDb(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
