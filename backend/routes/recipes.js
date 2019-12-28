const recipeRouter = require('express').Router()
const Recipe = require('../models/recipeModel');

  recipeRouter.post('/add', (request, response, next) => {
    const body = request.body

    const recipe = new Recipe({
        title: body.title,
        servingSize: body.servingSize,
        prepTime: body.prepTime,
        cookTime: body.cookTime,
        ingredients: body.ingredients,
        directions: body.directions,
        notes: body.notes,
        ratings: body.ratings,
    })

    recipe
    .save()
    .then((result) => {
        return response.json(result);
    })
    .catch((error) => {next(error)})
  })

  recipeRouter.get('/', (req, res, next) => {
    Recipe.find({})
    .then((result) => {
      res.json(result);
    })
  })

  recipeRouter.put('/update/:id', (request, response, next) => {
    const body = request.body
    
    const recipe = ({
      title: body.title,
      servingSize: body.servingSize,
      prepTime: body.prepTime,
      cookTime: body.cookTime,
      ingredients: body.ingredients,
      directions: body.directions,
      notes: body.notes,
      ratings: body.ratings,
  })

  Recipe.findByIdAndUpdate(request.params.id, recipe, { new: true })
  .then(updatedRecipe => {
    response.json(updatedRecipe.toJSON())
  })
  .catch(error => next(error))
})
  
  module.exports = recipeRouter
  