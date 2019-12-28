require('dotenv').config({path:'./.env'}) // why
const config = require('./utils/config')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const categoryRouter = require('./routes/categories'); // to use the express routes
const recipeRouter = require('./routes/recipes');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

console.log('connecting to', config.URI)

mongoose.connect(config.URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

mongoose.set('useFindAndModify',false);
app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use('/categories',categoryRouter);
app.use('/recipes',recipeRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT || 3001, () => {
    console.log(`Server is running on port: ${config.PORT}`);
});

module.exports = app