const recipeRouter = require("express").Router();
const Recipe = require("../models/recipeModel");
const Category = require("../models/categoryModel");

recipeRouter.get("/:id/category", async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("categoryId", {
      name: 1,
    });
    if (recipe) {
      res.json(recipe.name);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

recipeRouter.post("/add", async (request, response, next) => {
  const body = request.body;

  const category = await Category.findById(body.categoryId);

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
  });

  const savedRecipe = await recipe.save();
  category.recipes = await category.recipes.concat(savedRecipe._id);
  await category.save();
  response.json(savedRecipe.toJSON());
});

recipeRouter.get("/", async (req, res, next) => {
  const found = await Recipe.find({}).populate("categoryId", { name: 1 });
  if (found) {
    res.json(found);
  } else {
    res.status(404).end();
  }
});

recipeRouter.put("/update/:id", async (request, response, next) => {
  const body = request.body;

  try {
    const newCategory = await Category.findById(body.categoryId);

    const recipe = {
      title: body.title,
      categoryId: newCategory._id,
      servingSize: body.servingSize,
      prepTime: body.prepTime,
      cookTime: body.cookTime,
      ingredients: body.ingredients,
      directions: body.directions,
      notes: body.notes,
      ratings: body.ratings,
    };

    const findOldCategory = await Category.findById(body.oldCategory);
    await findOldCategory.recipes.pull(body.recipeId);
    await findOldCategory.save();

    newCategory.recipes = await newCategory.recipes.concat(request.params.id);
    await newCategory.save();

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      request.params.id,
      recipe,
      { new: true }
    );
    response.json(updatedRecipe.toJSON());
  } catch (e) {
    next(e);
  }
});

recipeRouter.delete("/:id", async (request, response, next) => {
  try {
    await Recipe.findByIdAndRemove(request.params.id);
    await Category.recipes.map((recipe) => {
      if (recipe.id == request.params.id) {
        console.log("Recipe are deleted");
        recipe.findByIdAndRemove(request.params.id);
        return response.status(204).end();
      }
    });
  } catch (exception) {
    next(exception);
  }
});

module.exports = recipeRouter;
