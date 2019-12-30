const recipeRouter = require('express').Router()
const Recipe = require('../models/recipeModel');
const Category = require('../models/categoryModel');

recipeRouter.get('/:id/category', async (req, res, next) => {
  try{
  const recipe = await Recipe.findById(req.params.id).populate('categoryId', {name: 1})
  console.log(recipe);
  if(recipe){
    res.json(recipe.name);
  } else{
    res.status(404).end();
  }
 } catch(exception) {
    next(exception);
  }
})

  recipeRouter.post('/add', async (request, response, next) => {
    const body = request.body

    const category = await Category.findById(body.categoryId)

    console.log(category.name)
    const recipe = new Recipe({
        title: body.title,
        categoryId: category._id,
        servingSize: body.servingSize,
        prepTime: body.prepTime,
        cookTime: body.cookTime,
        ingredients: body.ingredients,
        directions: body.directions,
        notes: body.notes,
        ratings: body.ratings,
    })

    const savedRecipe = await recipe.save()
    category.recipes = await category.recipes.concat(savedRecipe._id)
    await category.save()
    response.json(savedRecipe.toJSON())
    })

  recipeRouter.get('/',  async (req, res, next) => {
     const found = await Recipe.find({}).populate('categoryId', {name: 1})
     if(found){
       res.json(found);
     } else {
       res.status(404).end();
     }
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
  