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

  categoryRouter.get('/:id/recipes', async (req, res, next) => {
    try{
    const category = await Category.findById(req.params.id).populate('recipes', {title: 1, photo_url:1, servingSize: 1, prepTime: 1, cookTime: 1, ingredients: 1, directions: 1, notes: 1})
    console.log(category);
    if(category){
      res.json(category.recipes);
    } else{
      res.status(404).end();
    }
   } catch(exception) {
      next(exception);
    }
  })
  
module.exports = categoryRouter