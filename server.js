const express = require('express');
const app = express();
const homeRoutes = require('./routes/index');

app.use('/', homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});