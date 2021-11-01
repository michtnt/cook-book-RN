const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeId: {
    type: Number,
  },
  title: {
    type: String,
    minlength: 1,
    required: true,
  },
  photo_url: {
    type: String,
    default:
      "https://download.hipwallpaper.com/desktop/1920/1080/64/42/Dz3aw7.jpg",
  },
  prepTime: {
    type: String,
  },
  cookTime: {
    type: String,
  },
  servingSize: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  directions: {
    type: String,
  },
  notes: {
    type: String,
  },
  ratings: {
    type: Number,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

recipeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
