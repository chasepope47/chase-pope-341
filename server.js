const express = require('express');
const cors = require('cors');
const app = express();
const homeRoutes = require('./routes/index');

app.use(cors());
app.use('/', homeRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});