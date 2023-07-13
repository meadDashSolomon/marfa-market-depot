const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/routes');

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});