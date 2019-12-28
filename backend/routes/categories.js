const categoryRouter = require('express').Router()
const Category = require('../models/categoryModel');

  categoryRouter.post('/add', (request, response, next) => {
    const body = request.body

    const category = new Category({
        name: body.name
    })
    category
    .save()
    .then((result) => {
        return response.json(result);
    })
    .catch((error) => {next(error)})
  })

  categoryRouter.get('/', (req, res, next) => {
    Category.find({})
    .then((result) => {
      res.json(result);
    })
  })
  
module.exports = categoryRouter