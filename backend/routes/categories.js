const categoryRouter = require("express").Router();
const Category = require("../models/categoryModel");

categoryRouter.post("/add", async (request, response, next) => {
  const body = request.body;

  const category = new Category({
    name: body.name,
  });

  try {
    let result = await category.save();
    return response.json(result);
  } catch (e) {
    next(e);
  }
});

categoryRouter.get("/", async (req, res, next) => {
  try {
    let results = await Category.find({});
    res.json(results);
  } catch (e) {
    next(e);
  }
});

categoryRouter.get("/:id/recipes", async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "recipes",
      {
        title: 1,
        photo_url: 1,
        servingSize: 1,
        prepTime: 1,
        cookTime: 1,
        ingredients: 1,
        directions: 1,
        notes: 1,
      }
    );
    if (category) {
      res.json(category.recipes);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = categoryRouter;
